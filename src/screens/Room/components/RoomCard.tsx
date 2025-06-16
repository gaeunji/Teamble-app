import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatTime } from "../../../utils/date";

interface Room {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
}

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{room.name}</Text>
        <Text style={styles.timestamp}>{formatTime(room.timestamp)}</Text>
      </View>
      <Text style={styles.message} numberOfLines={1}>
        {room.lastMessage}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  message: {
    fontSize: 14,
    color: "#666",
  },
});
