import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const ProfileSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../../assets/icons/profile.png")}
          style={styles.avatar}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.universityText}>경희대학교</Text>
        <Text style={styles.collegeText}>전자정보대학</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.majorText}>전자공학과</Text>
          <Text style={styles.nameText}>박시우</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 8,
    borderBottomColor: "#F5F5F5",
  },
  avatarContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#E6E0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 24,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  infoContainer: {
    flex: 1,
  },
  universityText: {
    fontSize: 15,
    color: "#333",
  },
  collegeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 2,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 2,
  },
  majorText: {
    fontSize: 15,
    color: "#333",
    marginRight: 8,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
