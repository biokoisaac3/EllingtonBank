import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/app/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const RegistrationSuccessScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-primary-100 px-6">
      <View className="flex-row justify-start items-center pt-4 pb-6">
        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center space-y-6">
        <Text className="text-8xl">🎉</Text>

        <Text className="text-3xl font-bold text-white leading-normal text-center mt-4 max-w-72">
          You are good to go
        </Text>

        <Text className="text-accent-100 text-center text-base leading-relaxed mt-4">
          Thank you for completing your registration. Welcome to Ellington Bank.
        </Text>
      </View>

      <View className="pb-6">
        <Button
          title="Login now"
          variant="primary"
          onPress={() => {
            console.log("Button onPress fired!");
            router.replace("/(auth)/login");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RegistrationSuccessScreen;
