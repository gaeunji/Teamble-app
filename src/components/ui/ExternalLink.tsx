import { ExternalLink as ExternalLinkIcon } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function ExternalLink(props: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={() => {
        // Linking.openURL(props.href);
      }}
    >
      <ThemedView style={styles.iconContainer}>
        <ExternalLinkIcon size={16} color="#fff" />
      </ThemedView>
      <ThemedText style={styles.text}>{props.children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconContainer: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#0A84FF",
  },
  text: {
    color: "#0A84FF",
    fontSize: 16,
  },
});
