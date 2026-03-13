// src/assembler/index.ts
// Context Assembler - 上下文装配器，解决 Lost in the Middle

export interface ContextBlock {
  role: string;
  task: string;
  constraints: string[];
  schema_hint: string;
  closing_guard: string;
}

export function assembleContext(params: {
  role: string;
  task: string;
  constraints: string[];
  schemaName: string;
}): ContextBlock {
  return {
    role: params.role,
    task: params.task,
    constraints: params.constraints,
    schema_hint: `输出必须符合 ${params.schemaName} schema`,
    closing_guard: `
⚠️ 最终提醒：
1. 只输出符合 ${params.schemaName} 的 JSON
2. 不输出 Markdown 代码块
3. 不输出解释文字
4. 所有字段必须存在且类型正确
`.trim()
  };
}

export function renderSystemPrompt(ctx: ContextBlock): string {
  return `
${ctx.role}

任务：${ctx.task}

约束：
${ctx.constraints.map((c, i) => `${i + 1}. ${c}`).join('\n')}

${ctx.schema_hint}
`.trim();
}

export function renderClosingGuard(ctx: ContextBlock): string {
  return ctx.closing_guard;
}
