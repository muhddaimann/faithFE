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
import { LogIn } from "lucide-react-native";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import AppHeader from "../components/shared/header";
import useAuth from "../hooks/useAuth";

export default function SignIn() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);

  const passRef = useRef<any>(null);

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
        toValue: -24,
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

  const handleSignIn = async () => {
    setError(null);
    const ok = await signIn(username, pass);
    if (!ok) setError("Invalid username or password");
  };

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
                  backgroundColor: theme.colors.primaryContainer,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: theme.colors.primary,
                  shadowOpacity: 0.18,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 6,
                }}
              >
                <LogIn size={26} color={theme.colors.onPrimaryContainer} />
              </View>

              <Text
                variant="headlineMedium"
                style={{ color: theme.colors.onBackground }}
              >
                Sign In
              </Text>

              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                  maxWidth: 300,
                }}
              >
                Access your work details and stay on track.
              </Text>
            </View>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passRef.current?.focus()}
            />

            <TextInput
              ref={passRef}
              label="Password"
              value={pass}
              onChangeText={setPass}
              secureTextEntry
              mode="outlined"
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
            />

            {error && (
              <Text variant="bodySmall" style={{ color: theme.colors.error }}>
                {error}
              </Text>
            )}

            <Button
              mode="contained"
              style={{
                marginTop: design.spacing.sm,
                borderRadius: design.radii.lg,
              }}
              contentStyle={{ height: 48 }}
              onPress={handleSignIn}
            >
              Sign In
            </Button>
          </Animated.View>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
