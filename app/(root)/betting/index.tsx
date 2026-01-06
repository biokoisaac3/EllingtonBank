import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";

import Header from "@/app/components/header-back";
import Button from "@/app/components/Button";
import AmountInput from "@/app/components/inputs/AmountInput";
import TextInputField from "@/app/components/inputs/TextInputField";
import { Dropdown } from "@/app/components/inputs/DropdownInputs";
import BottomSheet from "@/app/components/BottomSheet";
import CustomText from "@/app/components/CustomText";

import { useAppDispatch } from "@/app/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/app/lib/hooks/useAppSelector";
import {
  getBillerProviders,
  getPackages,
  validateBillCustomer,
} from "@/app/lib/thunks/billsThunks";
import Loading from "@/app/components/Loading";

export default function BettingLotteryGaming() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const providers = useAppSelector((state) => state.bills.providers);
  const packages = useAppSelector((state) => state.bills.packages);
  const providersStatus = useAppSelector(
    (state) => state.bills.providersStatus
  );
  const packagesStatus = useAppSelector((state) => state.bills.packagesStatus);
  const errorFromStore = useAppSelector((state) => state.bills.error);

  const [selectedService, setSelectedService] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("100");

  const [contactsSheetVisible, setContactsSheetVisible] = useState(false);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const safeProviders = useMemo(() => providers ?? [], [providers]);
  const safePackages = useMemo(() => packages ?? [], [packages]);

  const isLoadingGlobal =
    providersStatus === "loading" || packagesStatus === "loading";

  useEffect(() => {
    dispatch(getBillerProviders({ type: "betting" })).catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    if (selectedService) {
      dispatch(getPackages({ slug: selectedService })).catch(() => {});
    }
  }, [selectedService, dispatch]);

  useEffect(() => {
    if (safeProviders.length && !selectedService) {
      setSelectedService(safeProviders[0].slug);
    }
  }, [safeProviders, selectedService]);

  useEffect(() => {
    if (safePackages.length && !selectedProduct) {
      setSelectedProduct(safePackages[0].slug);
    }
  }, [safePackages, selectedProduct]);

  const serviceOptions = useMemo(
    () =>
      safeProviders.map((p) => ({
        label: p.name,
        value: p.slug,
      })),
    [safeProviders]
  );

  const productOptions = useMemo(
    () =>
      safePackages.map((p) => ({
        label: p.name,
        value: p.slug,
      })),
    [safePackages]
  );

  const selectedProviderData = useMemo(
    () => safeProviders.find((p) => p.slug === selectedService),
    [safeProviders, selectedService]
  );

  const selectedPackageData = useMemo(
    () => safePackages.find((p) => p.slug === selectedProduct),
    [safePackages, selectedProduct]
  );

  const openContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") return;

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    if (data.length) {
      setContacts(data);
      setContactsSheetVisible(true);
    }
  };

  const selectContactNumber = (number: string) => {
    const cleaned = number.replace(/[^\d]/g, "");
    setCustomerId(cleaned);
    setContactsSheetVisible(false);
  };

  const isFormValid =
    customerId &&
    selectedService &&
    selectedProduct &&
    amount &&
    Number(amount) >= 100;

  const handleContinue = async () => {
    if (!selectedProviderData || !selectedPackageData || !isFormValid) return;

    try {
      setIsLoading(true);
      setError(null);

      const result = await dispatch(
        validateBillCustomer({
          customerId,
          productName: selectedPackageData.slug,
          billerSlug: selectedProviderData.slug,
        })
      ).unwrap();

      router.push({
        pathname: "/(root)/betting/confirm",
        params: {
          service: selectedService,
          product: selectedProduct,
          customerId,
          amount,
          providerId: String(selectedProviderData.id),
          providerName: selectedProviderData.name,
          providerSlug: selectedProviderData.slug,
          packageId: String(selectedPackageData.id),
          packageName: selectedPackageData.name,
          packageSlug: selectedPackageData.slug,
        },
      });
    } catch (err: any) {
      setError(err?.message || "Customer validation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <Header title="Betting, lottery and gaming" showClose showBack={false} />
      <Loading visible={isLoading || isLoadingGlobal} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1">
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="flex-1 p-4">
                {(error || errorFromStore) && (
                  <View className="bg-red-500/10 border border-red-500 rounded-lg p-3 mb-4">
                    <Text className="text-red-500 text-sm">
                      {error || errorFromStore}
                    </Text>
                  </View>
                )}

                <Dropdown
                  label="Select service item"
                  options={serviceOptions}
                  selectedValue={selectedService}
                  onSelect={setSelectedService}
                  searchable
                />

                <Dropdown
                  label="Select product"
                  options={productOptions}
                  selectedValue={selectedProduct}
                  onSelect={setSelectedProduct}
                  disabled={!selectedService || packagesStatus === "loading"}
                />

                <TextInputField
                  label="Customer ID"
                  value={customerId}
                  onChangeText={setCustomerId}
                  keyboardType="number-pad"
                  placeholder="Enter customer ID"
                  rightIcon={
                    <Ionicons name="person-circle" size={24} color="white" />
                  }
                  onRightIconPress={openContacts}
                />

                <AmountInput
                  value={amount}
                  onChange={setAmount}
                  placeholder="0"
                />

                <Text className="text-white/60 text-sm italic pl-1 mt-2 mb-6">
                  ❔ Enter an amount above ₦100
                </Text>

                <View className="mt-auto pb-4">
                  <Button
                    title="Continue"
                    variant="primary"
                    onPress={handleContinue}
                    disabled={!isFormValid || isLoading}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <BottomSheet
        visible={contactsSheetVisible}
        onClose={() => setContactsSheetVisible(false)}
        title="Select Contact"
        hideshowButton
      >
        {contacts
          .filter((c) => c.phoneNumbers?.length)
          .map((c, index) => {
            const number = c.phoneNumbers?.[0]?.number;
            if (!number) return null;

            return (
              <Pressable
                key={index}
                onPress={() => selectContactNumber(number)}
                className="py-3 border-b border-primary-400"
              >
                <CustomText>{c.name ?? "Unknown"}</CustomText>
                <CustomText secondary>{number}</CustomText>
              </Pressable>
            );
          })}
      </BottomSheet>
    </SafeAreaView>
  );
}
