import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { CustomTabIcon } from "../../src/components/CustomTabIcon";

const TAB_CONFIG = [
  { name: "index", label: "Home", iconKey: "home" },
  { name: "room", label: "Room", iconKey: "room" },
  { name: "calendar", label: "Calender", iconKey: "calender" },
  { name: "settings", label: "Settings", iconKey: "settings" },
];

const ICONS = {
  home: require("../../assets/icons/home.png"),
  room: require("../../assets/icons/room.png"),
  calender: require("../../assets/icons/calender.png"),
  settings: require("../../assets/icons/settings.png"),
};

export default function TabLayout() {
  const renderTabScreen = (tab) => (
    <Tabs.Screen
      key={tab.name}
      name={tab.name}
      options={{
        title: tab.label,
        tabBarIcon: ({ color, size, focused }) => (
          <CustomTabIcon
            name={tab.iconKey}
            focused={focused}
            color={color}
            size={size}
            customIcon={
              <Image
                source={ICONS[tab.iconKey]}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  opacity: focused ? 1 : 0.6,
                }}
                resizeMode="contain"
              />
            }
          />
        ),
      }}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5C39F5",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
        tabBarStyle: {
          height: 85,
          paddingBottom: 15,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontWeight: "500",
        },
      }}
    >
      {TAB_CONFIG.map(renderTabScreen)}
    </Tabs>
  );
}
