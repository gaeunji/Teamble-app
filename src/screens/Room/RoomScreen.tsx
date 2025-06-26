import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Menu, Plus, Send, Users } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ChatMessage as ChatMessageType } from "../../types/chat";
import { RequestMessageModal } from "./modals/RequestMessageModal";
import { CustomSidebar } from "./RoomSidebar";

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

const sampleMessages: ChatMessageType[] = [
  {
    id: "1",
    senderId: "김민수",
    senderName: "김민수",
    content:
      "안녕하세요! 새 프로젝트 관련해서 회의 시간을 정해야 할 것 같아요.",
    timestamp: new Date(),
    type: "text",
  },
  {
    id: "2",
    senderId: "이지은",
    senderName: "이지은",
    content: "좋습니다! 내일 오후 2시는 어떠세요?",
    timestamp: new Date(),
    type: "text",
  },
  {
    id: "3",
    senderId: "나",
    senderName: "나",
    content: "네, 괜찮습니다! 스터디룸 예약할게요.",
    timestamp: new Date(),
    type: "text",
  },
  {
    id: "4",
    senderId: "박준혁",
    senderName: "박준혁",
    content: "디자인 초안도 준비해서 가져갈게요. 피드백 받고 싶어요.",
    timestamp: new Date(),
    type: "text",
  },
];

export const RoomScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<any[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [requestMessages, setRequestMessages] = useState<any[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState("chat");

  // ID에 해당하는 프로젝트 찾기
  const chatRoom = projects.find((p) => p.id === id);

  // 임시 멤버 데이터 (실제 데이터로 교체 가능)
  const members = [
    { id: "1", name: "김민수" },
    { id: "2", name: "이지은" },
    { id: "3", name: "박준혁" },
    { id: "4", name: "나" },
  ].filter((m) => m.name !== "나");

  // 요청 메시지 핸들러
  const handleRequestSubmit = (request: any) => {
    // 요청 메시지도 일반 메시지와 동일하게 messages에 추가
    setMessages((prev) => [...prev, { ...request, type: "request" }]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const message: ChatMessageType = {
      id: Date.now().toString(),
      senderId: "나",
      senderName: "나",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    };
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, requestMessages]);

  const handleBackPress = () => {
    router.back();
  };

  const handleMorePress = () => {
    setSidebarVisible(true);
  };

  // 요청 메시지 무시
  const handleIgnoreRequest = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  // 요청 메시지 응답
  const handleRespondRequest = (item: any) => {
    Alert.alert("응답", `요청에 응답합니다. (id: ${item.id})`);
    // 실제 응답 로직은 여기에 구현
  };

  if (!chatRoom) {
    return (
      <View style={styles.container}>
        <Text>채팅방을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const renderMessage = ({ item }: { item: any }) => {
    if (item.type === "request") {
      // 요청 메시지 UI (채팅방 스타일에 맞게 심플하게)
      return (
        <View style={styles.requestContainerSimple}>
          <Text style={styles.requestTypeSimple}>🔔 자동 요청 메시지</Text>
          <Text style={styles.requestContentSimple}>{item.content}</Text>
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            {item.deadline && (
              <Text style={styles.requestMetaSimple}>
                마감일: {new Date(item.deadline).toLocaleDateString()}
              </Text>
            )}
            <Text style={styles.requestMetaSimple}>
              {item.deadline ? "  |  " : ""}대상:{" "}
              {item.targetUserIds?.length
                ? item.targetUserIds.length + "명"
                : "전체"}
            </Text>
          </View>
          <View style={styles.requestButtonRow}>
            <TouchableOpacity
              style={styles.requestIgnoreButton}
              onPress={() => handleIgnoreRequest(item.id)}
            >
              <Text style={styles.requestIgnoreButtonText}>무시</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.requestRespondButton}
              onPress={() => handleRespondRequest(item)}
            >
              <Text style={styles.requestRespondButtonText}>응답</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    // 일반 메시지
    const isMe = item.senderId === "나" || item.senderName === "나";
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.rightAlign : styles.leftAlign,
        ]}
      >
        <View style={styles.bubbleContainer}>
          {!isMe && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/1.jpg",
                }}
                style={styles.avatarImage}
              />
              <Text style={styles.userName}>{item.senderName}</Text>
            </View>
          )}
          <View
            style={[
              styles.messageBubble,
              isMe ? styles.myBubble : styles.otherBubble,
            ]}
          >
            <Text style={[styles.messageText, isMe && { color: "#FFF" }]}>
              {item.content}
            </Text>
          </View>
          <Text style={styles.timestamp}>오전 10:00</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={{ padding: 4 }}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View
              style={[styles.chatRoomIcon, { backgroundColor: chatRoom.color }]}
            >
              <Text style={styles.iconText}>
                {chatRoom.category.slice(0, 3)}
              </Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.chatRoomTitle}>{chatRoom.title}</Text>
              <View style={styles.memberInfo}>
                <Users size={12} color="#9CA3AF" />
                <Text style={styles.memberCount}>{chatRoom.members}명</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleMorePress} style={{ padding: 4 }}>
            <Menu size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
        {/* 메시지 목록 */}
        <FlatList
          ref={flatListRef}
          data={[...messages].sort((a, b) => {
            const aTime = a.timestamp
              ? new Date(a.timestamp).getTime()
              : a.sentAt
              ? new Date(a.sentAt).getTime()
              : new Date(0).getTime();
            const bTime = b.timestamp
              ? new Date(b.timestamp).getTime()
              : b.sentAt
              ? new Date(b.sentAt).getTime()
              : new Date(0).getTime();
            return aTime - bTime;
          })}
          keyExtractor={(item) =>
            item.id?.toString?.() ?? Math.random().toString()
          }
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
        />
        {/* 메시지 입력 */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => setRequestModalVisible(true)}
          >
            <Plus size={20} color="#FFF" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder={`#${chatRoom.title}에 메시지 보내기`}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        {/* 요청 메시지 모달 */}
        <RequestMessageModal
          visible={requestModalVisible}
          onClose={() => setRequestModalVisible(false)}
          onSubmit={handleRequestSubmit}
          members={members}
        />
        {/* 사이드바 */}
        <CustomSidebar
          isOpen={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
          activeMenu={activeMenu}
          onMenuSelect={setActiveMenu}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
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
  messageList: { padding: 16, flexGrow: 1 },
  messageContainer: { flexDirection: "row", marginBottom: 16 },
  leftAlign: { justifyContent: "flex-start" },
  rightAlign: { justifyContent: "flex-end" },
  avatar: { fontSize: 24, marginHorizontal: 8 },
  bubbleContainer: { maxWidth: "80%" },
  userName: { fontSize: 12, fontWeight: "600", color: "#374151" },
  messageBubble: { borderRadius: 16, padding: 12, marginTop: 4 },
  myBubble: { backgroundColor: "#7C3AED" },
  otherBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  messageText: { fontSize: 14, color: "#111827" },
  timestamp: { fontSize: 10, color: "#9CA3AF", marginTop: 2 },
  reactionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 6,
  },
  reactionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#EDE9FE",
    borderRadius: 16,
    marginRight: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#7C3AED",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  requestContainerSimple: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  requestTypeSimple: {
    color: "#7C3AED",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 2,
  },
  requestContentSimple: {
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 2,
  },
  requestMetaSimple: {
    fontSize: 12,
    color: "#9CA3AF",
    marginRight: 4,
  },
  requestButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 8,
  },
  requestIgnoreButton: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 4,
  },
  requestIgnoreButtonText: {
    color: "#6B7280",
    fontWeight: "400",
    fontSize: 13,
  },
  requestRespondButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  requestRespondButtonText: {
    color: "#FFF",
    fontWeight: "400",
    fontSize: 13,
  },
});
