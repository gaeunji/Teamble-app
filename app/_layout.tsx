import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, useColorScheme, View } from "react-native";
import "react-native-reanimated";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ProjectProvider } from "../src/context/ProjectContext";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isNavigating, setIsNavigating] = React.useState(false);

  const navigateToTabs = React.useCallback(() => {
    if (isNavigating) return;
    console.log("🔄 AuthGate: Navigating to tabs");
    setIsNavigating(true);
    router.replace("/(tabs)");
  }, [router, isNavigating]);

  const navigateToLanding = React.useCallback(() => {
    if (isNavigating) return;
    console.log("🔄 AuthGate: Navigating to landing");
    setIsNavigating(true);
    router.replace("/landing");
  }, [router, isNavigating]);

  React.useEffect(() => {
    console.log("🔍 AuthGate: Effect triggered", {
      isAuthenticated,
      isLoading,
      segments: segments[0],
    });

    if (isLoading) {
      console.log("⏳ AuthGate: Still loading...");
      return;
    }

    const inAuthGroup =
      segments[0] === "(tabs)" ||
      segments[0] === "room" ||
      segments[0] === "schedule-detail";

    console.log("🔍 AuthGate Debug:", {
      isAuthenticated,
      isLoading,
      currentSegment: segments[0],
      inAuthGroup,
      isNavigating,
    });

    if (isAuthenticated && !inAuthGroup && !isNavigating) {
      // 인증된 경우, (tabs)로 이동
      navigateToTabs();
    } else if (!isAuthenticated && inAuthGroup && !isNavigating) {
      // 인증 안 된 경우, 항상 랜딩/로그인/회원가입만 접근 가능
      navigateToLanding();
    } else if (!isAuthenticated && !inAuthGroup && !isNavigating) {
      // 인증 안 되고 랜딩 페이지에 있지 않은 경우
      console.log("🏠 AuthGate: User not authenticated, staying on landing");
    } else {
      console.log("⏸️ AuthGate: No navigation needed");
    }
  }, [
    isAuthenticated,
    isLoading,
    segments,
    navigateToTabs,
    navigateToLanding,
    isNavigating,
  ]);

  // 네비게이션 완료 후 상태 리셋
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isNavigating]);

  // 로딩 중일 때는 로딩 화면 표시
  if (isLoading) {
    console.log("⏳ AuthGate: Showing loading screen");
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 16, color: "#5C39F5" }}>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    console.log("📱 Font loading...");
    return null;
  }

  console.log("📱 RootLayout rendered");

  return (
    <ProjectProvider>
      <AuthProvider>
        <AuthGate>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="landing" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="room/[id]" options={{ headerShown: false }} />
              <Stack.Screen
                name="schedule-detail"
                options={{ headerShown: true }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </AuthGate>
      </AuthProvider>
    </ProjectProvider>
  );
}
