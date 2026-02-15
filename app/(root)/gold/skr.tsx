import React, { useEffect } from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/app/components/header-back";
import Button from "@/app/components/Button";
import { useAppDispatch } from "@/app/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/app/lib/hooks/useAppSelector";
import { fetchGoldSkr } from "@/app/lib/thunks/goldThunks";

export default function GoldSkr() {
  const dispatch = useAppDispatch();
  const gold = useAppSelector((s) => s.gold);

  useEffect(() => {
    dispatch(fetchGoldSkr() as any);
  }, [dispatch]);

  const skr = gold.skr;

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <StatusBar barStyle="light-content" />
      <Header title="Secure Gold Vault" />

      <ScrollView className="px-6 pb-8">
        <View className="rounded-lg bg-primary-200 p-4 mb-4">
          <Text className="text-white">Receipt ID</Text>
          <Text className="text-white font-outfit-bold">{skr?.receipt_id || "SKR-2025-873905"}</Text>
          <Text className="text-white mt-2">Issue Date</Text>
          <Text className="text-white">{skr?.issue_date || "13 Aug 2025"}</Text>
        </View>

        <View className="rounded-lg bg-primary-200 p-4 mb-4">
          <Text className="text-white">Owner Information</Text>
          <Text className="text-white">Name: {skr?.owner?.name || "Sarah Joe"}</Text>
          <Text className="text-white">Customer ID: {skr?.owner?.customer_id || "CUST-90877"}</Text>
        </View>

        <View className="rounded-lg bg-primary-200 p-4 mb-6">
          <Text className="text-white">Gold Details</Text>
          <Text className="text-white">Weight: {skr?.weight || "1 grams"}</Text>
          <Text className="text-white">Purity: {skr?.purity || "24 Karat (999.9)"}</Text>
        </View>

        <Button title="Download SKR Receipt" variant="primary" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}
