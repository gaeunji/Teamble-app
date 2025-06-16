import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import { CalendarScreen } from "../screens/Calendar/CalendarScreen";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { RoomListScreen } from "../screens/Room/RoomListScreen";
import { SettingsScreen } from "../screens/Settings/SettingsScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle: {
            height: 80,
            paddingBottom: 15,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 28, height: 28, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Room"
          component={RoomListScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 28, height: 28, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 28, height: 28, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 28, height: 28, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
