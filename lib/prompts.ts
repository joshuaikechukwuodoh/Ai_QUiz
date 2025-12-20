import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const ONE_CALL_PROMPT = `
You are an expert educational content generator.

TASK:
1. Read the provided document text.
2. Generate a concise but complete summary.
3. Generate EXACTLY 50 multiple-choice questions (MCQs) based on the document.

RULES:
- Each question must have exactly 4 options.
- Only ONE option must be correct.
- Questions must cover the full document, not just the beginning.
- Difficulty: mixed (easy, medium, hard).
- Do NOT add explanations.
- Do NOT add extra text.

OUTPUT FORMAT (STRICT JSON ONLY):

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

DOCUMENT TEXT:
"""
{{TEXT}}
"""
`;

export const COMPRESS_PROMPT = `
You are a professional document compressor.

TASK:
Condense the following document into a concise but complete summary.
Preserve all key facts, concepts, and important details.
Do NOT add new information.

OUTPUT:
Plain text only.

DOCUMENT:
"""
{{TEXT}}
"""
`;
