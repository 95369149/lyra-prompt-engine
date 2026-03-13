// src/assembler/index.ts
// Context Assembler V2 - 三层加载 + Lost in the Middle 防护
// 灵感来源：OpenViking L0/L1/L2 + 我们的 memory/.abstract 实践

export interface ContextLayer {
  level: "L0" | "L1" | "L2";
  label: string;
  content: string;
  tokenEstimate: number;
}

export interface AssembledContext {
  layers: ContextLayer[];
  systemPrompt: string;
  closingGuard: string;
  totalTokenEstimate: number;
  loadTrace: string[]; // 可观测性：记录加载了哪些层
}

/**
 * L0: Always-on 核心层（<300 tokens）
 * 角色定义 + 硬约束 + schema 声明
 * 每次调用必须加载，不可省略
 */
function buildL0(params: {
  role: string;
  constraints: string[];
  schemaName: string;
}): ContextLayer {
  const content = `${params.role}\n\n硬约束：\n${params.constraints.map((c, i) => `${i + 1}. ${c}`).join("\n")}\n\n输出必须符合 ${params.schemaName} schema。`;
  return {
    level: "L0",
    label: "core_identity_and_constraints",
    content,
    tokenEstimate: Math.ceil(content.length / 2)
  };
}

/**
 * L1: Task 层（按需加载）
 * 当前任务描述 + 业务上下文
 */
function buildL1(params: {
  task: string;
  businessContext?: string;
}): ContextLayer {
  let content = `当前任务：${params.task}`;
  if (params.businessContext) {
    content += `\n\n业务背景：${params.businessContext}`;
  }
  return {
    level: "L1",
    label: "task_and_context",
    content,
    tokenEstimate: Math.ceil(content.length / 2)
  };
}

/**
 * L2: Retrieved 层（仅在需要时注入）
 * few-shot 示例、历史记忆、检索结果
 */
function buildL2(params: {
  fewShots?: string[];
  retrievedMemory?: string[];
}): ContextLayer | null {
  const parts: string[] = [];
  if (params.fewShots?.length) {
    parts.push("参考示例：\n" + params.fewShots.join("\n---\n"));
  }
  if (params.retrievedMemory?.length) {
    parts.push("相关记忆：\n" + params.retrievedMemory.join("\n"));
  }
  if (!parts.length) return null;

  const content = parts.join("\n\n");
  return {
    level: "L2",
    label: "retrieved_context",
    content,
    tokenEstimate: Math.ceil(content.length / 2)
  };
}

/**
 * Closing Guard: 最后一刻格式提醒（利用 Recency Effect）
 * 放在 user prompt 最末尾，解决 Lost in the Middle
 */
function buildClosingGuard(schemaName: string): string {
  return `⚠️ 最终提醒：只输出符合 ${schemaName} 的合法 JSON。不输出 Markdown 代码块、不输出解释文字、所有字段必须存在且类型正确。`;
}

/**
 * 主装配函数
 * 按 L0 → L1 → L2 顺序装配，关键信息在首尾（防 Lost in the Middle）
 */
export function assembleContext(params: {
  role: string;
  task: string;
  constraints: string[];
  schemaName: string;
  businessContext?: string;
  fewShots?: string[];
  retrievedMemory?: string[];
  tokenBudget?: number;
}): AssembledContext {
  const budget = params.tokenBudget ?? 3000; // 默认 3000 tokens 上限
  const trace: string[] = [];
  const layers: ContextLayer[] = [];

  // L0 必须加载
  const l0 = buildL0({
    role: params.role,
    constraints: params.constraints,
    schemaName: params.schemaName
  });
  layers.push(l0);
  trace.push(`✅ L0 loaded: ${l0.tokenEstimate} tokens`);

  let used = l0.tokenEstimate;

  // L1 按需加载
  const l1 = buildL1({
    task: params.task,
    businessContext: params.businessContext
  });
  if (used + l1.tokenEstimate <= budget) {
    layers.push(l1);
    used += l1.tokenEstimate;
    trace.push(`✅ L1 loaded: ${l1.tokenEstimate} tokens`);
  } else {
    trace.push(`⚠️ L1 skipped: would exceed budget (${used + l1.tokenEstimate} > ${budget})`);
  }

  // L2 仅在有余量时加载
  const l2 = buildL2({
    fewShots: params.fewShots,
    retrievedMemory: params.retrievedMemory
  });
  if (l2 && used + l2.tokenEstimate <= budget) {
    layers.push(l2);
    used += l2.tokenEstimate;
    trace.push(`✅ L2 loaded: ${l2.tokenEstimate} tokens`);
  } else if (l2) {
    trace.push(`⚠️ L2 skipped: would exceed budget (${used + l2.tokenEstimate} > ${budget})`);
  } else {
    trace.push(`ℹ️ L2 empty: no few-shots or memory provided`);
  }

  // 装配 system prompt：L0 在最前（Primacy Effect）
  const systemPrompt = layers.map(l => l.content).join("\n\n---\n\n");
  const closingGuard = buildClosingGuard(params.schemaName);

  return {
    layers,
    systemPrompt,
    closingGuard,
    totalTokenEstimate: used,
    loadTrace: trace
  };
}

// 保持向后兼容
export function renderSystemPrompt(ctx: AssembledContext): string {
  return ctx.systemPrompt;
}

export function renderClosingGuard(ctx: AssembledContext): string {
  return ctx.closingGuard;
}
