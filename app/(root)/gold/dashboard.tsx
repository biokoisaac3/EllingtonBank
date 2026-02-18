import React, { useState } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import CustomText from "@/app/components/CustomText";
import Header from "@/app/components/header-back";

export default function GoldDashboard() {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);

  const grams = "50.00";
  const unit = "Gram";

  return (
    <SafeAreaView className="flex-1 bg-[#4A4B1A]">
      <Header title="Gold" />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 pb-10">
          {/* Wallet Card */}
          <View className="bg-[#2E2F12] rounded-3xl p-5">
            <CustomText size="base" weight="medium" className="text-white/80">
              Gold Wallet
            </CustomText>

            <View className="mt-2 flex-row items-center">
              <CustomText size="xxxl" weight="bold" className="text-white">
                {hidden ? "•••••" : `${grams} ${unit}`}
              </CustomText>

              <Pressable
                onPress={() => setHidden((p) => !p)}
                className="ml-3 w-10 h-10 rounded-full items-center justify-center bg-white/10"
                hitSlop={10}
              >
                <Ionicons
                  name={hidden ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="rgba(255,255,255,0.75)"
                />
              </Pressable>
            </View>

            <View className="mt-4 flex-row justify-between">
              <View>
                <CustomText size="sm" className="text-white/60">
                  Gram
                </CustomText>
                <CustomText size="lg" weight="bold" className="text-white">
                  {hidden ? "••••" : "20.10"}
                </CustomText>
              </View>

              <View className="items-end">
                <CustomText size="sm" className="text-white/60">
                  Total Fund
                </CustomText>
                <CustomText size="lg" weight="bold" className="text-white">
                  {hidden ? "••••••" : "₦80,000"}
                </CustomText>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="mt-6 flex-row justify-between">
              <ActionTile
                label="Buy"
                iconName="cart-outline"
                onPress={() => {}}
              />
              <ActionTile
                label="Sell"
                iconName="pricetag-outline"
                onPress={() => {}}
              />
              <ActionTile
                label="Withdraw"
                iconName="wallet-outline"
                onPress={() => {}}
              />
              <ActionTile
                label="Gift"
                iconName="gift-outline"
                onPress={() => {}}
              />
            </View>
          </View>

          {/* Trigger Card */}
          <Pressable
            onPress={() => {}}
            className="mt-5 bg-[#5A5B1F] rounded-3xl p-5 flex-row items-center justify-between"
          >
            <View className="flex-1 pr-4">
              <CustomText size="lg" weight="bold" className="text-white">
                Set Your Gold Trigger
              </CustomText>
              <CustomText size="sm" className="text-white/80 mt-1 leading-5">
                Buy gold now at the best price. Set a trigger to sell
                automatically when rates peak—secure profits at the highest
                value
              </CustomText>
            </View>

            <View className="w-14 h-14 rounded-2xl bg-white/10 items-center justify-center">
              <Ionicons name="radio-outline" size={26} color="#fff" />
            </View>
          </Pressable>

          {/* Total Invested */}
          <CustomText size="lg" weight="bold" className="text-white mt-8 mb-3">
            Total Invested gold
          </CustomText>

          {/* List Rows */}
          <View className="bg-[#5A5B1F] rounded-3xl overflow-hidden">
            <InvestedRow
              title="Gold"
              subtitle="7.56gm"
              rightTop="₦490.84"
              rightBottom="+$80.20 (3.25%)"
              rightBottomPositive
              iconName="sparkles-outline"
            />

            <View className="h-[1px] bg-white/10" />

            <InvestedRow
              title="Live Gold Price"
              subtitle="-$2.20 (-0.52%)"
              rightTop="₦390.84"
              rightBottom="↑"
              rightBottomPositive
              iconName="stats-chart-outline"
            />
          </View>

          {/* History */}
          <CustomText size="lg" weight="bold" className="text-white mt-8 mb-3">
            History
          </CustomText>

          <HistoryGroup
            date="Sun 23 Nov, 2025"
            items={[
              {
                id: "1",
                type: "Top up",
                from: "From debit card",
                amount: "+10,000",
                amountPositive: true,
                totalBal: "₦20,000",
              },
              {
                id: "2",
                type: "Withdrawal",
                from: "To bank account",
                amount: "-10,000",
                amountPositive: false,
                totalBal: "₦20,000",
              },
            ]}
          />

          <HistoryGroup
            date="Sun 23 Nov, 2025"
            items={[
              {
                id: "3",
                type: "Top up",
                from: "From bank account",
                amount: "+10,000",
                amountPositive: true,
                totalBal: "₦20,000",
              },
              {
                id: "4",
                type: "Withdrawal",
                from: "To bank account",
                amount: "-10,000",
                amountPositive: false,
                totalBal: "₦20,000",
              },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionTile({
  label,
  iconName,
  onPress,
}: {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="items-center w-[23%]">
      <View className="w-16 h-16 rounded-2xl bg-white/10 items-center justify-center">
        <Ionicons name={iconName} size={22} color="#fff" />
      </View>
      <CustomText size="sm" weight="medium" className="text-white mt-2">
        {label}
      </CustomText>
    </Pressable>
  );
}

function InvestedRow({
  title,
  subtitle,
  rightTop,
  rightBottom,
  rightBottomPositive,
  iconName,
}: {
  title: string;
  subtitle: string;
  rightTop: string;
  rightBottom: string;
  rightBottomPositive?: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View className="px-5 py-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mr-3">
          <Ionicons name={iconName} size={20} color="#fff" />
        </View>

        <View>
          <CustomText size="base" weight="bold" className="text-white">
            {title}
          </CustomText>
          <CustomText size="sm" className="text-white/70 mt-1">
            {subtitle}
          </CustomText>
        </View>
      </View>

      <View className="items-end">
        <CustomText size="base" weight="bold" className="text-white">
          {rightTop}
        </CustomText>

        <CustomText
          size="sm"
          weight="bold"
          className={
            rightBottomPositive ? "text-green-400 mt-1" : "text-white/70 mt-1"
          }
        >
          {rightBottom}
        </CustomText>
      </View>
    </View>
  );
}

function HistoryGroup({
  date,
  items,
}: {
  date: string;
  items: {
    id: string;
    type: string;
    from: string;
    amount: string;
    amountPositive: boolean;
    totalBal: string;
  }[];
}) {
  return (
    <View className="mb-5">
      <CustomText size="xs" className="text-white/60 mb-3">
        {date}
      </CustomText>

      <View className="gap-3">
        {items.map((it) => (
          <HistoryItem key={it.id} {...it} />
        ))}
      </View>
    </View>
  );
}

function HistoryItem({
  type,
  from,
  amount,
  amountPositive,
  totalBal,
}: {
  type: string;
  from: string;
  amount: string;
  amountPositive: boolean;
  totalBal: string;
}) {
  const amountColor = amountPositive ? "text-green-400" : "text-red-400";
  const iconName: keyof typeof Ionicons.glyphMap = amountPositive
    ? "arrow-up-outline"
    : "arrow-down-outline";

  return (
    <View className="bg-[#5A5B1F] rounded-2xl px-5 py-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start flex-1 pr-3">
          <View className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mr-3 mt-0.5">
            <Ionicons name={iconName} size={18} color="#fff" />
          </View>

          <View className="flex-1">
            <CustomText size="base" weight="bold" className="text-white">
              {type}
            </CustomText>
            <CustomText size="xs" className="text-white/60 mt-1">
              {from}
            </CustomText>
          </View>
        </View>

        <CustomText size="base" weight="bold" className={amountColor}>
          {amount}
        </CustomText>
      </View>

      <View className="mt-3 flex-row justify-end">
        <CustomText size="xs" className="text-white/60">
          Total Bal.:
          <CustomText size="xs" weight="bold" className="text-white/80">
            {" "}
            {totalBal}
          </CustomText>
        </CustomText>
      </View>
    </View>
  );
}
