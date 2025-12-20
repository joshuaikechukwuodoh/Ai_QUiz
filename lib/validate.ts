export function validateQuestions(data: any) {
  if (!data.questions || !Array.isArray(data.questions)) {
    throw new Error("Invalid questions format");
  }

  if (data.questions.length !== 50) {
    throw new Error("AI did not generate exactly 50 questions");
  }

  return true;
}
