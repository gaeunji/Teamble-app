import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

interface Schedule {
  id: string;
  title: string;
  date: string; // "yyyy-MM-dd"
  time: string; // "HH:mm"
  color: string;
}

interface ScheduleListProps {
  schedules: Schedule[];
}

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "M월 d일 (EEE)", { locale: ko });
};

export const ScheduleList = ({ schedules }: ScheduleListProps) => {
  const groupedSchedules = schedules.reduce((acc, schedule) => {
    const date = formatDate(schedule.date);
    const existingGroup = acc.find((group) => group.title === date);
    if (existingGroup) {
      existingGroup.data.push(schedule);
    } else {
      acc.push({ title: date, data: [schedule] });
    }
    return acc;
  }, []);

  if (schedules.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>등록된 일정이 없습니다.</Text>
        <Text style={styles.emptySubText}>
          새로운 일정을 추가해보세요!
        </Text>
      </View>
    );
  }

  return (
    <SectionList
      sections={groupedSchedules}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.scheduleItem}>
          <View style={[styles.indicator, { backgroundColor: item.color }]} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  indicator: {
    width: 10,
    height: "100%",
    marginRight: 15,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    color: "#1C1C1E",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  sectionHeader: {
    paddingVertical: 10,
    backgroundColor: "white",
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 25,
  },
});
