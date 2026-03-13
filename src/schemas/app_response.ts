// src/schemas/app_response.ts
// AppResponse v1 - 给 App 的标准输出

export interface AppResponse {
  status: "success" | "needs_clarification" | "error";
  data: Record<string, unknown>;
  errors: string[];
  meta: {
    vendor: string;
    model: string;
    schema_version: string;
  };
}

export const appResponseJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["status", "data", "errors", "meta"],
  properties: {
    status: { type: "string", enum: ["success", "needs_clarification", "error"] },
    data: { type: "object" },
    errors: { type: "array", items: { type: "string" } },
    meta: {
      type: "object",
      additionalProperties: false,
      required: ["vendor", "model", "schema_version"],
      properties: {
        vendor: { type: "string" },
        model: { type: "string" },
        schema_version: { type: "string" }
      }
    }
  }
} as const;
