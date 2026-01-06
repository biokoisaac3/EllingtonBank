import React, { useState } from "react";
import { View } from "react-native";
import ProgressBar from "@/app/components/ProgressBar";
import CustomText from "@/app/components/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/app/components/Button";
import { svgIcons } from "@/app/assets/icons/icons";
import TextInputField from "@/app/components/inputs/TextInputField";
import { useRouter } from "expo-router";

export default function Index() {
  const [planName, setPlanName] = useState("December Goal");
const router = useRouter()
  return (
    <SafeAreaView className="flex-1 bg-primary-100 p-4">
      <ProgressBar currentStep={1} totalSteps={4} />
      <CustomText size="lg" weight="bold">
        Name your plan
      </CustomText>
      <CustomText size="sm" secondary className="mt-1">
        Give your savings plan a meaningful name
      </CustomText>
      <TextInputField
        label="Plan name"
        value={planName}
        onChangeText={setPlanName}
        placeholder="Plan name"
      />
      <CustomText size="sm" secondary >
         A descriptive name makes savings interesting
      </CustomText>
      <View className="flex-1" />
      <CustomText size="sm" weight="bold" className="mb-2">
        Basic savings
      </CustomText>
      <CustomText size="sm" secondary className="mb-4">
        Your regular savings with no interest, you can withdraw anytime with no
        charges
      </CustomText>
      <View className="mb-4 bg-primary-400 rounded-2xl p-4">
        <View className="flex-row gap-4 items-center border-b border-primary-300 py-4 ">
          <svgIcons.fixed_savings width={24} height={24} />
          <CustomText size="sm">Savings with minimum of 3 months</CustomText>
        </View>
        <View className="flex-row gap-4 items-center border-b border-primary-300 py-4 ">
          <svgIcons.basic_savings width={24} height={24} />
          <CustomText size="sm">
            Get to save for long terms goals (Allowances, family, business,
            vacation) etc.
          </CustomText>
        </View>
        <View className="flex-row gap-4 items-center  py-4 ">
          <svgIcons.fixed_savings width={24} height={24}  />
          <CustomText size="sm">Earn amazing returns</CustomText>
        </View>
      </View>
      <Button title="Continue" variant="primary" onPress={()=>router.push("/(root)/savings/target")}/>
    </SafeAreaView>
  );
}
