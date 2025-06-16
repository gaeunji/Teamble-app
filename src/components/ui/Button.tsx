import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export function Button(props: {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  const {
    onPress,
    title,
    variant = "primary",
    size = "medium",
    disabled = false,
    leftIcon,
    rightIcon,
  } = props;

  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <Pressable style={buttonStyles} onPress={onPress} disabled={disabled}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <ThemedText style={textStyles}>{title}</ThemedText>
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: "#0A84FF",
  },
  secondaryButton: {
    backgroundColor: "#E5E5EA",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#0A84FF",
  },
  smallButton: {
    height: 32,
    paddingHorizontal: 12,
  },
  mediumButton: {
    height: 44,
  },
  largeButton: {
    height: 56,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#000000",
  },
  outlineText: {
    color: "#0A84FF",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
