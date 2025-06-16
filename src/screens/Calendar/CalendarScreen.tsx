import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CalendarView } from "./components/CalendarView";
import { ScheduleList } from "./components/ScheduleList";

export const CalendarScreen = () => {
  // 임시 데이터
  const schedules = [
    {
      id: "1",
      title: "팀 미팅",
      date: new Date(),
      location: "회의실 A",
    },
    {
      id: "2",
      title: "프로젝트 발표",
      date: new Date(),
      location: "온라인",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>일정</Text>
      <CalendarView />
      <ScheduleList schedules={schedules} />
    </View>
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
});
