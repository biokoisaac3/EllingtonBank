import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomText from "./CustomText";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const router = useRouter();
  const progressWidth = (currentStep / totalSteps) * 100;

  return (
    <View className="flex-row items-center mb-4">
      <Pressable onPress={() => router.back()} className="mr-3">
        <Ionicons name="close" size={24} color="white" />
      </Pressable>

      <View className="flex-1 mr-2">
        <View className="h-1 bg-primary-400 rounded-full overflow-hidden">
          <View
            className="h-1 bg-primary-300 rounded-full"
            style={{ width: `${progressWidth}%` }}
          />
        </View>
      </View>
      <CustomText size="xs" secondary>
        {currentStep}/{totalSteps}
      </CustomText>
    </View>
  );
}
