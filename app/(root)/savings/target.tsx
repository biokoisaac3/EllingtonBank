import React, { useState } from "react";
import { View } from "react-native";
import ProgressBar from "@/app/components/ProgressBar";
import CustomText from "@/app/components/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/app/components/Button";
import AmountInput from "@/app/components/inputs/AmountInput";
import { useRouter } from "expo-router";

export default function Target() {
  const [targetAmount, setTargetAmount] = useState("0");
const router = useRouter()
  return (
    <SafeAreaView className="flex-1 bg-primary-100 p-4">
      <ProgressBar currentStep={2} totalSteps={4} />
      <CustomText size="lg" weight="bold">
        Target amount
      </CustomText>
      <CustomText size="sm" secondary className="mt-1 mb-10">
        Set your target amount
      </CustomText>
      <CustomText size="lg" weight="bold">
        Amount
      </CustomText>
      <AmountInput
        value={targetAmount}
        onChange={setTargetAmount}
        placeholder="0"
      />
      <View className="flex-1" />
      <Button title="Continue" variant="primary" onPress={()=>router.push("/(root)/savings/timeline")}/>
    </SafeAreaView>
  );
}
