import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// ---------- PROMPTS ----------

const COMPRESS_PROMPT = `
Condense the following document into a concise but complete summary.
Preserve all key facts and concepts.
Do NOT add new information.
Output plain text only.

DOCUMENT:
"""
{{TEXT}}
"""
`;

const QUIZ_PROMPT = `
You are an expert educational content generator.

Using the document summary below, generate EXACTLY 50 multiple-choice questions.

RULES:
- 4 options per question
- Only ONE correct answer
- Mixed difficulty
- No explanations
- JSON ONLY

FORMAT:

{
  "summary": "string",
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A"
    }
  ]
}

DOCUMENT SUMMARY:
"""
{{TEXT}}
"""
`;

// ---------- FUNCTIONS ----------

export async function compressText(text: string): Promise<string> {
  const prompt = COMPRESS_PROMPT.replace("{{TEXT}}", text);

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return res.choices[0].message.content!;
}

export async function generateQuizFromSummary(summary: string) {
  const prompt = QUIZ_PROMPT.replace("{{TEXT}}", summary);

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  return JSON.parse(res.choices[0].message.content!);
}
