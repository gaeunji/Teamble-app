import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Input } from "../src/components/ui/Input";
import { Button } from "../src/components/ui/Button";
import { ThemedText } from "../src/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { useAuth } from "../src/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }
    // 실제 인증 로직 필요
    login();
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/header-logo.png")} style={styles.logo} />
      <ThemedText type="title" style={[styles.title, { color: '#5C39F5' }]}>로그인</ThemedText>
      <View style={styles.card}>
        <Input label="이메일" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Input label="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        <Button title="로그인" onPress={handleLogin} size="large" />
      </View>
      <TouchableOpacity onPress={() => router.push("/register")}>
        <ThemedText type="link" style={[styles.link, { color: '#5C39F5' }]}>아직 회원이 아니신가요? <ThemedText style={{ fontWeight: 'bold', color: '#5C39F5' }}>회원가입</ThemedText></ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 24 },
  logo: { width: 80, height: 80, marginBottom: 16 },
  title: { marginBottom: 16 },
  card: { width: "100%", maxWidth: 400, backgroundColor: "#fff", borderRadius: 16, padding: 24, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, elevation: 2, marginBottom: 16 },
  error: { color: "#FF3B30", marginBottom: 12, textAlign: "center" },
  link: { marginTop: 8, textAlign: "center" },
}); 