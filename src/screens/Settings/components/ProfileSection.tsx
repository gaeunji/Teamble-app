import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ProfileSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>사용자 이름</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>프로필 수정</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 16,
    color: "#333",
  },
});
