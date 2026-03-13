// src/adapters/grok.ts
export async function callGrok(params: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  schemaName: string;
  schema: any;
}) {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`
    },
    body: JSON.stringify({
      model: params.model,
      messages: [
        { role: "system", content: params.systemPrompt },
        { role: "user", content: params.userPrompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: params.schemaName,
          schema: params.schema
        }
      }
    })
  });

  if (!res.ok) {
    throw new Error(`GROK_HTTP_${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}
