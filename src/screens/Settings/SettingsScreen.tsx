import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import { ProfileSection } from "./components/ProfileSection";

export const SettingsScreen = () => {
  const [chatNotifications, setChatNotifications] = useState(true);
  const [scheduleNotifications, setScheduleNotifications] = useState(true);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileSection />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>알림 방식 설정</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>채팅 알림 on/off</Text>
          <Switch
            value={chatNotifications}
            onValueChange={setChatNotifications}
            trackColor={{ false: "#E9E9EA", true: "#5C39F5" }}
            thumbColor={"#FFFFFF"}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>일정 알림 on/off</Text>
          <Switch
            value={scheduleNotifications}
            onValueChange={setScheduleNotifications}
            trackColor={{ false: "#E9E9EA", true: "#5C39F5" }}
            thumbColor={"#FFFFFF"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>계정 관리</Text>
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.itemText}>비밀번호 변경</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.itemText}>연동 계정 관리</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.itemText}>계정 탈퇴</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>고객센터 / FAQ 링크</Text>
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.itemText}>피드백 보내기</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.itemText}>앱 사용 가이드</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.itemText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  section: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  itemText: {
    fontSize: 16,
    color: "#1C1C1E",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
});
