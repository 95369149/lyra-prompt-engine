# 示例：营销文案 / 短视频脚本

## 用户白话输入

```
帮我写一个小红书风格的防晒喷雾推广文案，
目标人群是 25-35 岁女性，
要突出清爽、不搓泥、补喷方便，
风格真实种草，不要太硬广。
```

## Lyra 编译后的 TaskSpec

```json
{
  "task_type": "generate",
  "user_intent": "为防晒喷雾生成小红书风格种草文案",
  "input_text": "",
  "constraints": {
    "language": "zh-CN",
    "tone": "真实种草、轻松、口语化",
    "length": "150-300 字",
    "format_hint": "标题 + 正文 + CTA"
  },
  "output_contract": {
    "format": "json",
    "schema_name": "xhs_marketing_copy_v1"
  },
  "model_policy": {
    "target_vendor": "openai",
    "strict_schema": true,
    "temperature": 0.8
  },
  "needs_clarification": false,
  "missing_fields": []
}
```

## 推荐输出字段

```json
{
  "hook": "string",
  "title": "string",
  "body": "string",
  "bullets": ["string"],
  "cta": "string"
}
```

## Lyra 生成的系统提示词

```
你是一位擅长小红书种草文案的内容策划。你的目标不是写硬广，而是写出像真实用户分享体验一样的高转化文案。

必须遵守：
1. 语言口语化、自然、有生活感
2. 突出真实使用场景
3. 不要堆砌夸张形容词
4. 必须体现：清爽、不搓泥、补喷方便
5. 目标人群：25-35 岁女性
6. 只输出符合 schema 的 JSON
```

## Lyra 生成的用户提示词

```
请为一款防晒喷雾生成小红书风格种草文案。

要求：
- 目标人群：25-35 岁女性
- 卖点：清爽、不搓泥、补喷方便
- 风格：像真实体验分享，不要像广告
- 输出字段：hook / title / body / bullets / cta
- 只输出 JSON，不要解释
```
