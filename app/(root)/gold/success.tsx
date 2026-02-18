import React from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/app/components/header-back";
import Button from "@/app/components/Button";

export default function GoldSuccess() {
  const params = useLocalSearchParams<Record<string, string>>();
  const router = useRouter();

  const transactionType = params.type === "sell" ? "sell" : "buy";
  const isSell = transactionType === "sell";
  const successMessage = isSell 
    ? "Your gold sale is confirmed." 
    : "Your gold order is confirmed.";

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <StatusBar barStyle="light-content" />
      <Header title="" />

      <View className="flex-1 px-6 pt-32 items-center">
        <Text className="text-5xl">🎉</Text>
        <Text className="text-white text-2xl font-outfit-bold mt-6">{successMessage}</Text>
        <Text className="text-white mt-2">your transaction was successful</Text>

        <View className="flex-1 justify-end w-full pb-8">
          <Button
            title="Done"
            variant="primary"
            onPress={() => router.replace({ pathname: "/(root)/gold" })}
            className="mb-4"
          />

          <Button
            title={isSell ? "View transaction" : "Share receipt"}
            variant="secondary"
            onPress={() => router.push({ pathname: isSell ? "/(root)/gold/dashboard" : "/(root)/gold/skr" })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
