import React from "react";
import { View, Pressable } from "react-native";
import CustomText from "../CustomText";
import AmountInput from "../inputs/AmountInput";
import { svgIcons } from "@/app/assets/icons/icons";

interface FundWalletContentProps {
  amount: string;
  setAmount: (value: string) => void;
  onSelectSource?: (type: string) => void;
}

const WithdrawalIcon = svgIcons.withdrawal;
const MasterCardIcon = svgIcons.master_card;
const PlusIcon = svgIcons.plus;

const FundWalletContent: React.FC<FundWalletContentProps> = ({
  amount,
  setAmount,
  onSelectSource,
}) => {
  return (
    <View className="space-y-6 bg-primary-100 ">
      <View>
        <CustomText size="sm" weight="medium" className="mb-3">
          Enter amount
        </CustomText>

        <AmountInput value={amount} onChange={setAmount} placeholder="0" />

        <CustomText
          secondary
          size="sm"
          weight="medium"
          className="mt-3 mb-6 flex-row items-center"
        >
          ❔ Enter an amount above ₦100
        </CustomText>

        <CustomText secondary size="sm" weight="medium">
          Choose source
        </CustomText>
      </View>

      <Pressable
        onPress={() => onSelectSource?.("wallet")}
        className="rounded-xl border border-[#88894B] p-4 flex-row items-center space-x-4 bg-primary-100"
      >
        <View className="w-12 h-12 rounded-full bg-primary-200 items-center justify-center mr-4">
          <WithdrawalIcon width={28} height={28} />
        </View>

        <View className="flex-1">
          <CustomText weight="medium" secondary>Sarah John • 5372915793</CustomText>
          <CustomText size="lg" weight="bold" >
            ₦5,836,721.06
          </CustomText>
        </View>
      </Pressable>

      <Pressable
        onPress={() => onSelectSource?.("debit")}
        className="rounded-xl bg-primary-400 p-4 flex-row items-center space-x-4 mt-4"
      >
        <View className="w-12 h-12 gap-4 rounded-full items-center justify-center bg-primary-300 mr-4">
          <MasterCardIcon width={24} height={24} />
        </View>

        <View className="flex-1">
          <CustomText weight="medium" secondary>Debit Card</CustomText>
          <CustomText className="mt-1">
            9315 **** **** ****
          </CustomText>
        </View>
      </Pressable>

      <Pressable
        onPress={() => onSelectSource?.("new-card")}
        className="rounded-xl bg-primary-400 py-5 items-center flex-row justify-center gap-2 mt-4"
      >
        <PlusIcon width={16} height={16} />
        <CustomText weight="medium">New Card</CustomText>
      </Pressable>
    </View>
  );
};

export default FundWalletContent;
