export async function extractTextFromPdf(fileUrl: string): Promise<string> {
  const response = await fetch("https://api.pdf.co/v1/pdf/convert/to/text", {
    method: "POST",
    headers: {
      "x-api-key": process.env.PDFCO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: fileUrl,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PDF extraction failed: ${errorText}`);
  }

  const data = await response.json();

  // text returned directly
  if (typeof data.body === "string" && data.body.trim().length > 0) {
    return data.body;
  }

  // text available via URL
  if (typeof data.url === "string") {
    const textRes = await fetch(data.url);
    if (!textRes.ok) {
      throw new Error("Failed to download extracted text file");
    }
    const text = await textRes.text();
    if (text.trim().length === 0) {
      throw new Error("Extracted text file is empty");
    }
    return text;
  }

  throw new Error("No text extracted from PDF");
}
