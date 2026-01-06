import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Dropdown,
  DropdownOption,
} from "@/app/components/inputs/DropdownInputs";
import TextInputField from "@/app/components/inputs/TextInputField";
import SenderCard from "@/app/components/home/cards/sender-card.tsx";
import Loading from "@/app/components/Loading";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/app/components/header-back";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/lib/store";
import {
  fetchBeneficiaries,
  type Beneficiary as ApiBeneficiary,
} from "@/app/lib/thunks/beneficiaryThunks";
import {
  validateEllingtonAccount,
  fetchBanks,
} from "@/app/lib/thunks/accountThunks";
import { clearValidation } from "@/app/lib/slices/accountSlice";

interface Beneficiary {
  id: number;
  name: string;
  bank: string;
  accountNumber: string;
}

const mapApiBeneficiary = (
  apiBen: ApiBeneficiary,
  id: number
): Beneficiary => ({
  id,
  name: apiBen.account_name,
  bank: apiBen.bank_name,
  accountNumber: apiBen.account_number,
});

export default function TransferScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<Beneficiary | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const beneficiariesData = useSelector(
    (state: RootState) => state.beneficiaries.beneficiaries
  );
  const isFetching = useSelector(
    (state: RootState) => state.beneficiaries.isLoading
  );
  const beneficiariesError = useSelector(
    (state: RootState) => state.beneficiaries.error
  );

  const validationResult = useSelector(
    (state: RootState) => state.accounts.validationResult
  );
  const accountsLoading = useSelector(
    (state: RootState) => state.accounts.isLoading
  );
  const accountsError = useSelector((state: RootState) => state.accounts.error);
  const banks = useSelector((state: RootState) => state.accounts.banks);

  const beneficiaries: Beneficiary[] = React.useMemo(() => {
    if (!beneficiariesData) return [];
    return beneficiariesData.map((b, i) => mapApiBeneficiary(b, i + 1));
  }, [beneficiariesData]);

  useEffect(() => {
    dispatch(clearValidation());
    setAccountNumber("");
    dispatch(fetchBeneficiaries());
    dispatch(fetchBanks());
  }, [dispatch]);

  useEffect(() => {
    if (accountNumber.length === 10) {
      dispatch(validateEllingtonAccount({ accountNumber }));
    } else {
      dispatch(clearValidation());
    }
  }, [accountNumber, dispatch]);

  const filteredBeneficiaries = beneficiaries.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bankOptions: DropdownOption[] = banks
    ? banks.map((bank) => ({
        value: bank.name,
        label: bank.name,
      }))
    : [];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 2 && filteredBeneficiaries.length === 0) {
      setSearchNotFound(true);
    } else {
      setSearchNotFound(false);
    }
  };

  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setAccountNumber(beneficiary.accountNumber);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const selectedBankObj = banks?.find((b) => b.name === beneficiary.bank);
      const bankCode = selectedBankObj?.code || "";
      router.push({
        pathname: "/(root)/transfer/details",
        params: {
          accountNumber: beneficiary.accountNumber,
          bank: beneficiary.bank,
          bankCode,
          beneficiary: JSON.stringify(beneficiary),
        },
      });
    }, 1500);
  };

  const handleValidatedSelect = () => {
    if (validationResult) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const ellintonBank = banks?.find((b) => b.name === "Ellington Bank");
        const bankCode = ellintonBank?.code || "";
        router.push({
          pathname: "/(root)/transfer/details",
          params: {
            accountNumber,
            bank: "Ellington Bank",
            bankCode,
            accountName: validationResult.accountName,
          },
        });
      }, 1500);
    }
  };

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    console.log(bank);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const selectedBankObj = banks?.find((b) => b.name === bank);
      const bankCode = selectedBankObj?.code || "";
      router.push({
        pathname: "/(root)/transfer/details",
        params: {
          accountNumber,
          bank,
          bankCode,
        },
      });
    }, 1500);
  };

  const handleRetryBeneficiaries = () => {
    dispatch(fetchBeneficiaries());
  };

  return (
    <SafeAreaView className="flex-1 bg-[#3d3d1f] px24">
      <StatusBar barStyle="light-content" />
      <Loading visible={loading} />

      <Header title=" Transfer" showCancel />

      <ScrollView
        className="flex-1 px-4 py-6"
        showsVerticalScrollIndicator={false}
      >
        <SenderCard />

        <TextInputField
          label="Receiver account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="0000000000"
          keyboardType="number-pad"
          maxLength={10}
          placeholderTextColor="rgba(255,255,255,0.3)"
        />

        {accountNumber.length === 10 && (
          <View className="mb-6">
            {accountsLoading ? (
              <View className="items-center py-4">
                <ActivityIndicator size="small" color="#fff" />
                <Text className="text-white/50 mt-2">
                  Validating account...
                </Text>
              </View>
            ) : validationResult?.accountNumber === accountNumber ? (
              <TouchableOpacity
                onPress={handleValidatedSelect}
                className="bg-[#4a4a28] rounded-3xl p-5 flex-row items-center justify-between mb-3"
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-xl bg-[#5a5a35]/50 items-center justify-center">
                    <MaterialIcons
                      name="account-balance"
                      size={20}
                      color="rgba(255,255,255,0.7)"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-white text-base mb-1">
                      {validationResult.accountName}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-sm text-white/60">
                        Ellington Bank
                      </Text>
                      <Text className="text-sm text-white/60 mx-2">•</Text>
                      <Text className="text-sm text-white/60">
                        {accountNumber}
                      </Text>
                    </View>
                  </View>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(255,255,255,0.5)"
                />
              </TouchableOpacity>
            ) : (
              <View className="mb-4">
                {!banks ? (
                  <View className="items-center py-4">
                    <ActivityIndicator size="small" color="#fff" />
                    <Text className="text-white/50 mt-2">Loading banks...</Text>
                  </View>
                ) : (
                  <Dropdown
                    label="Bank"
                    options={bankOptions}
                    selectedValue={selectedBank}
                    onSelect={handleBankSelect}
                    placeholder="Select a bank"
                    searchable={true}
                    searchPlaceholder="Search banks..."
                  />
                )}
              </View>
            )}
          </View>
        )}

        {accountNumber.length < 10 && (
          <View className="mb-6">
            <Text className="text-sm text-white/90 mb-3">Beneficiaries</Text>

            {isFetching ? (
              <View className="items-center py-12">
                <ActivityIndicator size="small" color="#fff" />
                <Text className="text-white/50 mt-2">
                  Loading beneficiaries...
                </Text>
              </View>
            ) : beneficiariesError ? (
              <View className="items-center py-12">
                <Text className="text-red-300 mb-2 text-center">
                  {beneficiariesError}
                </Text>
                <TouchableOpacity
                  onPress={handleRetryBeneficiaries}
                  className="bg-[#4a4a28] px-6 py-3 rounded-2xl"
                >
                  <Text className="text-white font-medium">Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View className="relative mb-4">
                  <Ionicons
                    name="search"
                    size={20}
                    color="rgba(255,255,255,0.4)"
                    style={{ position: "absolute", left: 16, top: 18 }}
                  />
                  <TextInput
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    placeholder="john.doe@m"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    className="w-full bg-[#4a4a28] text-white rounded-3xl pl-12 pr-5 py-5"
                  />
                </View>

                {searchNotFound && (
                  <View className="items-center justify-center py-12">
                    <View className="w-24 h-24 rounded-full bg-white/5 items-center justify-center mb-4">
                      <Ionicons
                        name="search"
                        size={40}
                        color="rgba(255,255,255,0.3)"
                      />
                    </View>

                    <Text className="font-medium text-white mb-1">
                      Unable to find "{searchQuery}"
                    </Text>
                    <Text className="text-sm text-white/50 text-center">
                      Please check your spelling, or try a different {"\n"}
                      account to get a different result.
                    </Text>
                  </View>
                )}

                {!searchNotFound && (
                  <View>
                    {filteredBeneficiaries.length > 0 ? (
                      filteredBeneficiaries.map((beneficiary) => (
                        <TouchableOpacity
                          key={beneficiary.id}
                          onPress={() => handleBeneficiarySelect(beneficiary)}
                          className="bg-[#4a4a28] rounded-3xl p-5 flex-row items-center justify-between mb-3"
                        >
                          <View className="flex-1">
                            <Text className="font-semibold text-white text-base mb-1">
                              {beneficiary.name}
                            </Text>
                            <View className="flex-row items-center">
                              <Text className="text-sm text-white/60">
                                {beneficiary.bank}
                              </Text>
                              <Text className="text-sm text-white/60 mx-2">
                                •
                              </Text>
                              <Text className="text-sm text-white/60">
                                {beneficiary.accountNumber}
                              </Text>
                            </View>
                          </View>

                          <TouchableOpacity className="w-12 h-12 rounded-2xl bg-[#5a5a35] items-center justify-center ml-3">
                            <MaterialIcons
                              name="delete-outline"
                              size={22}
                              color="white"
                            />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text className="text-sm text-white/50 text-center py-12">
                        No beneficiaries found. Add one to get started.
                      </Text>
                    )}
                  </View>
                )}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
