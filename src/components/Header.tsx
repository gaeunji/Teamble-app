import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export const Header = React.memo(
  ({ title, showBackButton = false, rightComponent }: HeaderProps) => {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerContainer}>
          <Image
            source={require("../../assets/images/header-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.rightContainer}>
          {rightComponent || (
            <TouchableOpacity style={styles.alarmButton}>
              <Image
                source={require("../../assets/images/alarm-icon.png")}
                style={styles.alarmIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    height: 72,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  leftContainer: {
    width: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  logo: {
    width: 90,
    height: 30,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000000",
  },
  alarmButton: {
    padding: 8,
  },
  alarmIcon: {
    width: 28,
    height: 28,
  },
});
