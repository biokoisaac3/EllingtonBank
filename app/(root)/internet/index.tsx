import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "@/app/components/header-back";
import Button from "@/app/components/Button";
import TextInputField from "@/app/components/inputs/TextInputField";
import { Dropdown } from "@/app/components/inputs/DropdownInputs";
import BundleCard from "@/app/components/home/biils/BundleCard";
import Loading from "@/app/components/Loading";

import { useAppDispatch } from "@/app/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/app/lib/hooks/useAppSelector";
import {
  getBillerProviders,
  getPackages,
  validateBillCustomer,
} from "@/app/lib/thunks/billsThunks";

export default function InternetServicesPayment() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const providers = useAppSelector((state) => state.bills.providers);
  const packages = useAppSelector((state) => state.bills.packages);
  const providersStatus = useAppSelector(
    (state) => state.bills.providersStatus
  );
  const packagesStatus = useAppSelector((state) => state.bills.packagesStatus);
  const error = useAppSelector((state) => state.bills.error);

  const [selectedService, setSelectedService] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [accountId, setAccountId] = useState("");
  const [validating, setValidating] = useState(false);


  const safeProviders = useMemo(() => providers ?? [], [providers]);
  const safePackages = useMemo(() => packages ?? [], [packages]);

  const isLoading =
    providersStatus === "loading" || packagesStatus === "loading";

  useEffect(() => {
    dispatch(getBillerProviders({ type: "internet" })).catch(() => {});
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

  const amount = useMemo(() => {
    if (selectedPackageData?.amount) {
      return String(selectedPackageData.amount);
    }
    return "0";
  }, [selectedPackageData]);

  const handleContinue = async () => {
    if (!selectedProviderData || !selectedPackageData || !accountId) return;

    setValidating(true);
    try {
      await dispatch(
        validateBillCustomer({
          customerId: accountId,
          productName: selectedPackageData.slug,
          billerSlug: selectedProviderData.slug,
        })
      ).unwrap(); 

      router.push({
        pathname: "/(root)/internet/confirm",
        params: {
          service: selectedService,
          product: selectedProduct,
          accountId,
          amount,
          providerId: String(selectedProviderData.id),
          providerName: selectedProviderData.name,
          providerSlug: selectedProviderData.slug,
          packageId: String(selectedPackageData.id),
          packageName: selectedPackageData.name,
          packageSlug: selectedPackageData.slug,
        },
      });
    } catch (error) {
    } finally {
      setValidating(false);
    }
  };


  const isFormValid =
    accountId &&
    selectedService &&
    selectedProduct &&
    amount &&
    Number(amount) >= 100;

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <Header title="Internet services" showClose showBack={false} />
      <Loading visible={isLoading} />

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
                {error && (
                  <View className="bg-red-500/10 border border-red-500 rounded-lg p-3 mb-4">
                    <Text className="text-red-500 text-sm">{error}</Text>
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
                  label="Enter Account ID/User ID"
                  value={accountId}
                  onChangeText={setAccountId}
                  keyboardType="default"
                  placeholder="Enter Account ID/User ID"
                />

                {selectedPackageData?.amount && (
                  <BundleCard price={String(selectedPackageData.amount)} />
                )}

                <Text className="text-white/60 text-sm italic pl-1 mt-2 mb-6">
                  ❔ Select a bundle above ₦100
                </Text>

                <View className="mt-auto pb-4">
                  <Button
                    title="Continue"
                    variant="primary"
                    onPress={handleContinue}
                    disabled={!isFormValid}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
