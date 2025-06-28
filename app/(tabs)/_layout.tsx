import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { CustomTabIcon } from "../../src/components/CustomTabIcon";
import { Header } from "../../src/components/Header";
import { TAB_BAR_STYLE } from "../../src/constants/tabs";

interface TabConfig {
  name: string;
  label: string;
  iconKey: keyof typeof ICONS;
}

const TAB_CONFIG: TabConfig[] = [
  { name: "index", label: "Home", iconKey: "home" },
  { name: "room", label: "Room", iconKey: "room" },
  { name: "calendar", label: "Calendar", iconKey: "calender" },
  { name: "settings", label: "Settings", iconKey: "settings" },
];

const ICONS = {
  home: require("../../assets/icons/home.png"),
  room: require("../../assets/icons/room.png"),
  calender: require("../../assets/icons/calender.png"),
  settings: require("../../assets/icons/settings.png"),
} as const;

export default function TabLayout() {
  const renderTabScreen = React.useCallback(
    (tab: TabConfig) => (
      <Tabs.Screen
        key={tab.name}
        name={tab.name}
        options={{
          title: tab.label,
          headerShown: tab.name === "settings",
          header: tab.name === "settings" ? () => <Header /> : undefined,
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
    ),
    []
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5C39F5",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
        tabBarStyle: TAB_BAR_STYLE,
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
