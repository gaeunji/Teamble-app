import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MoreVertical, Users } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChatInput } from "../../components/ChatInput";
import { ChatMessage } from "../../components/ChatMessage";
import { ChatMessage as ChatMessageType } from "../../types/chat";

// 샘플 메시지 데이터
const sampleMessages: ChatMessageType[] = [
  {
    id: "1",
    senderId: "user1",
    senderName: "김철수",
    content: "안녕하세요! 프로젝트 진행상황 공유드립니다.",
    timestamp: new Date(Date.now() - 3600000), // 1시간 전
    type: "text",
  },
  {
    id: "2",
    senderId: "user2",
    senderName: "이영희",
    content: "네, 확인했습니다. 프론트엔드 부분은 거의 완료되었어요.",
    timestamp: new Date(Date.now() - 3000000), // 50분 전
    type: "text",
  },
  {
    id: "3",
    senderId: "user3",
    senderName: "박민수",
    content: "백엔드 API 개발도 진행 중입니다. 이번 주까지 완료 예정이에요.",
    timestamp: new Date(Date.now() - 2400000), // 40분 전
    type: "text",
  },
  {
    id: "4",
    senderId: "currentUser",
    senderName: "나",
    content: "좋습니다! 내일까지 각자 담당 부분 완료해주세요!",
    timestamp: new Date(Date.now() - 1800000), // 30분 전
    type: "text",
  },
  {
    id: "5",
    senderId: "user1",
    senderName: "김철수",
    content: "네, 알겠습니다!",
    timestamp: new Date(Date.now() - 1200000), // 20분 전
    type: "text",
  },
  {
    id: "6",
    senderId: "user2",
    senderName: "이영희",
    content: "확인했습니다 👍",
    timestamp: new Date(Date.now() - 600000), // 10분 전
    type: "text",
  },
];

// 프로젝트 데이터 (채팅방 정보로 사용)
const projects = [
  {
    id: "1",
    category: "웹개발",
    title: "웹개발 프로젝트",
    members: 8,
    description: "React + Node.js 쇼핑몰 개발",
    color: "#3B82F6",
  },
  {
    id: "2",
    category: "모바일",
    title: "모바일 앱 기획",
    members: 5,
    description: "Flutter 기반 배달앱 기획",
    color: "#FACC15",
  },
  {
    id: "3",
    category: "세계와 시민",
    title: "세계와 시민",
    members: 4,
    description: "장애인 이동권",
    color: "#22C55E",
  },
  {
    id: "4",
    category: "AI/ML",
    title: "AI 프로젝트",
    members: 6,
    description: "머신러닝 모델 개발",
    color: "#8B5CF6",
  },
  {
    id: "5",
    category: "게임",
    title: "게임 개발팀",
    members: 7,
    description: "Unity 3D 게임 개발",
    color: "#EC4899",
  },
];

export const RoomScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>(sampleMessages);

  // ID에 해당하는 프로젝트 찾기
  const chatRoom = projects.find((p) => p.id === id);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      senderId: "currentUser",
      senderName: "나",
      content,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);

    // 메시지 전송 후 스크롤을 맨 아래로
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleMorePress = () => {
    // 채팅방 설정 또는 메뉴 옵션
    console.log("More options pressed");
  };

  if (!chatRoom) {
    return (
      <View style={styles.container}>
        <Text>채팅방을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <View
            style={[styles.chatRoomIcon, { backgroundColor: chatRoom.color }]}
          >
            <Text style={styles.iconText}>{chatRoom.category.slice(0, 3)}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.chatRoomTitle}>{chatRoom.title}</Text>
            <View style={styles.memberInfo}>
              <Users size={12} color="#9CA3AF" />
              <Text style={styles.memberCount}>{chatRoom.members}명</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleMorePress} style={styles.moreButton}>
          <MoreVertical size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* 메시지 목록 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage
            message={item}
            isOwnMessage={item.senderId === "currentUser"}
          />
        )}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: false })
        }
      />

      {/* 메시지 입력 */}
      <ChatInput onSendMessage={handleSendMessage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  chatRoomIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  headerText: {
    flex: 1,
  },
  chatRoomTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberCount: {
    fontSize: 12,
    color: "#9CA3AF",
    marginLeft: 4,
  },
  moreButton: {
    padding: 4,
  },
  messageList: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  messageListContent: {
    paddingVertical: 16,
  },
});
