import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Clock, CheckCircle2, XCircle, ListFilter } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type Status = "all" | "pending" | "approved" | "cancelled";

type StatusFilterProps = {
  value: Status;
  onChange: (status: Status) => void;
  options?: Status[];
};

const STATUS_META: Record<
  Status,
  { label: string; icon?: React.ComponentType<any> }
> = {
  all: { label: "All", icon: ListFilter },
  pending: { label: "Pending", icon: Clock },
  approved: { label: "Approved", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", icon: XCircle },
};

export default function StatusFilter({
  value,
  onChange,
  options = ["all", "pending", "approved", "cancelled"],
}: StatusFilterProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: design.spacing.xs,
        marginBottom: design.spacing.sm,
      }}
    >
      {options.map((status) => {
        const active = value === status;
        const Icon = STATUS_META[status]?.icon;

        return (
          <TouchableOpacity
            key={status}
            onPress={() => onChange(status)}
            activeOpacity={0.8}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: design.spacing.xs,
                paddingHorizontal: design.spacing.sm,
                paddingVertical: design.spacing.xs,
                borderRadius: design.radii.full,
                backgroundColor: active
                  ? theme.colors.primary
                  : theme.colors.surfaceVariant,
              }}
            >
              {Icon && (
                <Icon
                  size={14}
                  color={
                    active
                      ? theme.colors.onPrimary
                      : theme.colors.onSurfaceVariant
                  }
                />
              )}
              <Text
                variant="labelSmall"
                style={{
                  color: active
                    ? theme.colors.onPrimary
                    : theme.colors.onSurfaceVariant,
                }}
              >
                {STATUS_META[status].label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
