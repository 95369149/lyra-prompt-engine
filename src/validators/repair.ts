// src/validators/repair.ts
// Repair Retry - 不合规结果自动修复

export function buildRepairPrompt(params: {
  originalOutput: string;
  errors: string[];
  schemaName: string;
}): string {
  return `你上一次的输出没有通过 ${params.schemaName} 校验。\n\n错误列表：\n${params.errors.map((e, i) => `${i + 1}. ${e}`).join("\n")}\n\n现在只做修复，不要重写任务，不要增加解释。\n\n必须遵守：\n1. 保持原字段结构不变\n2. 补齐缺失字段\n3. 删除 schema 外字段\n4. 保持字段类型正确\n5. 只输出修复后的合法 JSON\n\n原始输出：\n${params.originalOutput}`;
}
