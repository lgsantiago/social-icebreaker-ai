import OpenAI from "openai";
import { config, safeJsonParse, validateApiResponse } from "./config";

if (!config.openaiApiKey) {
  throw new Error(
    "OpenAI API key is not set. Please set EXPO_PUBLIC_OPENAI_API_KEY or OPENAI_API_KEY."
  );
}

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export async function generateIcebreakerQuestion(
  participant: string,
  topics: string[] = []
): Promise<string> {
  if (config.customApiEndpoint) {
    try {
      const response = await fetch(config.customApiEndpoint, {
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
        throw new Error(
          `REST API request failed with status: ${response.status}`
        );
      }

      const responseText = await response.text();
      const data = safeJsonParse<{ question?: string }>(responseText, {});

      // Validate the response structure
      if (validateApiResponse(data)) {
        return data.question.trim();
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.warn("Falling back to OpenAI implementation:", error);
    }
  }
}

// Keep the original implementation as a fallback
async function generateIcebreakerQuestionWithOpenAI(
  participant: string,
  topics: string[] = []
): Promise<string> {
  try {
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
  } catch (error) {
    if (config.enableDebugLogging) {
      console.error("OpenAI API error:", error);
    }
    return "Sorry, I'm having trouble generating questions right now. Please try again later.";
  }
}
