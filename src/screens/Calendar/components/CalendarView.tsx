import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const CalendarView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.month}>2024년 3월</Text>
      <View style={styles.calendar}>
        {/* 여기에 실제 캘린더 구현 */}
        <Text>캘린더 구현 예정</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  month: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  calendar: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
