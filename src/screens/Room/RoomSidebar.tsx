import {
  Calendar,
  CheckSquare,
  FolderOpen,
  MessageCircle,
  Users,
  X,
} from "lucide-react-native";
import React, { useEffect } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const menuItems = [
  { title: "채팅", icon: MessageCircle, id: "chat" },
  { title: "일정 보기", icon: Calendar, id: "calendar" },
  { title: "할 일 관리", icon: CheckSquare, id: "todo" },
  { title: "자료함", icon: FolderOpen, id: "files" },
  { title: "팀 정보", icon: Users, id: "team" },
];

interface CustomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  onMenuSelect: (menuId: string) => void;
}

export const CustomSidebar = ({
  isOpen,
  onClose,
  activeMenu,
  onMenuSelect,
}: CustomSidebarProps) => {
  const slideAnim = React.useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <View style={styles.overlayContainer}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconBox}>
              <Users size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.projectTitle}>Teamroom</Text>
              <Text style={styles.projectSubtitle}>웹 개발 프로젝트</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose}>
            <X size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuLabel}>메뉴</Text>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  onMenuSelect(item.id);
                  onClose();
                }}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
              >
                <Icon size={18} color={isActive ? "#7C3AED" : "#374151"} />
                <Text
                  style={[styles.menuText, isActive && { color: "#7C3AED" }]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 100,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sidebar: {
    width: 280,
    backgroundColor: "#FFFFFF",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 12,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  projectSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  menuContainer: {
    paddingTop: 4,
  },
  menuLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: "#F3E8FF",
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#374151",
  },
});
