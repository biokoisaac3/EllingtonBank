import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/app/components/Button";
import { Country, PhoneInput } from "@/app/components/inputs/PhoneInput";
import InfoText from "@/app/components/InfoText";
import ProgressBar from "@/app/components/ProgressBar";
import CustomText from "@/app/components/CustomText";

const PhoneNumberScreen = () => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "NG",
    flag: "🇳🇬",
    dialCode: "+234",
    name: "Nigeria",
  });

  const countries: Country[] = [
    { code: "NG", flag: "🇳🇬", dialCode: "+234", name: "Nigeria" },
  ];

  
  const validatePhone = () => {
    const nigeriaRegex = /^[789]\d{9}$/;

    if (!nigeriaRegex.test(phoneNumber)) {
      setError("Enter a valid Nigerian phone number");
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (!validatePhone()) return;

    const fullPhone = `${selectedCountry.dialCode}${phoneNumber}`;

    router.push({
      pathname: "/(auth)/email-identity",
      params: { phone: fullPhone },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100 pt-4">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <StatusBar />

        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <ProgressBar currentStep={1} totalSteps={2} />

          <CustomText size="xxl" className="mb-10 mt-10">
            Enter your phone number
          </CustomText>

          <PhoneInput
            value={phoneNumber}
            countries={countries}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            error={error}
            disabled
            onChangeText={(text) => {
              const cleaned = text.replace(/\D/g, "").slice(0, 10);
              setPhoneNumber(cleaned);
              if (error) setError("");
            }}
          />
        </ScrollView>

        <View className="px-6 pb-2">
          <InfoText
            text="Already registered?"
            actionText="Login"
            onPress={() => router.push("/(auth)/login")}
          />

          <Button
            title="Continue"
            variant="primary"
            onPress={handleContinue}
            className="w-full mt-4 mb-4"
            disabled={phoneNumber.length !== 10}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
