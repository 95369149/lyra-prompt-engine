// src/schemas/business/marketing_copy.ts
// 业务子 Schema：营销文案

export const marketingCopySchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "bullets", "cta"],
  properties: {
    title: { type: "string" },
    summary: { type: "string" },
    bullets: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 5
    },
    cta: { type: "string" }
  }
} as const;
