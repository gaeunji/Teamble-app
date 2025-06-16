import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  onPress,
  title,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  const getButtonStyle = () => {
    const baseStyle = styles.button;
    const variantStyle = styles[variant];
    const sizeStyle = styles[size];
    const disabledStyle = disabled ? styles.disabled : {};

    return [baseStyle, variantStyle, sizeStyle, disabledStyle, style];
  };

  const getTextStyle = () => {
    const baseStyle = styles.text;
    const variantTextStyle = styles[`${variant}Text`];
    const sizeTextStyle = styles[`${size}Text`];
    const disabledTextStyle = disabled ? styles.disabledText : {};

    return [
      baseStyle,
      variantTextStyle,
      sizeTextStyle,
      disabledTextStyle,
      textStyle,
    ];
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyle()}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#007AFF" : "white"}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#5856D6",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  primaryText: {
    color: "white",
  },
  secondaryText: {
    color: "white",
  },
  outlineText: {
    color: "#007AFF",
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
    color: "#999",
  },
});
