import OpenAI from "openai";

const apiKey =
  process.env.EXPO_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "OpenAI API key is not set. Please set EXPO_PUBLIC_OPENAI_API_KEY or OPENAI_API_KEY."
  );
}

const openai = new OpenAI({ apiKey });
const API_ENDPOINT =
  "https://social-icebraker-81n4eg9qw-lgsantiagos-projects.vercel.app/api/generate-question";

export async function generateIcebreakerQuestion(
  participant: string,
  topics: string[] = []
): Promise<string> {
  try {
    // Try the REST API first
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participant,
        topics: topics.join(", ") || "any topic",
      }),
    });

    if (!response.ok) {
      throw new Error("REST API request failed");
    }

    const data = await response.json();
    return data.question;
  } catch (error) {
    console.warn("Falling back to OpenAI implementation:", error);
    return generateIcebreakerQuestionWithOpenAI(participant, topics);
  }
}

// Keep the original implementation as a fallback
async function generateIcebreakerQuestionWithOpenAI(
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
