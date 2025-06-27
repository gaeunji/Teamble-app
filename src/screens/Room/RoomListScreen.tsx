import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Header } from "../../components/Header";
import { ProjectCard } from "../../components/ProjectCard";
import { useProjects } from "../../context/ProjectContext";

export const RoomListScreen = () => {
  const router = useRouter();
  const { projects } = useProjects();

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
