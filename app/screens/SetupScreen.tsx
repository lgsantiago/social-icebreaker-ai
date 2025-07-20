import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { FC } from "react";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Chip, Surface, Text, TextInput } from "react-native-paper";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const TOPIC_OPTIONS = [
  "Friends",
  "Date",
  "Party",
  "Work",
  "Family",
  "Philosophical",
  "Funnny",
];

const SetupScreen: FC<Props> = ({ navigation }) => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const addParticipant = () => {
    if (nameInput.trim()) {
      setParticipants((prev) => [...prev, nameInput.trim()]);
      setNameInput("");
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Surface style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text variant="headlineMedium" style={styles.title}>
              Who&apos;s Playing?
            </Text>

            <TextInput
              label="Add Participant"
              mode="outlined"
              value={nameInput}
              onChangeText={setNameInput}
              onSubmitEditing={addParticipant}
              returnKeyType="done"
              right={<TextInput.Icon icon="plus" onPress={addParticipant} />}
              style={styles.input}
            />

            <View style={styles.chipGroup}>
              {participants.map((name, idx) => (
                <Chip key={idx} mode="flat" style={styles.chip}>
                  {name}
                </Chip>
              ))}
            </View>

            <Text variant="headlineMedium" style={styles.title}>
              🎯 Select Topics
            </Text>

            <View style={styles.chipGroup}>
              {TOPIC_OPTIONS.map((topic) => (
                <Chip
                  key={topic}
                  mode="outlined"
                  style={[
                    styles.chip,
                    selectedTopics.includes(topic) && styles.chipSelected,
                  ]}
                  selected={selectedTopics.includes(topic)}
                  onPress={() => toggleTopic(topic)}
                >
                  {topic}
                </Chip>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                buttonColor="#6B4EFF"
                contentStyle={{ paddingHorizontal: 32, paddingVertical: 10 }}
                style={{ borderRadius: 12 }}
                onPress={() =>
                  navigation.navigate("Game", {
                    participants,
                    topics: selectedTopics,
                  })
                }
                disabled={
                  participants.length === 0 || selectedTopics.length === 0
                }
              >
                Continue
              </Button>
            </View>
          </ScrollView>
        </Surface>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 100, // reserve space for the button
  },
  scrollContent: {
    paddingBottom: 32,
  },
  stepper: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    marginTop: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    margin: 4,
  },
  chipSelected: {
    backgroundColor: "#D6CCFF",
  },
  buttonContainer: {
    alignItems: "center",
  },
});
