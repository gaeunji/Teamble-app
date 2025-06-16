import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProfileSection } from "./components/ProfileSection";
import { ThemeToggle } from "./components/ThemeToggle";

export const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>설정</Text>
      <ProfileSection />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>앱 설정</Text>
        <ThemeToggle />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
  },
});
