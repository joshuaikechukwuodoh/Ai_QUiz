import { extractTextFromPdf } from "@/lib/pdf";
import { compressText, generateQuizFromSummary } from "@/lib/ai";
import { truncateText } from "@/lib/text";


export async function POST(req: Request) {
  const { fileUrl } = await req.json();

  const rawText = await extractTextFromPdf(fileUrl);

  // 🔑 THIS LINE STOPS THE 429 FOREVER
  const truncated = truncateText(rawText);

  const compressed = await compressText(truncated);

  const quiz = await generateQuizFromSummary(compressed);

  return Response.json(quiz);
}
