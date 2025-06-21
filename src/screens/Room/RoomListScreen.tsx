import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Header } from "../../components/Header";
import { ProjectCard } from "../../components/ProjectCard";
import type { RoomStackParamList } from "../../navigation/AppNavigator";

// HomeScreen의 recentProjects와 동일한 데이터
const projects = [
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

export const RoomListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RoomStackParamList>>();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <Header title="채팅" />
      <View style={styles.content}>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectCard project={item} onPress={() => {}} />
          )}
          style={styles.list}
          contentContainerStyle={styles.listContent}
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
