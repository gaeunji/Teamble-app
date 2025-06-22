import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Header } from "../../components/Header";
import { ProjectCard } from "../../components/ProjectCard";
import { Project } from "../../types/project";

// 프로젝트 데이터 (채팅방으로 사용)
const projects: Project[] = [
  {
    id: "1",
    category: "웹개발",
    title: "웹개발 프로젝트",
    members: 8,
    description: "React + Node.js 쇼핑몰 개발",
    message: "내일까지 각자 담당 부분 완료해주세요!",
    time: "오후 12:30",
    badge: 3,
    color: "#3B82F6",
  },
  {
    id: "2",
    category: "모바일",
    title: "모바일 앱 기획",
    members: 5,
    description: "Flutter 기반 배달앱 기획",
    message: "내일 회의 시간 조정 가능하신가요?",
    time: "오후 16:30",
    badge: 2,
    color: "#FACC15",
  },
  {
    id: "3",
    category: "세계와 시민",
    title: "세계와 시민",
    members: 4,
    description: "장애인 이동권",
    message: "자료조사 결과 공유 드립니다.",
    time: "오전 11:30",
    badge: 1,
    color: "#22C55E",
  },
  {
    id: "4",
    category: "AI/ML",
    title: "AI 프로젝트",
    members: 6,
    description: "머신러닝 모델 개발",
    message: "데이터 전처리 완료했습니다.",
    time: "어제",
    color: "#8B5CF6",
  },
  {
    id: "5",
    category: "게임",
    title: "게임 개발팀",
    members: 7,
    description: "Unity 3D 게임 개발",
    message: "버그 수정 완료했습니다.",
    time: "3일 전",
    color: "#EC4899",
  },
];

export const RoomListScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="채팅" />
      <View style={styles.content}>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectCard
              project={item}
              onPress={() => router.push(`/room/${item.id}` as any)}
            />
          )}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});
