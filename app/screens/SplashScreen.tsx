import type { FC } from "react";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { Surface, Text } from "react-native-paper";

type Props = {
  onFinish: () => void;
};

const SplashScreen: FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    // Auto-navigate after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <Surface
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F3FF",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/spy-brain.png")}
          style={{ width: 250, height: 250, marginBottom: 40 }}
          resizeMode="contain"
        />

        <Text
          variant="displaySmall"
          style={{
            marginBottom: 16,
            textAlign: "center",
            color: "#6B4EFF",
            fontWeight: "bold",
          }}
        >
          Brain Spy
        </Text>

        <Text
          variant="bodyLarge"
          style={{
            color: "#555",
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          Smart, fun questions powered by AI
        </Text>
      </View>
    </Surface>
  );
};

export default SplashScreen;
