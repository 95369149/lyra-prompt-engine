// src/schemas/task_spec.ts
// TaskSpec v1 - 白话转标准任务的中间态

export const TASK_TYPES = [
  "generate", "rewrite", "summarize", "extract", "classify", "translate", "qa"
] as const;

export type TaskType = typeof TASK_TYPES[number];

export interface TaskSpec {
  task_type: TaskType;
  user_intent: string;
  input_text: string;
  constraints: {
    language: string;
    tone: string;
    length: string;
    format_hint: string;
  };
  output_contract: {
    format: "json" | "markdown" | "text";
    schema_name: string;
  };
  model_policy: {
    target_vendor: "openai" | "google" | "xai" | "anthropic";
    strict_schema: boolean;
    temperature: number;
  };
  needs_clarification: boolean;
  missing_fields: string[];
}

export const taskSpecJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "task_type", "user_intent", "input_text", "constraints",
    "output_contract", "model_policy", "needs_clarification", "missing_fields"
  ],
  properties: {
    task_type: { type: "string", enum: TASK_TYPES },
    user_intent: { type: "string" },
    input_text: { type: "string" },
    constraints: {
      type: "object",
      additionalProperties: false,
      required: ["language", "tone", "length", "format_hint"],
      properties: {
        language: { type: "string" },
        tone: { type: "string" },
        length: { type: "string" },
        format_hint: { type: "string" }
      }
    },
    output_contract: {
      type: "object",
      additionalProperties: false,
      required: ["format", "schema_name"],
      properties: {
        format: { type: "string", enum: ["json", "markdown", "text"] },
        schema_name: { type: "string" }
      }
    },
    model_policy: {
      type: "object",
      additionalProperties: false,
      required: ["target_vendor", "strict_schema", "temperature"],
      properties: {
        target_vendor: { type: "string", enum: ["openai", "google", "xai", "anthropic"] },
        strict_schema: { type: "boolean" },
        temperature: { type: "number" }
      }
    },
    needs_clarification: { type: "boolean" },
    missing_fields: { type: "array", items: { type: "string" } }
  }
} as const;
