// app/(root)/gold/buy-gold.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Loading from "@/app/components/Loading";
import Header from "@/app/components/header-back";
import AmountInput from "@/app/components/inputs/AmountInput";
import Button from "@/app/components/Button";

import { useAppDispatch } from "@/app/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/app/lib/hooks/useAppSelector";
import { fetchGoldPrice } from "@/app/lib/thunks/goldThunks";

const money = (n: number, dp = 2) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });

export default function BuyGold() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const gold = useAppSelector((s) => s.gold);

  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchGoldPrice());
  }, [dispatch]);

  const pricePerGramNgn = Number(gold?.price?.pricePerGramNgn || 0);

  // ✅ grams = buyAmount / pricePerGramNgn
  const grams = useMemo(() => {
    const a = Number(amount.replace(/,/g, "") || 0);
    if (!pricePerGramNgn || a <= 0) return "0.00";
    return (a / pricePerGramNgn).toFixed(2);
  }, [amount, pricePerGramNgn]);

  const liveUsd = Number(gold?.price?.pricePerGramUsd || 0);
  const changeUsd = Number(gold?.price?.changeUsd || 0);
  const changePct = Number(gold?.price?.changePercent || 0);
  const isUp = changeUsd >= 0;

  return (
    <SafeAreaView className="flex-1 bg-[#3a3a1a]">
      <StatusBar barStyle="light-content" />

      <Loading visible={gold.isLoading} />

      <Header title="Buy Gold" showCancel />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 px-5 pt-3">
          {/* Live Price Card */}
          <View className="rounded-2xl bg-primary-400 p-6 mb-6 flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-primary-300 items-center justify-center mr-3">
              <Ionicons name="stats-chart" size={18} color="#fff" />
            </View>

            <View className="flex-1">
              <Text className="text-white text-sm font-semibold">
                Live Gold Price
              </Text>
              <Text className="text-white/70 text-xs mt-1">
                {`${changeUsd >= 0 ? "+" : ""}$${money(changeUsd, 2)} (${
                  changePct >= 0 ? "+" : ""
                }${changePct.toFixed(2)}%)`}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons
                name={isUp ? "arrow-up" : "arrow-down"}
                size={18}
                color={isUp ? "#22c55e" : "#ef4444"}
                style={{ marginRight: 6 }}
              />
              <Text className="text-white text-lg font-bold">
                {liveUsd ? `$${money(liveUsd, 2)}` : "$0.00"}
              </Text>
            </View>
          </View>

          {/* Amount */}
          <Text className="text-white text-sm font-semibold mb-3">
            Buy Amount
          </Text>
          <AmountInput
            value={amount}

            onChange={setAmount}
            placeholder="75,000"
            sign="₦"
          />

          <View className="flex-row items-center mt-2 mb-6">
            <Ionicons
              name="help-circle-outline"
              size={16}
              color="rgba(255,255,255,0.7)"
            />
            <Text className="text-white/70 text-xs ml-2">
              Minimum amount should be $100
            </Text>
          </View>

          {/* Grams */}
          <Text className="text-white text-sm font-semibold mb-3">
            Buy Grams
          </Text>
          <View
            className={`rounded-3xl border border-[#6a6a3a] bg-[#4a4a28] flex-row items-center ${
              Platform.OS === "ios" ? "px-3 py-3" : "px-3 py-2"
            }`}
          >
            <View className="w-10 items-center justify-center border-r border-[#6a6a3a]">
              <Ionicons name="sparkles" size={18} color="#fff" />
            </View>

            <View className="flex-1 px-4 py-3">
              <Text className="text-white text-2xl font-bold">{grams}gram</Text>
            </View>
          </View>

          {/* Continue */}
          <View className="flex-1 justify-end pb-6">
            <Button
              title="Continue"
              variant="primary"
              onPress={() => {
                router.push({
                  pathname: "/gold/confirm-payment", 
                  params: { amount, grams },
                });
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
