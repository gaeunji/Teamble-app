import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { CalendarScreen } from "../screens/Calendar/CalendarScreen";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { RoomListScreen } from "../screens/Room/RoomListScreen";
import { RoomScreen } from "../screens/Room/RoomScreen";
import { SettingsScreen } from "../screens/Settings/SettingsScreen";

const Tab = createBottomTabNavigator();
const RoomStack = createStackNavigator();

function RoomStackScreen() {
  return (
    <RoomStack.Navigator initialRouteName="RoomList" {...({} as any)}>
      <RoomStack.Screen
        name="RoomList"
        component={RoomListScreen}
        options={{ headerShown: false }}
      />
      <RoomStack.Screen
        name="ChatRoom"
        component={RoomScreen}
        options={{ headerShown: false }}
      />
    </RoomStack.Navigator>
  );
}

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      {...({} as any)}
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
        name="Chat"
        component={RoomStackScreen}
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
  );
};
