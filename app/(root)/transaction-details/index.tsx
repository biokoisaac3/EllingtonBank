// app/(root)/transactions/[id].tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

interface Transaction {
  id: string;
  type: "transfer" | "airtime" | "received" | "sent";
  name: string;
  number: string;
  amount: number;
  date: string; // ISO date string
  status?: "successful" | "pending" | "failed";
  remark?: string;
  fee?: number;
  sender?: string;
  senderBank?: string;
  beneficiary?: string;
  beneficiaryAccount?: string;
  beneficiaryBank?: string;
  reference?: string;
}

// Mock full transaction data (in real app, fetch by id)
const getTransactionById = (id: string): Transaction => {
  // Simulate fetch; use the mock from previous
  return {
    id,
    type: "airtime",
    name: "Sarah Doe",
    number: "08123456789",
    amount: 5500,
    date: "2025-11-29T10:30:00",
    status: "successful",
    remark: "School fees",
    fee: 0,
    sender: "Sandra John",
    senderBank: "Ellington Bank",
    beneficiary: "Ibrahim Shittu",
    beneficiaryAccount: "5372915793",
    beneficiaryBank: "GT Bank",
    reference: "6353hdte9347u4",
  };
};

export default function TransactionDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const transaction = getTransactionById(id || "1");
  const absAmount = Math.abs(transaction.amount);

  const statusColor =
    transaction.status === "successful" ? "bg-green-500" : "bg-yellow-500"; 

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-primary-400 rounded-xl p-6 mb-6">
            <Text className="text-3xl font-bold text-white mb-2">
              ₦{absAmount.toLocaleString()}
            </Text>
            <Text className="text-white/70 text-sm mb-4">
              {new Date(transaction.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <View
              className={`px-3 py-1 rounded-full inline-flex ${statusColor}`}
            >
              <Text className="text-white font-medium">
                {transaction.status?.toUpperCase()}
              </Text>
            </View>
          </View>

          <View className="bg-primary-400 rounded-xl p-4 mb-4">
            <Text className="text-white font-semibold mb-2">
              {transaction.name}
            </Text>
            <Text className="text-white/70 mb-2">{transaction.number}</Text>
            <View className="flex-row items-center">
              <Ionicons
                name="receipt-outline"
                size={16}
                color="white/70"
                className="mr-2"
              />
              <Text className="text-white/70 text-sm">
                Reference: {transaction.reference}
              </Text>
            </View>
          </View>

          <View className="space-y-4 mb-6">
            <View className="flex-row justify-between">
              <Text className="text-white/70">Type</Text>
              <Text className="text-white capitalize">{transaction.type}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white/70">Fee</Text>
              <Text className="text-white">₦{transaction.fee || 0}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white/70">Total debit</Text>
              <Text className="text-white">₦{absAmount.toLocaleString()}</Text>
            </View>
          </View>

          <View className="space-y-4 mb-6">
            <Text className="text-white font-semibold mb-2">Sender</Text>
            <View className="flex-row justify-between">
              <Text className="text-white/70">Name</Text>
              <Text className="text-white">{transaction.sender}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white/70">Bank</Text>
              <Text className="text-white">{transaction.senderBank}</Text>
            </View>

            <Text className="text-white font-semibold mt-4 mb-2">
              Beneficiary
            </Text>
            <View className="flex-row justify-between">
              <Text className="text-white/70">Name</Text>
              <Text className="text-white">{transaction.beneficiary}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white/70">Account</Text>
              <Text className="text-white">
                {transaction.beneficiaryAccount}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white/70">Bank</Text>
              <Text className="text-white">{transaction.beneficiaryBank}</Text>
            </View>
          </View>

          {transaction.remark && (
            <View className="bg-primary-400 rounded-xl p-4 mb-6">
              <Text className="text-white/70 mb-1">Remark</Text>
              <Text className="text-white">{transaction.remark}</Text>
            </View>
          )}

          <View className="flex-row space-x-2">
            <TouchableOpacity className="flex-1 bg-primary-500 rounded-lg p-3 items-center">
              <View className="flex-row items-center">
                <Ionicons
                  name="share-outline"
                  size={20}
                  color="white"
                  className="mr-2"
                />
                <Text className="text-white">Share receipt</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-primary-500 rounded-lg p-3 items-center">
              <View className="flex-row items-center">
                <Ionicons
                  name="download-outline"
                  size={20}
                  color="white"
                  className="mr-2"
                />
                <Text className="text-white">Download</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
