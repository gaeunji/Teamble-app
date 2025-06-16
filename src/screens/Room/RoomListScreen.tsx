import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Header } from "../../components/Header";
import { RoomCard } from "./components/RoomCard";

export const RoomListScreen = () => {
  // 임시 데이터
  const rooms = [
    {
      id: "1",
      name: "프로젝트 A",
      lastMessage: "안녕하세요!",
      timestamp: new Date(),
    },
    {
      id: "2",
      name: "프로젝트 B",
      lastMessage: "회의 시간 확인해주세요",
      timestamp: new Date(),
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="채팅" />
      <View style={styles.content}>
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RoomCard room={item} />}
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
