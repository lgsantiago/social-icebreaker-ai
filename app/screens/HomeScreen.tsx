import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { FC } from "react";
import React from "react";
import { Image } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <Surface
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#F5F3FF", // Soft lavender vibe
      }}
    >
      <Image
        source={require("../../assets/images/spy-brain.png")}
        style={{ width: 200, height: 200, marginBottom: 32 }}
        resizeMode="contain"
      />

      <Text
        variant="headlineMedium"
        style={{ marginBottom: 12, textAlign: "center" }}
      >
        Welcome to Brain Spy!
      </Text>
      <Text
        variant="bodyMedium"
        style={{ marginBottom: 24, color: "#555", textAlign: "center" }}
      >
        Smart, fun questions powered by AI.
      </Text>

      <Button
        mode="contained"
        buttonColor="#6B4EFF"
        contentStyle={{ paddingHorizontal: 32, paddingVertical: 8 }}
        onPress={() => navigation.navigate("Setup")}
      >
        🕵️ Start Spying
      </Button>
    </Surface>
  );
};

export default HomeScreen;
