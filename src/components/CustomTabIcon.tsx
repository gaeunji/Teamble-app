import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface CustomTabIconProps {
  name: string;
  focused: boolean;
  color: string;
  size: number;
  customIcon?: React.ReactNode; // 커스텀 SVG나 이미지용
}

export const CustomTabIcon: React.FC<CustomTabIconProps> = ({
  name,
  focused,
  color,
  size,
  customIcon,
}) => {
  return (
    <View style={styles.container}>
      {customIcon ? (
        customIcon
      ) : (
        <Ionicons name={name as any} size={size} color={color} />
      )}
      {/* {focused && (
        <View style={[styles.indicator, { backgroundColor: color }]} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  indicator: {
    position: "absolute",
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
