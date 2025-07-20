import { useRoute } from "@react-navigation/native";
import type { FC } from "react";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { generateIcebreakerQuestion } from "../openai";

const GameScreen: FC = () => {
  const route = useRoute();
  // @ts-ignore
  const participants: string[] = route.params?.participants || [];
  // @ts-ignore
  const topics: string[] = route.params?.topics || [];
  const [loading, setLoading] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null
  );
  const [question, setQuestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBreakTheIce = async () => {
    if (participants.length === 0) {
      setError(
        "No participants available. Please go back and add participants."
      );
      return;
    }

    setLoading(true);
    setError(null);
    setQuestion(null);

    try {
      // Pick a random participant
      const participant =
        participants[Math.floor(Math.random() * participants.length)];
      setSelectedParticipant(participant);

      const generatedQuestion = await generateIcebreakerQuestion(
        participant,
        topics
      );

      if (
        generatedQuestion &&
        typeof generatedQuestion === "string" &&
        generatedQuestion.trim()
      ) {
        setQuestion(generatedQuestion.trim());
      } else {
        throw new Error("Invalid question generated");
      }
    } catch (err: any) {
      console.error("Error generating question:", err);
      setError("Generation attempts exceeded. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Surface
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#F5F3FF",
      }}
    >
      <Text
        variant="headlineMedium"
        style={{ marginBottom: 12, textAlign: "center" }}
      >
        Ready to Break the Ice?
      </Text>
      <Text
        variant="bodyMedium"
        style={{ marginBottom: 32, textAlign: "center", color: "#555" }}
      >
        Press the button below to reveal a brainy question.
      </Text>

      <View
        style={{
          width: "100%",
          backgroundColor: "#E5E4F7",
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          alignItems: "center",
        }}
      >
        {loading ? (
          <Text style={{ fontSize: 16, color: "#777", textAlign: "center" }}>
            ⏳ Generating question...
          </Text>
        ) : error ? (
          <Text style={{ fontSize: 16, color: "#D00", textAlign: "center" }}>
            {error}
          </Text>
        ) : question && selectedParticipant ? (
          <>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
              👤 {selectedParticipant}
            </Text>
            <Text style={{ fontSize: 16, color: "#333", textAlign: "center" }}>
              {question}
            </Text>
          </>
        ) : (
          <Text style={{ fontSize: 16, color: "#777", textAlign: "center" }}>
            🧠 Waiting to generate your first question...
          </Text>
        )}
      </View>

      <Button
        mode="contained"
        buttonColor="#6B4EFF"
        contentStyle={{ paddingHorizontal: 32, paddingVertical: 8 }}
        style={{ borderRadius: 12 }}
        onPress={handleBreakTheIce}
        disabled={loading || participants.length === 0}
      >
        🔍 Break the Ice!
      </Button>
    </Surface>
  );
};

export default GameScreen;
