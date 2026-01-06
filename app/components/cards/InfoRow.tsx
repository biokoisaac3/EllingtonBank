import React from "react";
import { View } from "react-native";
import CustomText from "../CustomText";

interface InfoRowProps {
  label: string;
  icon: React.ReactNode;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, icon, value }) => {
  return (
    <View className="mb-4">
      <CustomText>{label}</CustomText>

      <View className="flex-row bg-primary-400 p-4 rounded-2xl items-center gap-4 border border-primary-300  ">
        {icon}
        <CustomText>{value}</CustomText>
      </View>
    </View>
  );
};

export default InfoRow;
