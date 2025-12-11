import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Text,
  TextInput,
  Button,
  Chip,
  FAB,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import { useAppTheme } from "../contexts/themeContext";

export default function Index() {
  const [text, setText] = useState("");
  const { mode, setMode } = useAppTheme();
  const theme = useTheme();

  const styles = getStyles(theme);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      bounces={false}
      overScrollMode="never"
      style={{ backgroundColor: theme.colors.background }}
    >
      <View style={styles.section}>
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onBackground }}
        >
          Theme Control
        </Text>

        <SegmentedButtons
          value={mode}
          onValueChange={(value) => setMode(value as any)}
          buttons={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System" },
          ]}
          style={styles.segmented}
          density="medium"
        />
      </View>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          titleStyle={{ color: theme.colors.onSurface }}
          subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            This is a demo of React Native Paper components.
          </Text>
          <TextInput
            label="Email"
            value={text}
            onChangeText={setText}
            mode="outlined"
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            textColor={theme.colors.onSurface}
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="text" textColor={theme.colors.primary}>
            Cancel
          </Button>
          <Button mode="contained" buttonColor={theme.colors.primary}>
            Ok
          </Button>
        </Card.Actions>
      </Card>

      <Chip
        icon="information"
        style={[
          styles.chip,
          {
            backgroundColor: theme.colors.surfaceVariant,
            borderColor: theme.colors.outline,
          },
        ]}
        textStyle={{ color: theme.colors.onSurfaceVariant }}
        onPress={() => {}}
      >
        Information Chip
      </Chip>

      <Chip
        icon="heart"
        mode="outlined"
        style={styles.chip}
        selected
        textStyle={{ color: theme.colors.primary }}
      >
        Outlined Chip
      </Chip>

      <Button
        icon="camera"
        mode="contained"
        onPress={() => {}}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        textColor={theme.colors.onPrimary}
      >
        Contained Button
      </Button>

      <Button
        icon="plus"
        mode="outlined"
        onPress={() => {}}
        style={[styles.button, { borderColor: theme.colors.outline }]}
        textColor={theme.colors.primary}
      >
        Outlined Button
      </Button>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.onPrimary}
        onPress={() => {}}
      />
    </ScrollView>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 120,
    },
    section: {
      marginBottom: 16,
      gap: 8,
    },
    segmented: {
      alignSelf: "stretch",
    },
    card: {
      marginBottom: 16,
    },
    input: {
      marginTop: 12,
    },
    button: {
      marginVertical: 8,
    },
    chip: {
      marginVertical: 4,
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });
