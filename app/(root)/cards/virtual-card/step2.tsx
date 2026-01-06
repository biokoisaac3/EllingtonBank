// app/(root)/virtual-card/create/step2.tsx
import React, { useState } from "react";
import { View, Platform, ColorValue, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from "@/app/components/ProgressBar";
import CustomText from "@/app/components/CustomText";
import SelectableButton from "@/app/components/SelectableButton";
import Button from "@/app/components/Button";
import ConfirmationModal from "@/app/components/ConfirmationModal"; 
import {
  colorGradients,
  colorOptions,
  getBrandLogo,
  getCurrencySymbol,
} from "@/app/lib/utils";
import ColoredDot from "@/app/components/cards/ColoredDot";
import VirtualCardPreview from "@/app/components/VirtualCardPreview";

export default function VirtualCardCreateStep2() {
  const params = useLocalSearchParams();
  const { currency = "NGN", amount = "0", icon = "card-outline" } = params;
  const router = useRouter();
  const symbol = getCurrencySymbol(currency as string);
  const [selectedColor, setSelectedColor] = useState("gold");
  const [showModal, setShowModal] = useState(false);
  const gradientColors = colorGradients[selectedColor];
  const textColor = selectedColor === "white" ? "black" : "white";

  const handleRequestCard = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    router.push("/(root)/cards/virtual-card/authorize");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <View className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.select({ ios: "padding", android: "padding" })}
        >
          <View className="p-4 flex-1">
            <ProgressBar currentStep={2} totalSteps={2} />
            <CustomText size="xl" className="mb-10">
              Choose your design
            </CustomText>

            <VirtualCardPreview
              gradientColors={gradientColors}
              icon={icon as string}
              textColor={textColor as ColorValue}
              amount={amount as string}
              symbol={symbol}
            />
            <View className="mb-6">
              <CustomText size="lg" className="mb-3">
                Choose color
              </CustomText>
              <View className="flex-row gap-4 flex-wrap">
                {colorOptions.map((opt) => (
                  <SelectableButton
                    key={opt.value}
                    item={{
                      value: opt.value,
                      label: opt.label,
                      icon: (
                        <ColoredDot
                          gradient={opt.gradient}
                          selected={selectedColor === opt.value}
                        />
                      ),
                    }}
                    selected={selectedColor === opt.value}
                    onPress={setSelectedColor}
                  />
                ))}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <View className="p-4 bg-primary-100">
        <Button
          title="Request virtual card"
          variant="primary"
          onPress={handleRequestCard}
        />
      </View>

      <ConfirmationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="Confirmation"
        message="You are about to request for a virtual card"
      />
    </SafeAreaView>
  );
}
