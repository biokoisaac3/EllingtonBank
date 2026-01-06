import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchBar from "@/app/components/SearchBar";
import TransactionCard from "@/app/components/TransactionCard";
import { Transaction } from "@/app/lib/types/transaction";
import { mockTransactions } from "@/app/lib/utils";



const groupTransactionsByDate = (transactions: Transaction[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groups: { [key: string]: Transaction[] } = {};

  transactions.forEach((tx) => {
    const txDate = new Date(tx.date);
    let groupKey: string;

    if (txDate.toDateString() === today.toDateString()) {
      groupKey = "Today";
    } else if (txDate.toDateString() === yesterday.toDateString()) {
      groupKey = "Yesterday";
    } else {
      groupKey = txDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(tx);
  });

  const sortedGroups = Object.keys(groups)
    .sort((a, b) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      if (a === "Yesterday") return -1;
      if (b === "Yesterday") return 1;
      return new Date(b).getTime() - new Date(a).getTime();
    })
    .reduce((obj, key) => {
      obj[key] = groups[key];
      return obj;
    }, {} as { [key: string]: Transaction[] });

  return sortedGroups;
};

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions] = useState(mockTransactions); 

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);
  const hasTransactions = Object.keys(groupedTransactions).length > 0;

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <View className="p-4">
        <View className="flex-col mb-4">
          <Text className="text-white text-xl font-bold mb-2">
            Recent transactions
          </Text>
          <Text className="text-white/60 text-sm">
            Your latest financial activities
          </Text>
        </View>

        <SearchBar onSearch={setSearchQuery} />

        {hasTransactions ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.entries(groupedTransactions).map(([date, transactions]) => (
              <View key={date} className="mb-4">
                <Text className="text-white/70 text-sm font-medium mb-2 capitalize">
                  {date}
                </Text>
                {transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center mt-8">
            <Ionicons name="receipt-outline" size={64} color="white/30" />
            <Text className="text-white/60 text-center text-base mt-4">
              No transaction yet
            </Text>
            <Text className="text-white/60 text-center text-sm">
              Your transaction history will appear here once you start using the
              account
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
