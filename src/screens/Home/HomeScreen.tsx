import { User } from "lucide-react-native";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../../components/Header";
import { ProjectCard } from "../../components/ProjectCard";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useProjects } from "../../context/ProjectContext";

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
  const { projects, addProject } = useProjects();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    members: "",
    description: "",
  });
  const [error, setError] = React.useState("");

  const handleCreateProject = () => {
    if (!form.title || !form.members || !form.description) {
      setError("모든 항목을 입력하세요.");
      return;
    }
    addProject({
      id: Date.now().toString(),
      category: form.title,
      title: form.title,
      members: Number(form.members),
      description: form.description,
      color: "#5C39F5",
      message: "새로 생성된 프로젝트입니다!",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setForm({ title: "", members: "", description: "" });
    setError("");
    setModalVisible(false);
  };

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

        {/* 최근 방문한 프로젝트 + 프로젝트 생성 버튼 */}
        <View style={styles.projects}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={styles.sectionTitle}>최근 방문한 프로젝트</Text>
            <Button
              title="프로젝트 생성"
              size="small"
              onPress={() => setModalVisible(true)}
            />
          </View>
          {recentProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </View>
      </ScrollView>

      {/* 프로젝트 생성 모달 */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modal}>
            <Text style={modalStyles.modalTitle}>프로젝트 생성</Text>
            <Input
              label="프로젝트명"
              value={form.title}
              onChangeText={(v) => setForm((f) => ({ ...f, title: v }))}
            />
            <Input
              label="인원수"
              value={form.members}
              onChangeText={(v) =>
                setForm((f) => ({ ...f, members: v.replace(/[^0-9]/g, "") }))
              }
              keyboardType="numeric"
            />
            <Input
              label="설명"
              value={form.description}
              onChangeText={(v) => setForm((f) => ({ ...f, description: v }))}
            />
            {error ? (
              <Text style={{ color: "#FF3B30", marginBottom: 8 }}>{error}</Text>
            ) : null}
            <Button
              title="생성하기"
              onPress={handleCreateProject}
              size="large"
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 12 }}
            >
              <Text style={{ color: "#5C39F5", textAlign: "center" }}>
                닫기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C39F5",
    marginBottom: 16,
    textAlign: "center",
  },
});
