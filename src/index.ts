// src/index.ts
// Lyra V6.0 主入口

import { TaskSpec, taskSpecJsonSchema } from './schemas/task_spec';
import { AppResponse, appResponseJsonSchema } from './schemas/app_response';
import { safeJsonParse, validate } from './validators';
import { assembleContext, renderSystemPrompt, renderClosingGuard } from './assembler';

export interface LyraConfig {
  openai?: string;
  google?: string;
  xai?: string;
  anthropic?: string;
}

export class LyraEngine {
  private config: LyraConfig;

  constructor(config: LyraConfig) {
    this.config = config;
  }

  /**
   * Phase 1 MVP: 白话 -> TaskSpec -> 校验
   * 暂时不调用真实模型，只验证链路
   */
  async parseIntent(userText: string): Promise<TaskSpec> {
    // TODO: 调用模型生成 TaskSpec
    // 当前返回 mock 数据验证链路
    const mockTaskSpec: TaskSpec = {
      task_type: "generate",
      user_intent: userText,
      input_text: userText,
      constraints: {
        language: "zh-CN",
        tone: "professional",
        length: "medium",
        format_hint: "json"
      },
      output_contract: {
        format: "json",
        schema_name: "app_response_v1"
      },
      model_policy: {
        target_vendor: "openai",
        strict_schema: true,
        temperature: 0.7
      },
      needs_clarification: false,
      missing_fields: []
    };

    const result = validate(mockTaskSpec, taskSpecJsonSchema as any);
    if (!result.ok) {
      throw new Error(`TaskSpec validation failed: ${result.errors.join('; ')}`);
    }

    return mockTaskSpec;
  }

  /**
   * Phase 1 测试：组装上下文
   */
  buildContext(taskSpec: TaskSpec): string {
    const ctx = assembleContext({
      role: "你是 Lyra V6.0，上下文装配与结构化输出引擎。",
      task: taskSpec.user_intent,
      constraints: [
        "必须且只输出符合给定 Schema 的 JSON",
        "信息不足时使用 needs_clarification=true",
        "不输出 Markdown 代码块",
        "不输出解释文字"
      ],
      schemaName: taskSpec.output_contract.schema_name
    });

    const systemPrompt = renderSystemPrompt(ctx);
    const closingGuard = renderClosingGuard(ctx);

    return `${systemPrompt}\n\n---\n\n${closingGuard}`;
  }

  /**
   * Phase 1 入口：验证链路
   */
  async run(userText: string): Promise<{ taskSpec: TaskSpec; context: string }> {
    const taskSpec = await this.parseIntent(userText);
    const context = this.buildContext(taskSpec);
    return { taskSpec, context };
  }
}
