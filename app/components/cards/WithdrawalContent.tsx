import React from "react";
import { View } from "react-native";
import CustomText from "../CustomText";
import AmountInput from "../inputs/AmountInput";
import { svgIcons } from "@/app/assets/icons/icons";
import BalanceInfoCard from "../home/BalanceInfo";

interface WithdrawalContentProps {
  amount: string;
  setAmount: (value: string) => void;
}

const WithdrawalContent: React.FC<WithdrawalContentProps> = ({
  amount,
  setAmount,
}) => (
  <View className="space-y-4 bg-primary-100">
    <View>
      <BalanceInfoCard
        title="Wallet Balance"
        balance="₦50,500.00"
        icon={svgIcons.wallet}
      />
    </View>
    <View>
      <CustomText size="sm" weight="medium" className="mb-4">
        Enter amount
      </CustomText>
      <AmountInput value={amount} onChange={setAmount} placeholder="0" />
     
      <CustomText secondary size="sm" weight="medium" className="mb-20 mt-4">
        ❔ Enter an amount above ₦100
      </CustomText>
    </View>
  </View>
);

export default WithdrawalContent;
