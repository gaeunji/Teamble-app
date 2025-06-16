import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>다크 모드</Text>
      <Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
  },
});
