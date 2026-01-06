import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Transaction } from "../lib/types/transaction";



interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const router = useRouter();
  const isReceived = transaction.amount > 0;
  const isSent = transaction.amount < 0;
  const absAmount = Math.abs(transaction.amount);

  const handlePress = () => {
    router.push({
      pathname: "/(root)/transaction-details",
      params: { id: transaction.id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} className="mb-4">
      <View className="flex-row items-center justify-between bg-primary-400 p-4 py-6 rounded-xl">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-primary-300 rounded-full items-center justify-center mr-3">
            <Ionicons
              name={isReceived ? "arrow-down" : "arrow-up"}
              size={20}
              color="white"
            />
          </View>
          <View>
            <Text
              className={`text-white font-semibold ${
                isSent ? "text-red-300" : "text-green-300"
              }`}
            >
              {isReceived
                ? "Received"
                : transaction.type === "airtime"
                ? "Airtime"
                : "Sent"}
            </Text>
            <Text className="text-white/70 text-sm">{transaction.name}</Text>
            <Text className="text-white/60 text-xs">{transaction.number}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text
            className={`text-lg font-bold ${
              isReceived ? "text-green-200" : "text-error"
            }`}
          >
            {isReceived
              ? `+₦${absAmount.toLocaleString()}`
              : `-₦${absAmount.toLocaleString()}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
