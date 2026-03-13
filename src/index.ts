// src/index.ts
// Lyra V6.0 主入口

import { TaskSpec, taskSpecJsonSchema } from './schemas/task_spec';
import { AppResponse, appResponseJsonSchema } from './schemas/app_response';
import { safeJsonParse, validate } from './validators';
import { buildRepairPrompt } from './validators/repair';
import { assembleContext, renderSystemPrompt, renderClosingGuard } from './assembler';
import { detectVendorProfile, wrapSystemPrompt } from './policies/vendor_profiles';
import { callOpenAI } from './adapters/openai';
import { callGemini } from './adapters/gemini';
import { callGrok } from './adapters/grok';

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

  async parseIntent(userText: string): Promise<TaskSpec> {
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

  buildContext(taskSpec: TaskSpec, vendor: string, model: string): { systemPrompt: string; closingGuard: string } {
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

    const profile = detectVendorProfile(vendor, model);
    const basePrompt = renderSystemPrompt(ctx);
    const systemPrompt = wrapSystemPrompt(profile, basePrompt);
    const closingGuard = renderClosingGuard(ctx);

    return { systemPrompt, closingGuard };
  }

  async callVendor(vendor: string, model: string, systemPrompt: string, userPrompt: string, schema: any): Promise<string> {
    if (vendor === "openai" && this.config.openai) {
      return callOpenAI({
        apiKey: this.config.openai,
        model,
        systemPrompt,
        userPrompt,
        schemaName: "app_response_v1",
        schema
      });
    }
    if (vendor === "google" && this.config.google) {
      return callGemini({
        apiKey: this.config.google,
        model,
        systemPrompt,
        userPrompt,
        schema
      });
    }
    if (vendor === "xai" && this.config.xai) {
      return callGrok({
        apiKey: this.config.xai,
        model,
        systemPrompt,
        userPrompt,
        schemaName: "app_response_v1",
        schema
      });
    }
    throw new Error(`Unsupported vendor or missing key: ${vendor}`);
  }

  async run(userText: string, vendor = "openai", model = "gpt-4.1"): Promise<{ taskSpec: TaskSpec; context: string; phase: string }> {
    const taskSpec = await this.parseIntent(userText);
    const { systemPrompt, closingGuard } = this.buildContext(taskSpec, vendor, model);
    return {
      taskSpec,
      context: `${systemPrompt}\n\n---\n\n${closingGuard}`,
      phase: "phase2-skeleton-ready"
    };
  }

  buildRepairPromptExample(errors: string[], badOutput: string): string {
    return buildRepairPrompt({
      originalOutput: badOutput,
      errors,
      schemaName: "app_response_v1"
    });
  }
}
