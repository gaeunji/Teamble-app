import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Input } from "../src/components/ui/Input";
import { Button } from "../src/components/ui/Button";
import { ThemedText } from "../src/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { useAuth } from "../src/context/AuthContext";

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError("모든 항목을 입력하세요.");
      return;
    }
    // 실제 회원가입 로직 필요
    login(); // 회원가입 후 바로 로그인 처리
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/header-logo.png")} style={styles.logo} />
      <ThemedText type="title" style={[styles.title, { color: '#5C39F5' }]}>회원가입</ThemedText>
      <View style={styles.card}>
        <Input label="이름" value={name} onChangeText={setName} />
        <Input label="이메일" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Input label="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        <Button title="회원가입" onPress={handleRegister} size="large" />
      </View>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <ThemedText type="link" style={[styles.link, { color: '#5C39F5' }]}>이미 계정이 있으신가요? <ThemedText style={{ fontWeight: 'bold', color: '#5C39F5' }}>로그인</ThemedText></ThemedText>
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