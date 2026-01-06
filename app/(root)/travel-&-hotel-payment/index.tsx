import Button from "@/app/components/Button";
import Header from "@/app/components/header-back";
import AmountInput from "@/app/components/inputs/AmountInput";
import { Dropdown } from "@/app/components/inputs/DropdownInputs";
import TextInputField from "@/app/components/inputs/TextInputField";
import { travelProductOptions, travelServiceItems } from "@/app/lib/utils";
import { useRouter } from "expo-router";

import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TravelHotelPayment() {
  const [selectedService, setSelectedService] = useState("air_peace");
  const [selectedProduct, setSelectedProduct] = useState("domestic");
  const [paymentRefNumber, setPaymentRefNumber] = useState("783449430");
  const [amount, setAmount] = useState("5500");
  const router = useRouter();

  const handleContinue = () => {
    router.push({
      pathname: "/(root)/travel-&-hotel-payment/confirm",
      params: {
        service: selectedService,
        product: selectedProduct,
        paymentRef: paymentRefNumber,
        amount,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <Header title="Travel & hotel payment" showClose showBack={false} />

      <View className="flex-1 p-4">
        <Dropdown
          label="Select service item"
          placeholder="Select a service"
          options={travelServiceItems}
          selectedValue={selectedService}
          onSelect={setSelectedService}
          searchable
          searchPlaceholder="Search services..."
        />

        <Dropdown
          label="Select product"
          placeholder="Select product type"
          options={travelProductOptions}
          selectedValue={selectedProduct}
          onSelect={setSelectedProduct}
        />

        <TextInputField
          label="Enter payment ref number"
          value={paymentRefNumber}
          onChangeText={setPaymentRefNumber}
          keyboardType="default"
          placeholder="Enter payment ref number"
        />

        <AmountInput value={amount} onChange={setAmount} placeholder="0" />

        <Text className="text-white/60 text-sm italic pl-1 mt-2 mb-6">
          ❔ Enter an amount above ₦100
        </Text>

        <View className="mt-auto pb-4">
          <Button title="Continue" variant="primary" onPress={handleContinue} />
        </View>
      </View>
    </SafeAreaView>
  );
}
