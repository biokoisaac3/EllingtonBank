import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AmountCard from "@/app/components/home/cards/AmountCard";
import Button from "@/app/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/app/components/CustomText";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store";
import { clearValidation } from "@/app/lib/slices/accountSlice";

export default function TransferSuccess() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams();
  const router = useRouter();

  const amount = params.amount as string;
  const receiverName = params.receiverName || "recipient";

  let transferResult;
  try {
    transferResult = JSON.parse(params.transferResult as string);
  } catch {
    transferResult = null;
  }

  const handleDone = () => {
    dispatch(clearValidation());
    router.replace("/(root)/(tabs)");
  };

const handleShareReceipt = () => {
  if (!transferResult) return;

  router.replace({
    pathname: "/(root)/transfer/receipt-details",
    params: {
      transferResult: JSON.stringify(transferResult),
    },
  });
};


  return (
    <SafeAreaView className="flex-1 bg-primary-400">
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        onPress={handleDone}
        className="absolute top-16 left-6 z-10"
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      <View className="flex-1 px-6 pt-24 justify-start">
        <AmountCard
          amount={amount || ""}
          description="Seventy five thousand naira"
        />

        <View className="items-center mt-10 mb-4 px-4">
          <Text className="text-9xl mb-4">🎉</Text>
          <Text className="text-white text-2xl font-bold mb-2">
            Transfer successful
          </Text>
          <Text className="text-white/60 text-center px-6">
            Your transfer of ₦{amount} to {receiverName} was successful
          </Text>
        </View>
        {/* <LinearGradient
          colors={[ "#515220","#212207"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 20, padding: 16 }}
        >
          <CustomText>Invite and earn</CustomText>
          <CustomText>
            Receive N300 for every new person you refer. Plus, earn N10 on every
            transaction they make.
          </CustomText>
        </LinearGradient> */}
      </View>

      <View className="px-6 pb-10  gap-3">
        <Button
          title="Done"
          variant="primary"
          onPress={handleDone}
          className="rounded-2xl mb-3"
        />

        <Button
          title="Share receipt"
          variant="secondary"
          onPress={handleShareReceipt}
          className="rounded-2xl flex-row justify-center"
          icon={<Ionicons name="share-outline" size={20} color="#2a2a1a" />}
        />
      </View>
    </SafeAreaView>
  );
}
