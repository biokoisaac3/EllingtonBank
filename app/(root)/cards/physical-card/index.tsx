import React, { useState, useEffect } from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/app/components/Button";
import AmountInput from "@/app/components/inputs/AmountInput";
import ProgressBar from "@/app/components/ProgressBar";
import CustomText from "@/app/components/CustomText";
import TextInputField from "@/app/components/inputs/TextInputField";
import { svgIcons } from "@/app/assets/icons/icons";
import { useRouter } from "expo-router";
import {
  Dropdown,
  DropdownOption,
} from "@/app/components/inputs/DropdownInputs";
import { useAppSelector } from "@/app/lib/hooks/useAppSelector";
import SelectableButton from "@/app/components/SelectableButton";

export const brands = [
  {
    value: "mastercard",
    label: "Mastercard",
    icon: svgIcons.master_card,
    selected: true,
  },
  {
    value: "visa",
    label: "Visa",
    icon: svgIcons.visa,
    selected: false,
  },
  {
    value: "verve",
    label: "Verve",
    icon: svgIcons.verve,
    selected: false,
  },
];

const countries: DropdownOption[] = [{ value: "ng", label: "Nigeria" }];

const states: DropdownOption[] = [
  { value: "lagos", label: "Lagos" },
  { value: "adamawa", label: "Adamawa" },
];

const cities: DropdownOption[] = [
  { value: "ikeja", label: "Ikeja" },
  { value: "abuja", label: "Abuja" },
];

export default function PhysicalCardCreateStep1() {
  const [selectedBrand, setSelectedBrand] = useState("mastercard");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("ng");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setCountry(user.country_code?.toLowerCase() || "ng");
      setState(user.state?.toLowerCase() || "");
      setCity(user.city?.toLowerCase() || "");
      setAddress1(user.address_1 || "");
    }
  }, [user]);

  const handleChangeDetails = () => {
    setIsEditable(true);
  };

  const handleContinue = () => {
    const selectedBrandObj = brands.find((b) => b.value === selectedBrand);

    router.push({
      pathname: "/(root)/cards/physical-card/step2",
      params: {
        firstName,
        lastName,
        brand: selectedBrandObj?.value || "mastercard",
        country,
        state,
        city,
        address1,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <View className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.select({ ios: "padding", android: "padding" })}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <ProgressBar currentStep={1} totalSteps={2} />

            <CustomText size="xl" className="mb-10">
              Choose card type
            </CustomText>

            <TextInputField
              label="First name (BVN name)"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
              disabled={!isEditable}
            />

            <TextInputField
              label="Last name (BVN name)"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
              disabled={!isEditable}
            />

            <View className="mb-6">
              <CustomText size="lg">Select brand</CustomText>
              <View className="flex-row flex-wrap gap-4">
                {brands.map((brand) => {
                  const BrandIcon = brand.icon;
                  return (
                    <SelectableButton
                      key={brand.value}
                      item={{
                        value: brand.value,
                        label: brand.label,
                        icon: <BrandIcon width={24} height={24} />,
                      }}
                      selected={selectedBrand === brand.value}
                      onPress={() => setSelectedBrand(brand.value)}
                    />
                  );
                })}
              </View>
            </View>

            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-3">
                <CustomText size="lg">Billing address</CustomText>
                {!isEditable && (
                  <Pressable onPress={handleChangeDetails}>
                    <CustomText size="sm" className="text-accent-100 underline">
                      Change details
                    </CustomText>
                  </Pressable>
                )}
              </View>

              <Dropdown
                label="Country *"
                options={countries}
                selectedValue={country}
                onSelect={setCountry}
                disabled={!isEditable}
              />

              <View className="flex-row gap-4 mb-6">
                <View className="flex-1">
                  <Dropdown
                    label="State *"
                    placeholder="Select state"
                    options={states}
                    selectedValue={state}
                    onSelect={setState}
                    disabled={!isEditable}
                  />
                </View>
                <View className="flex-1">
                  <Dropdown
                    label="City *"
                    placeholder="Select city"
                    options={cities}
                    selectedValue={city}
                    onSelect={setCity}
                    disabled={!isEditable}
                  />
                </View>
              </View>

              <TextInputField
                label="Address 1"
                value={address1}
                onChangeText={setAddress1}
                placeholder="Enter address"
                disabled={!isEditable}
              />
            </View>
            <Button
              title="Continue"
              variant="primary"
              onPress={handleContinue}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
