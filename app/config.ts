// Configuration file for environment variables and app settings
export const config = {
  // API Configuration
  openaiApiKey:
    process.env.EXPO_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  customApiEndpoint: process.env.EXPO_PUBLIC_API_ENDPOINT || null,

  // App Configuration
  appName: "BrainSpy",
  version: "1.0.0",

  // Feature Flags
  enableCustomApi: !!process.env.EXPO_PUBLIC_API_ENDPOINT,
  enableDebugLogging: __DEV__,
};

// Validation
if (!config.openaiApiKey) {
  console.warn(
    "OpenAI API key is not set. The app will not be able to generate questions."
  );
}

// Helper function to safely parse JSON responses
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn("Failed to parse JSON:", error);
    return fallback;
  }
}

// Helper function to validate API responses
export function validateApiResponse(data: any): data is { question: string } {
  return (
    data &&
    typeof data === "object" &&
    typeof data.question === "string" &&
    data.question.trim().length > 0
  );
}
