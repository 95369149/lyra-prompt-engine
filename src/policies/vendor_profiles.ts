// src/policies/vendor_profiles.ts
// 模型家族策略：按供应商/模型类型渲染不同 prompt 风格

export type VendorProfile =
  | "openai_reasoning"
  | "openai_gpt"
  | "claude"
  | "gemini"
  | "xai";

export function detectVendorProfile(vendor: string, model: string): VendorProfile {
  const m = model.toLowerCase();
  if (vendor === "openai") {
    if (m.includes("o1") || m.includes("o3") || m.includes("reason")) {
      return "openai_reasoning";
    }
    return "openai_gpt";
  }
  if (vendor === "anthropic") return "claude";
  if (vendor === "google") return "gemini";
  return "xai";
}

export function wrapSystemPrompt(profile: VendorProfile, corePrompt: string): string {
  switch (profile) {
    case "openai_reasoning":
      // 推理模型：简单直接，避免显式 CoT
      return corePrompt;

    case "openai_gpt":
      return `${corePrompt}\n\n直接执行任务，输出最终结果。`;

    case "claude":
      // Claude 喜欢 XML/分段
      return `<system_role>\nLyra V6.0\n</system_role>\n\n<instructions>\n${corePrompt}\n</instructions>`;

    case "gemini":
      // Gemini：保持扁平、少嵌套
      return corePrompt.replace(/\n\n/g, "\n");

    case "xai":
      return `${corePrompt}\n\nKeep output concise and schema-compliant.`;
  }
}
