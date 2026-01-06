import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomText from "./CustomText";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showClose?: boolean;
  showCancel?: boolean;
}

export default function Header({
  title,
  showBack = true,
  showClose = false,
  showCancel = false,
}: HeaderProps) {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  };

  const leftIconName =
    showCancel || showClose ? "close" : showBack ? "chevron-back" : null;

  return (
    <View className="flex-row items-center justify-between px- py-4">
      {leftIconName ? (
        <TouchableOpacity onPress={handlePress} className="p-2">
          <Ionicons name={leftIconName} size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}

      <CustomText weight="medium" size="lg">
        {title}
      </CustomText>

      <View className="w-10" />
    </View>
  );
}
