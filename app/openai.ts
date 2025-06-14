import OpenAI from "openai";

const apiKey =
  process.env.EXPO_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "OpenAI API key is not set. Please set EXPO_PUBLIC_OPENAI_API_KEY or OPENAI_API_KEY."
  );
}

const openai = new OpenAI({ apiKey });

export async function generateIcebreakerQuestion(
  participant: string,
  topics: string[] = []
): Promise<string> {
  const prompt = `Generate a fun, thought-provoking icebreaker question for a group game. The question should be addressed to ${participant} and relate to the following topics: ${
    topics.join(", ") || "any topic"
  }.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a creative party game assistant." },
      { role: "user", content: prompt },
    ],
    max_tokens: 60,
    temperature: 0.9,
  });

  const message = response.choices[0]?.message?.content?.trim();
  return message || "Couldn't generate a question. Try again!";
}
