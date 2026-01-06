import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ProgressBar from "@/app/components/ProgressBar";
import CustomText from "@/app/components/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/app/components/Button";
import { Ionicons } from "@expo/vector-icons";
import TextInputField from "@/app/components/inputs/TextInputField";
import { useRouter } from "expo-router";

const frequencies = [
  { key: "once", label: "Once" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
] as const;

const durations = [
  { key: "3m", label: "3 months", days: "90 days" },
  { key: "6m", label: "6 months", days: "180 days" },
  { key: "9m", label: "9 months", days: "270 days" },
  { key: "1y", label: "1 year", days: "365 days" },
] as const;

type FrequencyKey = (typeof frequencies)[number]["key"];
type DurationKey = (typeof durations)[number]["key"];

export default function Timeline() {
  const [frequency, setFrequency] = useState<FrequencyKey>("weekly");
  const [duration, setDuration] = useState<DurationKey>("3m");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ProgressBar currentStep={3} totalSteps={4} />

          <CustomText size="lg" weight="bold">
            Set your timeline
          </CustomText>
          <CustomText size="sm" secondary className="mt-1 mb-10">
            Choose how long you want to save
          </CustomText>

          <CustomText size="lg" weight="bold" className="mb-4">
            How often do you want to save?
          </CustomText>

          <View className="flex-row mb-8 flex-wrap gap-4">
            {frequencies.map((freq) => {
              const showDropdown =
                freq.key === "weekly" || freq.key === "monthly";

              return (
                <Pressable
                  key={freq.key}
                  onPress={() => setFrequency(freq.key)}
                  className={`flex-row items-center gap-2 p-4 px-6 rounded-xl ${
                    frequency === freq.key ? "bg-primary-300" : "bg-primary-400"
                  }`}
                >
                  <CustomText size="sm">{freq.label}</CustomText>
                  {showDropdown && (
                    <Ionicons name="chevron-down" size={16} color="#fff" />
                  )}
                </Pressable>
              );
            })}
          </View>

          <CustomText size="lg" weight="bold" className="mb-4">
            How long do you want to save?
          </CustomText>

          <View className="flex-row flex-wrap gap-4 justify-center mb-4">
            {durations.map((dur) => (
              <Pressable
                key={dur.key}
                onPress={() => setDuration(dur.key)}
                className={`p-4 px-16 rounded-xl ${
                  duration === dur.key ? "bg-primary-300" : "bg-primary-400"
                }`}
              >
                <CustomText size="sm" weight="bold">
                  {dur.label}
                </CustomText>
                <CustomText size="xs" secondary>
                  {dur.days}
                </CustomText>
              </Pressable>
            ))}
          </View>

          {/* Custom Duration */}
          <CustomText size="sm" className="mb-4" secondary>
            Let me decide
          </CustomText>

          <TextInputField
            label="Start date duration"
            value={startDate}
            onChangeText={setStartDate}
            placeholder="Custom duration"
          />

          {/* End Date Input */}
          <TextInputField
            label="End date"
            value={endDate}
            onChangeText={setEndDate}
            placeholder="Custom duration"
          />

          <View className="flex-1 mt-4" />
          <Button
            title="Continue"
            variant="primary"
            onPress={() => router.push("/")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
