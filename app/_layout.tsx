"use client";

import { Provider } from "react-redux";
import "./globals.css";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Platform, StatusBar } from "react-native";
import { store } from "./lib/store";
import AuthWrapper from "./(root)/AuthWrapper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit: require("./assets/fonts/Outfit-Bold.ttf"),
    OutfitMedium: require("./assets/fonts/Outfit-Medium.ttf"),
    OutfitBold: require("./assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  SplashScreen.hideAsync();

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#3F401B");
    NavigationBar.setButtonStyleAsync("light");
    StatusBar.setBackgroundColor("#3F401B", true);
    StatusBar.setBarStyle("light-content", true);
  }

  return (
    <Provider store={store}>
      <AuthWrapper />
    </Provider>
  );
}
