import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function ScheduleDetailScreen() {
  const { teamName, content, date, time, notification, participants } =
    useLocalSearchParams();

  console.log("📋 Schedule Detail Screen - Received params:", {
    teamName,
    content,
    date,
    time,
    notification,
    participants,
  });

  const participantList = participants
    ? JSON.parse(participants as string)
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitle: "일정 상세보기",
        }}
      />
      <View style={styles.container}>
        <View style={styles.content}>
          <InfoRow label="팀플명" value={teamName || "전체"} />
          <InfoRow label="날짜" value={date} />
          <InfoRow label="시간" value={time} />
          <InfoRow label="내용" value={content} />
          <InfoRow label="알림설정" value={notification} />

          <View style={styles.participantSection}>
            <Text style={styles.label}>참여자</Text>
            <View style={styles.participantList}>
              {participantList.map((name, index) => (
                <View key={index} style={styles.participantTag}>
                  <Feather name="user" size={14} color="#5C39F5" />
                  <Text style={styles.participantName}>{name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.primaryButton]}>
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              팀플룸 이동
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              수정
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              삭제
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    width: 80,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: "#555",
  },
  participantSection: {
    flexDirection: "row",
  },
  participantList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  participantTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0ECFF",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  participantName: {
    marginLeft: 6,
    fontSize: 14,
    color: "#5C39F5",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#5C39F5",
    flex: 2,
  },
  secondaryButton: {
    backgroundColor: "#E9E9EA",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryButtonText: {
    color: "white",
  },
  secondaryButtonText: {
    color: "#555",
  },
});
