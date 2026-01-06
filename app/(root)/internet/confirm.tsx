import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { svgIcons } from "@/app/assets/icons/icons";
import Header from "@/app/components/header-back";
import AmountCard from "@/app/components/home/cards/AmountCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import PaymentInfoCard from "@/app/components/home/biils/PaymentInfoCard";
import TransferSummaryCard from "@/app/components/TransferSummaryCard";
import SenderCard from "@/app/components/home/cards/sender-card.tsx";
import ScheduleTransaction from "@/app/components/ScheduleTransaction";
import { dayOptions, frequencyOptions } from "@/app/lib/utils";
import Button from "@/app/components/Button";

export default function ConfirmInternetPayment() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const {
    accountId,
    amount,
    providerId,
    providerName,
    providerSlug,
    packageId,
    packageName,
    packageAmount,
    packageSlug
  } = params;

  const rawAmount = Array.isArray(amount)
    ? amount[0]
    : amount?.toString() || "0";
  const cleanedAmountString = rawAmount.replace(/[₦,\s]/g, "");
  const normalizedAmount = Number(cleanedAmountString);
  const finalAmount = isNaN(normalizedAmount) ? 0 : normalizedAmount;

  const serviceLabel = Array.isArray(providerName)
    ? providerName[0]
    : providerName || "Unknown Service";

  const accountIdStr = Array.isArray(accountId)
    ? accountId[0]
    : accountId || "";

  

  const fee = 0;
  const totalDebit = finalAmount + fee;

  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleName, setScheduleName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleContinue = () => {
    router.push({
      pathname: "/(root)/internet/authorize",
      params: {
        amount: rawAmount,
        accountId: accountIdStr,
        providerId,
        providerName,
        providerSlug,
        packageId,
        packageSlug,
        packageName,
        packageAmount,
        scheduleEnabled: scheduleEnabled.toString(),
        scheduleName,
        frequency,
        dayOfWeek,
        startDate,
        endDate,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <Header title="Confirm payment" showClose />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingTop: 24 }}
      >
        <AmountCard
          amount={rawAmount}
          description={`Payment to ${serviceLabel}`}
        />

        <PaymentInfoCard
          provider={serviceLabel}
          phone={accountIdStr}
          icon={svgIcons.chip}
        />

        <TransferSummaryCard
          amount={rawAmount}
          fee={fee}
          totalDebit={totalDebit}
        />

        <SenderCard />

        <ScheduleTransaction
          scheduleEnabled={scheduleEnabled}
          setScheduleEnabled={setScheduleEnabled}
          scheduleName={scheduleName}
          setScheduleName={setScheduleName}
          frequency={frequency}
          setFrequency={setFrequency}
          dayOfWeek={dayOfWeek}
          setDayOfWeek={setDayOfWeek}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          frequencyOptions={frequencyOptions}
          dayOptions={dayOptions}
        />

        <View className="mt-4">
          <Button title="Pay" variant="primary" onPress={handleContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
