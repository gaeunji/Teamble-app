import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Header } from "../../components/Header";
import { CalendarView } from "./components/CalendarView";

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "M월 d일 (EEE)", { locale: ko });
};

export const CalendarScreen = () => {
  const router = useRouter();
  // 현재 날짜 기준으로 일정 설정
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 0부터 시작하므로 +1

  // 임시 데이터
  const schedules = [
    {
      id: "1",
      teamName: "[웹 개발 프로젝트]",
      content: "회의",
      date: `${currentYear}-${currentMonth.toString().padStart(2, "0")}-10`,
      time: "13:00",
      color: "#FFF1A3",
      notification: "10분 전",
      participants: ["김도윤", "윤하은", "이재훈"],
    },
    {
      id: "2",
      teamName: "[앱 개발 프로젝트]",
      content: "자료조사 완료",
      date: `${currentYear}-${currentMonth.toString().padStart(2, "0")}-27`,
      time: "14:00",
      color: "#ADE0FF",
      notification: "30분 전",
      participants: ["정민석", "백예린", "박시우", "김도윤", "윤하은"],
    },
    {
      id: "3",
      teamName: "팀 전체",
      content: "회의",
      date: `${currentYear}-${currentMonth.toString().padStart(2, "0")}-21`,
      time: "10:00",
      color: "#ADE0FF",
      notification: "1시간 전",
      participants: [
        "김도윤",
        "윤하은",
        "이재훈",
        "정민석",
        "백예린",
        "박시우",
      ],
    },
    {
      id: "4",
      teamName: "[웹 개발 프로젝트]",
      content: "자료조사",
      date: `${currentYear}-${currentMonth.toString().padStart(2, "0")}-10`,
      time: "13:00",
      color: "#FFF1A3",
      notification: "10분 전",
      participants: ["김도윤", "윤하은"],
    },
    {
      id: "5",
      teamName: "",
      content: "기획회의",
      date: `${currentYear}-${currentMonth.toString().padStart(2, "0")}-16`,
      time: "11:00",
      color: "#FFF1A3",
      notification: "10분 전",
      participants: ["정민석"],
    },
    {
      id: "6",
      teamName: "[서버]",
      content: "API 명세 회의",
      date: `${currentYear}-${currentMonth.toString().padStart(2, "0")}-20`,
      time: "15:00",
      color: "#ADE0FF",
      notification: "30분 전",
      participants: ["백예린"],
    },
  ];

  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));

  const handleDayPress = (date) => {
    setSelectedDate(date);
  };

  const markedDates = useMemo(() => {
    const marks = {};
    schedules.forEach((schedule) => {
      marks[schedule.date] = {
        customStyles: {
          container: {
            backgroundColor: "#FEEF82",
            borderRadius: 16,
          },
          text: {
            color: "#333",
          },
        },
      };
    });

    marks[selectedDate] = {
      ...marks[selectedDate],
      customStyles: {
        container: {
          backgroundColor: "#6E8BFF",
          borderRadius: 16,
        },
        text: {
          color: "white",
          fontWeight: "bold",
        },
      },
    };
    return marks;
  }, [schedules, selectedDate]);

  const schedulesForList = useMemo(() => {
    return schedules.sort((a, b) => {
      const dateComparison =
        new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return (a.time || "").localeCompare(b.time || "");
    });
  }, [schedules]);

  const groupedSchedules = useMemo(() => {
    // 날짜별로 그룹핑
    const group = {};
    schedulesForList.forEach((schedule) => {
      const date = formatDate(schedule.date);
      if (!group[date]) group[date] = [];
      group[date].push(schedule);
    });
    return Object.keys(group).map((date) => ({
      title: date,
      data: group[date],
    }));
  }, [schedulesForList]);

  const renderListHeader = () => (
    <>
      <CalendarView onDayPress={handleDayPress} markedDates={markedDates} />
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>등록된 일정</Text>
      </View>
    </>
  );

  const handleItemPress = (item) => {
    router.push({
      pathname: "/schedule-detail",
      params: {
        teamName: item.teamName || "",
        content: item.content,
        date: formatDate(item.date),
        time: item.time,
        notification: item.notification,
        participants: JSON.stringify(item.participants),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <SectionList
        sections={groupedSchedules}
        style={styles.container}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.scheduleItem}>
              <View
                style={[styles.indicator, { backgroundColor: item.color }]}
              />
              <View style={styles.content}>
                <Text style={styles.title}>
                  {item.teamName ? `${item.teamName} ` : ""}
                  {item.content}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>등록된 일정이 없습니다.</Text>
            <Text style={styles.emptySubText}>새로운 일정을 추가해보세요!</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },
  listHeader: {
    paddingVertical: 20,
    backgroundColor: "#F8F8F8",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "white",
    paddingHorizontal: 15,
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
    backgroundColor: "white",
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
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
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
    marginLeft: 30,
  },
});
