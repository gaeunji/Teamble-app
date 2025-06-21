import { User } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { ProjectCard } from "../../components/ProjectCard";

type Project = {
  id: string;
  category: string;
  title: string;
  members: number;
  description: string;
  message?: string;
  badge?: number;
  time?: string;
  color: string;
};

const recentProjects: Project[] = [
  {
    id: "1",
    category: "웹개발",
    title: "웹개발 프로젝트",
    members: 8,
    description: "React + Node.js 쇼핑몰 개발",
    message: "내일까지 각자 담당 부분 완료해주세요!",
    time: "오후 12:30",
    color: "#3B82F6",
  },
  {
    id: "2",
    category: "모바일",
    title: "모바일 앱 기획",
    members: 5,
    description: "Flutter 기반 배달앱 기획",
    message: "내일 회의 시간 조정 가능하신가요?",
    badge: 2,
    time: "오후 16:30",
    color: "#FACC15",
  },
  {
    id: "3",
    category: "세계와 시민",
    title: "세계와 시민",
    members: 4,
    description: "장애인 이동권",
    message: "자료조사 결과 공유 드립니다.",
    badge: 1,
    time: "오전 11:30",
    color: "#22C55E",
  },
];

export const HomeScreen = () => {
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Welcome Area */}
        <View style={styles.welcomeArea}>
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeHello}>
              <Text style={styles.helloHighlight}>안녕하세요 </Text>
              박시우님,
            </Text>
            <Text style={styles.welcomeSub}>
              오늘도 팀플을 성공적으로 같이해조 :)
            </Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: "#5C39F5" }]}>
                <User size={24} color="#fff" />
              </View>
              <Text style={[styles.statNum, { color: "#5C39F5" }]}>3</Text>
              <Text style={styles.statLabel}>참여중인 프로젝트</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: "#6B7280" }]}>
                <User size={24} color="#fff" />
              </View>
              <Text style={[styles.statNum, { color: "#4B5563" }]}>1</Text>
              <Text style={[styles.statLabel, { color: "#4B5563" }]}>
                완료한 프로젝트
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Projects */}
        <View style={styles.projects}>
          <Text style={styles.sectionTitle}>최근 방문한 프로젝트</Text>

          {recentProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },

  /* Welcome Area */
  welcomeArea: { marginBottom: 24 },
  welcomeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  welcomeHello: { color: "#00000", fontSize: 16, fontWeight: "600" },
  welcomeSub: { color: "#6B7280", fontSize: 12, marginTop: 4 },
  helloHighlight: { color: "#5C39F5", fontSize: 16, fontWeight: "600" },

  statsGrid: { flexDirection: "row", justifyContent: "space-between" },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    padding: 20,
    marginHorizontal: 10,
    elevation: 1,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statNum: { fontSize: 24, fontWeight: "700" },
  statLabel: { fontSize: 12, color: "#374151", marginTop: 4 },

  /* Recent Projects */
  projects: { marginBottom: 24, marginTop: 30 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 16 },
});
