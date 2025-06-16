import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export function Collapsible(props: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setIsOpen(!isOpen)}>
        <ThemedText style={styles.title}>{props.title}</ThemedText>
        <ChevronDown
          size={20}
          color="#666"
          style={[styles.chevron, isOpen && styles.chevronRotated]}
        />
      </Pressable>
      {isOpen && <View style={styles.content}>{props.children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  chevron: {
    transform: [{ rotate: "0deg" }],
  },
  chevronRotated: {
    transform: [{ rotate: "180deg" }],
  },
  content: {
    padding: 16,
  },
});
