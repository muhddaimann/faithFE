import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import { router } from "expo-router";

export default function SignIn() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.lg,
        paddingBottom: design.spacing.xl,
      }}
    >
      <Text
        variant="headlineSmall"
        style={{ color: theme.colors.onBackground, marginBottom: design.spacing.lg }}
      >
        Sign In
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={{ marginBottom: design.spacing.md }}
      />

      <TextInput
        label="Password"
        value={pass}
        secureTextEntry
        onChangeText={setPass}
        mode="outlined"
        style={{ marginBottom: design.spacing.lg }}
      />

      <Button mode="contained" onPress={() => router.replace("/welcome")}>
        Continue
      </Button>
    </ScrollView>
  );
}
