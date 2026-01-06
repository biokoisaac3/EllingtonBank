import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import icons from "@/app/assets/icons/icons";
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

export default function ConfirmBuyData() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const {
    provider,
    phone,
    amount,
    productName,
    billerSlug,
    bundle,
    validatedName,
  } = params;

  const rawAmount = Array.isArray(amount) ? amount[0] : amount ?? "0";
  const phoneStr = Array.isArray(phone) ? phone[0] : phone ?? "";
  const providerStr = Array.isArray(provider) ? provider[0] : provider ?? "";
  const validatedNameStr = Array.isArray(validatedName)
    ? validatedName[0]
    : validatedName || "";

  const numericAmount = Number(rawAmount);
  const fee = 0;
  const totalDebit = numericAmount + fee;

  const providerIcon = icons[providerStr as keyof typeof icons];

  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleName, setScheduleName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleContinue = () => {
    router.push({
      pathname: "/(root)/data/authorize",
      params: {
        amount: rawAmount,
        phone: phoneStr,
        provider: providerStr,
        productName,
        billerSlug,
        bundle,
        validatedName: validatedNameStr,
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
          description={`${productName || "Data bundle"}`}
        />

        <PaymentInfoCard
          provider={providerStr}
          phone={phoneStr}
          icon={providerIcon}
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
