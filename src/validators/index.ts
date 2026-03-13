// src/validators/index.ts
// 结果校验与安全解析

import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, strict: false });

export function safeJsonParse(text: string): unknown | null {
  // 尝试从可能包含 markdown 代码块的文本中提取 JSON
  const cleaned = text
    .replace(/^```(?:json)?\s*/m, "")
    .replace(/\s*```\s*$/m, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

export function validate(data: unknown, schema: Record<string, unknown>): {
  ok: boolean;
  errors: string[];
} {
  const check = ajv.compile(schema);
  const ok = check(data);
  if (ok) return { ok: true, errors: [] };
  const errors = check.errors?.map(
    (e) => `${e.instancePath || "/"} ${e.message}`
  ) ?? ["unknown validation error"];
  return { ok: false, errors };
}
