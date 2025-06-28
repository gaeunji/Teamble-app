import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../src/components/ui/Button";
import { Input } from "../src/components/ui/Input";
import { ThemedText } from "../src/components/ui/ThemedText";
import { useAuth } from "../src/context/AuthContext";

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError("모든 항목을 입력하세요.");
      return;
    }
    // 실제 회원가입 로직 필요
    // 회원가입 후 바로 로그인 처리
    // AuthGate가 자동으로 (tabs)로 네비게이션 처리
    login();
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {imageLoading && (
          <ActivityIndicator
            size="large"
            color="#5C39F5"
            style={styles.loader}
          />
        )}
        {!imageError ? (
          <Image
            source={require("../assets/images/header-logo.png")}
            style={styles.logo}
            onLoad={handleImageLoad}
            onError={handleImageError}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.fallbackLogo}>
            <ThemedText type="title" style={styles.fallbackText}>
              Teamble
            </ThemedText>
          </View>
        )}
      </View>
      <ThemedText type="title" style={[styles.title, { color: "#5C39F5" }]}>
        회원가입
      </ThemedText>
      <View style={styles.card}>
        <Input label="이름" value={name} onChangeText={setName} />
        <Input
          label="이메일"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          label="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        <Button title="회원가입" onPress={handleRegister} size="large" />
      </View>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <ThemedText type="link" style={[styles.link, { color: "#5C39F5" }]}>
          이미 계정이 있으신가요?{" "}
          <ThemedText style={{ fontWeight: "bold", color: "#5C39F5" }}>
            로그인
          </ThemedText>
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
  loader: {
    position: "absolute",
  },
  fallbackLogo: {
    width: 80,
    height: 80,
    backgroundColor: "#5C39F5",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: { marginBottom: 16 },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },
  error: { color: "#FF3B30", marginBottom: 12, textAlign: "center" },
  link: { marginTop: 8, textAlign: "center" },
});
