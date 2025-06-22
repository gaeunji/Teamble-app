import { Users } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  onPress?: () => void;
}

export const ProjectCard = ({ project, onPress }: ProjectCardProps) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  return (
    <CardComponent style={styles.projectCard} onPress={onPress}>
      {project.badge != null && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{project.badge}</Text>
        </View>
      )}
      <View style={[styles.projectIcon, { backgroundColor: project.color }]}>
        <Text style={styles.iconText}>{project.category.slice(0, 3)}</Text>
      </View>
      <View style={styles.projectBody}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Users size={14} color="#9CA3AF" />
          <Text style={styles.projectMembers}>{project.members}</Text>
        </View>
        <Text style={styles.projectDesc}>{project.description}</Text>
        {(project.message || project.time) && (
          <View style={styles.messageTimeRow}>
            {project.message && (
              <Text style={styles.projectMsg}>{project.message}</Text>
            )}
            {project.time && (
              <Text style={styles.projectTime}>{project.time}</Text>
            )}
          </View>
        )}
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  projectCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#2563EB",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  projectIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    alignSelf: "center",
  },
  iconText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  projectBody: { flex: 1 },
  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  projectTitle: {
    marginRight: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  projectMembers: { marginLeft: 4, fontSize: 12, color: "#9CA3AF" },
  projectDesc: { marginBottom: 8, fontSize: 11, color: "#6B7280" },
  projectMsg: { fontSize: 12, color: "#9CA3AF", flex: 1 },
  projectTime: { fontSize: 12, color: "#9CA3AF" },
  messageTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
});
