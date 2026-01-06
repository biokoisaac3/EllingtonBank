import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import icons from "@/app/assets/icons/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { formatMoney } from "@/app/lib/utils";

export default function SenderCard() {
  const {
    accountInfo,
    isLoading: loading,
    error,
  } = useSelector((state: RootState) => state.accounts);
  const {user } = useSelector((state: RootState) => state.auth);
  return (
    <View className="mb-6">
      <Text className="text-sm text-white/70 mb-3">You are sending from</Text>

      <LinearGradient
        colors={["#515220", "#212207"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 20 }}
      >
        <View className="flex-row items-center justify-between p-4 py-5">
          <View>
            <View className="flex-row items-center mb-2">
              <Text className="text-sm text-white">
                {accountInfo?.accountName || ""}
              </Text>
              <Text className="text-sm text-white/50">
                {" "}
                • {accountInfo?.accountNumber || ""}
              </Text>
            </View>

            <Text className="text-2xl font-bold text-white">
              ₦{formatMoney(accountInfo?.accountBalance)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full overflow-hidden -mr-4">
              <Image
                source={{ uri: user?.passport || "https://i.pravatar.cc/100" }}
                className="w-full h-full"
              />
            </View>

            <TouchableOpacity className="w-12 h-12 rounded-full bg-primary-400 items-center justify-center z-10 overflow-hidden">
              <Image
                source={icons.sender_card}
                style={{ width: 22, height: 22 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
