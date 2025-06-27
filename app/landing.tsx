import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button } from "../src/components/ui/Button";
import { ThemedText } from "../src/components/ui/ThemedText";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/header-logo.png")} style={styles.logo} />
      <ThemedText type="title" style={styles.title}>같이해조</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}><ThemedText style={{ color: '#5C39F5', fontWeight: 'bold' }}></ThemedText>팀플이 쉬워지는 협업 플랫폼</ThemedText>
      <View style={styles.buttonGroup}>
        <Button title="로그인" onPress={() => router.push("/login")} size="large" />
        <Button title="회원가입" variant="outline" onPress={() => router.push("/register")} size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 32 },
  logo: { width: 140, height: 140, marginBottom: 32 },
  title: { marginBottom: 8 },
  subtitle: { color: "#6B7280", marginBottom: 40, textAlign: "center" },
  buttonGroup: { width: "100%", gap: 16, marginTop: 8 },
}); 