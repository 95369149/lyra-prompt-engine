# 示例：App 可解析 JSON 输出

## 用户白话输入

```
把这段客户留言整理成客服回复建议，
并判断情绪是积极、中立还是负面，
最后给出下一步动作建议。
```

## Lyra 编译后的 TaskSpec

```json
{
  "task_type": "classify",
  "user_intent": "分析客户留言并生成客服回复建议",
  "input_text": "客户留言原文",
  "constraints": {
    "language": "zh-CN",
    "tone": "专业、礼貌、安抚性",
    "length": "简洁",
    "format_hint": "固定 JSON"
  },
  "output_contract": {
    "format": "json",
    "schema_name": "customer_service_response_v1"
  },
  "model_policy": {
    "target_vendor": "google",
    "strict_schema": true,
    "temperature": 0.2
  },
  "needs_clarification": false,
  "missing_fields": []
}
```

## AppResponse v1 示例

```json
{
  "status": "success",
  "data": {
    "sentiment": "negative",
    "summary": "客户对发货延迟表示不满，希望尽快得到处理结果。",
    "reply_suggestion": "非常抱歉给您带来不便，我们已经加急核查订单状态，会在今天内给您明确回复。",
    "next_action": "客服 2 小时内人工跟进并同步物流结果"
  },
  "errors": [],
  "meta": {
    "vendor": "google",
    "model": "gemini-1.5-pro",
    "schema_version": "v1"
  }
}
```

## Repair Prompt

```text
你上一次输出未通过校验。请只修复 JSON：
1. 保持字段结构不变
2. sentiment 只能是 positive / neutral / negative
3. 不允许输出解释文字
4. 只返回修复后的 JSON
```
