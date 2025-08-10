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
  "Funny",
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Surface style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}
          >
            <Text variant="headlineLarge" style={styles.mainTitle}>
              Who&apos;s Playing?
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                label="Add Participant"
                mode="outlined"
                value={nameInput}
                onChangeText={setNameInput}
                onSubmitEditing={addParticipant}
                returnKeyType="done"
                style={styles.input}
              />
              <Button
                mode="contained"
                onPress={addParticipant}
                disabled={!nameInput.trim()}
                style={styles.addButton}
                contentStyle={styles.addButtonContent}
                icon="plus"
              >
                Add
              </Button>
            </View>

            <View style={styles.chipGroup}>
              {participants.length === 0 ? (
                <Text style={styles.emptyHint}>
                  Add at least one participant to start the game.
                </Text>
              ) : (
                participants.map((name, idx) => (
                  <Chip
                    key={idx}
                    mode="flat"
                    style={styles.participantChip}
                    onClose={() =>
                      setParticipants((prev) =>
                        prev.filter((_, i) => i !== idx)
                      )
                    }
                    closeIcon="close"
                  >
                    {name}
                  </Chip>
                ))
              )}
            </View>

            <Text variant="headlineMedium" style={styles.title}>
              🎯 Select Topics
            </Text>

            <View style={styles.chipGroupTopics}>
              {selectedTopics.length === 0 ? (
                <Text style={styles.emptyHint}>
                  Select at least one topic to continue.
                </Text>
              ) : null}
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
                style={{ borderRadius: 12, marginTop: 16 }}
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
    paddingBottom: 16, // reduced from 100
  },
  scrollContent: {
    paddingBottom: 16, // reduced from 32
  },
  stepper: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
    textAlign: "center",
  },
  mainTitle: {
    marginTop: 24,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    marginTop: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: "#6B4EFF",
  },
  addButtonContent: {
    height: 50,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  chipGroupTopics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16, // reduced from 32
    marginTop: 8,
  },
  chip: {
    margin: 4,
  },
  participantChip: {
    margin: 4,
    backgroundColor: "#E0E7FF",
    borderColor: "#6B4EFF",
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: "#D6CCFF",
  },
  buttonContainer: {
    alignItems: "center",
  },
  emptyHint: {
    color: "#888",
    fontStyle: "italic",
    marginVertical: 8,
    textAlign: "center",
    width: "100%",
  },
});
