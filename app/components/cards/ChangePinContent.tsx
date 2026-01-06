import React, { useState } from "react";
import { View, Pressable } from "react-native";
import CustomText from "../CustomText";

interface ChnagePinProps {
  onContinue: (reason: string) => void;
}

const reasons = [
  { id: "stolen", label: "My card was stolen" },
  { id: "damaged", label: "Damaged" },
  { id: "fraudulent", label: "Fraudulent issues" },
  { id: "suspicious", label: "Suspicious activity" },
];

const ChangePin: React.FC<ChnagePinProps> = ({ onContinue }) => {
  const [selectedReason, setSelectedReason] = useState<string>("");

  return (
    <View className="space-y-4">
      <View>
        <CustomText size="sm" weight="medium" className="mb-4">
          Why are you blocking your card
        </CustomText>
      </View>
      <View className="space-y-3 mb-6 flex-row gap-4 flex-wrap ">
        {reasons.map((reason) => (
          <Pressable
            key={reason.id}
            onPress={() => setSelectedReason(reason.id)}
            className={`p-4 px-6 rounded-xl bg-primary-400    ${
              selectedReason === reason.id
                ? "border-primary-500 border "
                : " border-primary-1300"
            }`}
          >
            <CustomText
              size="sm"
              weight={selectedReason === reason.id ? "medium" : "regular"}
            >
              {reason.label}
            </CustomText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ChangePin;
