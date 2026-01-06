import React from "react";
import { View, Text } from "react-native";

interface TransferSummaryCardProps {
  amount: number | string;
  fee: number;
  totalDebit: number;
}

export default function TransferSummaryCard({
  amount,
  fee,
  totalDebit,
}: TransferSummaryCardProps) {
  return (
    <View className="bg-primary-400 rounded-2xl p-4 mb-4">
      <View className="pt-3">
        <View className="flex-row justify-between mb-2 py-3 border-b border-primary-300">
          <Text className="text-accent-200 text-sm mb-2">Recipient gets</Text>
          <Text className="text-accent-200 font-semibold">₦{amount}</Text>
        </View>

        <View className="flex-row justify-between py-3 mb-2 border-b border-primary-300">
          <Text className="text-accent-200 text-sm mb-2">Fee</Text>
          <Text className="text-accent-200 font-semibold">₦{fee}</Text>
        </View>

        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-white font-semibold">Total debit</Text>
          <Text className="text-white font-bold text-lg">
            ₦{totalDebit.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
