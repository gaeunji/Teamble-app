import React from "react";
import { HomeScreen } from "../../src/screens/Home/HomeScreen";

export default function Home() {
  React.useEffect(() => {
    console.log("🏠 Home tab rendered successfully");
  }, []);

  return <HomeScreen />;
}
