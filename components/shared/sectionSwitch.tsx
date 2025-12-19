import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme, Portal, Modal, Divider } from "react-native-paper";
import { ChevronDown } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

export type SectionItem<T extends string> = {
  key: T;
  label: string;
  hint?: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
};

type SectionSwitcherProps<T extends string> = {
  value: T;
  items: SectionItem<T>[];
  onChange: (value: T) => void;
  title?: string;
};

export default function SectionSwitcher<T extends string>({
  value,
  items,
  onChange,
  title = "You’re viewing",
}: SectionSwitcherProps<T>) {
  const { colors } = useTheme();
  const { design } = useDesign();
  const [open, setOpen] = useState(false);

  const activeItem = items.find((i) => i.key === value)!;
  const ActiveIcon = activeItem.icon;

  return (
    <View>
      <Text
        variant="labelLarge"
        style={{
          color: colors.onSurfaceVariant,
          marginBottom: design.spacing.xs,
          paddingHorizontal: design.spacing.xs,
        }}
      >
        {title}
      </Text>

      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => ({
          padding: design.spacing.md,
          borderRadius: design.radii.xl,
          backgroundColor: colors.surface,
          flexDirection: "row",
          alignItems: "center",
          gap: design.spacing.sm,
          elevation: pressed
            ? design.elevation.level1
            : design.elevation.level3,

          shadowColor: colors.shadow,
          shadowOpacity: pressed ? 0.08 : 0.1,
          shadowRadius: pressed ? 2 : 4,
          shadowOffset: { width: 0, height: pressed ? 2 : 4 },
          transform: [{ scale: pressed ? 0.99 : 1 }],
        })}
      >
        {ActiveIcon && (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
            }}
          >
            <ActiveIcon size={20} color={colors.onPrimary} />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text
            variant="titleSmall"
            style={{ color: colors.onSurface, fontWeight: "600" }}
          >
            {activeItem.label}
          </Text>

          {activeItem.hint && (
            <Text
              variant="bodySmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              {activeItem.hint}
            </Text>
          )}
        </View>

        <ChevronDown size={18} color={colors.onSurfaceVariant} />
      </Pressable>

      <Portal>
        <Modal
          visible={open}
          onDismiss={() => setOpen(false)}
          contentContainerStyle={{
            marginHorizontal: design.spacing.md,
            padding: design.spacing.md,
            borderRadius: design.radii.xl,
            backgroundColor: colors.surface,
          }}
        >
          <Text
            variant="titleSmall"
            style={{
              color: colors.onSurface,
              marginBottom: design.spacing.sm,
            }}
          >
            Switch section
          </Text>

          {items.map(({ key, label, hint, icon: Icon }, idx) => {
            const active = key === value;

            return (
              <React.Fragment key={key}>
                <Pressable
                  onPress={() => {
                    onChange(key);
                    setOpen(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: design.spacing.sm,
                    paddingVertical: design.spacing.sm,
                    paddingHorizontal: design.spacing.xs,
                    borderRadius: design.radii.md,
                    backgroundColor: active
                      ? colors.primaryContainer
                      : "transparent",
                  }}
                >
                  {Icon && (
                    <Icon
                      size={18}
                      color={
                        active
                          ? colors.onPrimaryContainer
                          : colors.onSurfaceVariant
                      }
                    />
                  )}

                  <View style={{ flex: 1 }}>
                    <Text
                      variant="labelMedium"
                      style={{
                        color: active
                          ? colors.onPrimaryContainer
                          : colors.onSurface,
                        fontWeight: active ? "600" : "400",
                      }}
                    >
                      {label}
                    </Text>

                    {hint && (
                      <Text
                        variant="bodySmall"
                        style={{ color: colors.onSurfaceVariant }}
                      >
                        {hint}
                      </Text>
                    )}
                  </View>
                </Pressable>

                {idx < items.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </Modal>
      </Portal>
    </View>
  );
}
