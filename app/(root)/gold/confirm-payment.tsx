import React from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/app/components/header-back";
import Button from "@/app/components/Button";

export default function ConfirmPayment() {
  const params = useLocalSearchParams<Record<string, string>>();
  const router = useRouter();

  const amount = params.amount || "0";
  const grams = params.grams || "0";

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <StatusBar barStyle="light-content" />
      <Header title="Confirm payment" />

      <View className="flex-1 px-6 pt-6">
        <View className="rounded-lg bg-primary-200 p-6 mb-6">
          <Text className="text-white text-3xl font-outfit-bold mb-2">₦{amount}</Text>
          <Text className="text-white">Seventy five thousand naira</Text>
        </View>

        <View className="rounded-lg bg-primary-200 p-4 mb-6">
          <Text className="text-white mb-2">Amount Payable</Text>
          <Text className="text-white">₦{amount}</Text>

          <Text className="text-white mt-4">Gold Quantity</Text>
          <Text className="text-white">{grams} gms</Text>

          <Text className="text-white mt-4">Gold Value</Text>
          <Text className="text-white">₦{amount}</Text>

          <Text className="text-white mt-4">Net Amount Payable</Text>
          <Text className="text-white">₦{amount}</Text>
        </View>

        <View className="flex-1 justify-end pb-8">
          <Button
            title="Buy Gold"
            variant="primary"
            onPress={() =>
              router.push({
                pathname: "/(root)/gold/authorize",
                params: { amount: String(amount), grams: String(grams) },
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
