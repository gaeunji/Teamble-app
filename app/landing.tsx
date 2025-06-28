import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Button } from "../src/components/ui/Button";
import { ThemedText } from "../src/components/ui/ThemedText";

export default function Landing() {
  const router = useRouter();
  const [imageError, setImageError] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);

  React.useEffect(() => {
    console.log("🚀 Landing page rendered successfully");
  }, []);

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

      <ThemedText type="subtitle" style={styles.subtitle}>
        팀플이 쉬워지는 협업 플랫폼
      </ThemedText>
      <View style={styles.buttonGroup}>
        <Button
          title="로그인"
          onPress={() => router.push("/login")}
          size="large"
        />
        <Button
          title="회원가입"
          variant="outline"
          onPress={() => router.push("/register")}
          size="large"
        />
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
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 150,
    height: 150,
  },
  loader: {
    position: "absolute",
  },
  fallbackLogo: {
    width: 100,
    height: 100,
    backgroundColor: "#5C39F5",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: { marginBottom: 8 },
  subtitle: {
    color: "#6B7280",
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonGroup: {
    width: "100%",
    gap: 16,
    marginTop: 8,
  },
});
