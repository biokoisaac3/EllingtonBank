import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "@/app/components/header-back";
import Button from "@/app/components/Button";
import Loading from "@/app/components/Loading";
import { useAppDispatch } from "@/app/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/app/lib/hooks/useAppSelector";
import { fetchGoldPrice } from "@/app/lib/thunks/goldThunks";

export default function BuyGold() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const gold = useAppSelector((s) => s.gold);
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    dispatch(fetchGoldPrice());
  }, [dispatch]);

  const grams = useMemo(() => {
    const pricePerGram = Number(gold?.price?.ngn_per_gram || gold?.price?.price || 0);
    const a = Number(amount.replace(/,/g, "") || 0);
    if (!pricePerGram || a <= 0) return "0.00";
    return (a / pricePerGram).toFixed(2);
  }, [amount, gold]);

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <StatusBar barStyle="light-content" />
      <Header title="Buy Gold" />

      <Loading visible={gold.isLoading} />

      <View className="flex-1 px-6 pt-6">
        <TouchableOpacity className="rounded-lg bg-primary-200 p-4 mb-6">
          <Text className="text-white">Live Gold Price</Text>
          <Text className="text-white text-lg font-outfit-bold mt-2">{gold.price?.display || `₦${gold.price?.ngn_per_gram || "-"}`}</Text>
        </TouchableOpacity>

        <Text className="text-white mb-2">Buy Amount</Text>
        <TextInput
          value={amount}
          onChangeText={(t) => setAmount(t)}
          keyboardType="numeric"
          placeholder="75,000"
          placeholderTextColor="#bdbdbd"
          className="bg-primary-200 rounded-lg p-4 text-white mb-6"
        />

        <Text className="text-white mb-2">Buy Grams</Text>
        <View className="bg-primary-200 rounded-lg p-4 mb-6">
          <Text className="text-white">{grams} gram</Text>
        </View>

        <View className="flex-1 justify-end pb-8">
          <Button
            title="Continue"
            variant="primary"
            onPress={() => {
              router.push({
                pathname: "/(root)/gold/confirm-payment",
                params: { amount: String(amount), grams: String(grams) },
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
