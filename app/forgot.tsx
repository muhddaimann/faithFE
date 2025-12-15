import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { KeyRound } from "lucide-react-native";
import { router } from "expo-router";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import AppHeader from "../components/shared/header";

export default function ForgotPassword() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const [email, setEmail] = useState("");

  const enterOpacity = useRef(new Animated.Value(0)).current;
  const enterY = useRef(new Animated.Value(16)).current;
  const liftY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(enterOpacity, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(enterY, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const show = Keyboard.addListener("keyboardWillShow", () => {
      Animated.spring(liftY, {
        toValue: -20,
        damping: 20,
        stiffness: 160,
        mass: 0.6,
        useNativeDriver: true,
      }).start();
    });

    const hide = Keyboard.addListener("keyboardWillHide", () => {
      Animated.spring(liftY, {
        toValue: 0,
        damping: 18,
        stiffness: 140,
        mass: 0.6,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <ScrollView
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: design.spacing.lg,
            paddingTop: design.spacing.lg,
          }}
        >
          <AppHeader title="" subtitle="" />

          <Animated.View
            style={{
              opacity: enterOpacity,
              transform: [{ translateY: enterY }, { translateY: liftY }],
              gap: design.spacing.md,
            }}
          >
            <View
              style={{
                alignItems: "center",
                gap: design.spacing.sm,
                marginBottom: design.spacing.md,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: theme.colors.secondaryContainer,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: theme.colors.secondary,
                  shadowOpacity: 0.18,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 6,
                }}
              >
                <KeyRound size={26} color={theme.colors.onSecondaryContainer} />
              </View>

              <Text
                variant="headlineMedium"
                style={{ color: theme.colors.onBackground }}
              >
                Reset Password
              </Text>

              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                  maxWidth: 300,
                }}
              >
                Enter your email and we’ll send you instructions to reset your
                password.
              </Text>
            </View>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="done"
            />

            <Button
              mode="contained"
              style={{
                marginTop: design.spacing.sm,
                borderRadius: design.radii.lg,
              }}
              contentStyle={{ height: 48 }}
              onPress={() => router.back()}
            >
              Send Reset Link
            </Button>

            <Pressable
              onPress={() => router.back()}
              style={{ alignSelf: "center", marginTop: design.spacing.sm }}
            >
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.primary }}
              >
                Back to Sign In
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
