// src/adapters/gemini.ts
export async function callGemini(params: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  schema: any;
}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${params.model}:generateContent?key=${params.apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: params.systemPrompt }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: params.userPrompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseJsonSchema: params.schema
      }
    })
  });

  if (!res.ok) {
    throw new Error(`GEMINI_HTTP_${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}
