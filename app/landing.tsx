import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Landing() {
  const router = useRouter();

  React.useEffect(() => {
    console.log("🚀 Landing page mounted");
  }, []);

  const handleLoginPress = () => {
    console.log("🔐 Landing: Login button pressed");
    router.push("/login");
  };

  const handleRegisterPress = () => {
    console.log("📝 Landing: Register button pressed");
    router.push("/register");
  };

  console.log("🏠 Landing: Rendering");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>같이해조</Text>
      <Text style={styles.subtitle}>팀플이 쉬워지는 협업 플랫폼</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={handleRegisterPress}
        >
          <Text style={styles.outlineButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5C39F5",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    gap: 16,
  },
  button: {
    backgroundColor: "#5C39F5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  outlineButton: {
    backgroundColor: "transparent",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5C39F5",
  },
  outlineButtonText: {
    color: "#5C39F5",
    fontSize: 16,
    fontWeight: "600",
  },
});
