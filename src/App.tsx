import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "./api/queryClient";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "./error/ErrorBoundary";
import { AppNavigator } from "./navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </AuthProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
