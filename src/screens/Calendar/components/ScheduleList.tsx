import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { formatTime } from "../../../utils/date";

interface Schedule {
  id: string;
  title: string;
  date: Date;
  location: string;
}

interface ScheduleListProps {
  schedules: Schedule[];
}

export const ScheduleList = ({ schedules }: ScheduleListProps) => {
  return (
    <FlatList
      data={schedules}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.scheduleItem}>
          <Text style={styles.time}>{formatTime(item.date)}</Text>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  scheduleItem: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: "#666",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
});
