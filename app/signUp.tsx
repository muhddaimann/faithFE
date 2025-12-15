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
import { UserPlus } from "lucide-react-native";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import AppHeader from "../components/shared/header";
import useAuth from "../hooks/useAuth";

export default function SignUp() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const emailRef = useRef<any>(null);
  const passRef = useRef<any>(null);
  const confirmRef = useRef<any>(null);
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

  const onSubmit = async () => {
    if (!username || !pass || pass !== confirmPass) return;

    await signUp(username, pass);
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
                }}
              >
                <UserPlus size={26} color={theme.colors.onPrimaryContainer} />
              </View>

              <Text
                variant="headlineMedium"
                style={{ color: theme.colors.onBackground }}
              >
                Create Account
              </Text>

              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                  maxWidth: 300,
                }}
              >
                Set up your account to access your work details.
              </Text>
            </View>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />

            <TextInput
              ref={emailRef}
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
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
              returnKeyType="next"
              onSubmitEditing={() => confirmRef.current?.focus()}
            />

            <TextInput
              ref={confirmRef}
              label="Confirm Password"
              value={confirmPass}
              onChangeText={setConfirmPass}
              secureTextEntry
              mode="outlined"
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />

            <Button
              mode="contained"
              style={{
                marginTop: design.spacing.sm,
                borderRadius: design.radii.lg,
              }}
              contentStyle={{ height: 48 }}
              onPress={onSubmit}
            >
              Sign Up
            </Button>
          </Animated.View>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
