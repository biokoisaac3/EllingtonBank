import React from "react";
import { Modal, View, TouchableOpacity, ScrollView } from "react-native";
import CustomText from "./CustomText";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { svgIcons } from "../assets/icons/icons";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  message?: string;
}

export default function ConfirmationModal({
  visible,
  onClose,
  onConfirm,
  children,
  title = "Confirmation",
  message = "Please confirm the action.",
  subTitle = "Please confirm",
}: ConfirmationModalProps) {
  const Pin = svgIcons.pin;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View
          className="bg-primary-100 rounded-t-3xl p-6 w-full relative"
          style={{ minHeight: "60%", maxHeight: "85%" }}
        >
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            className="absolute z-10 right-4 top-4 p-3 bg-primary-300 rounded-full"
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          <View className="mb-20">
            <CustomText size="xl" className="text-center">
              {title}
            </CustomText>
          </View>

          <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            showsVerticalScrollIndicator={false}
          >
            <View className="mb-6 items-center">
              <Pin width={80} height={80} />
            </View>

            <View className="mb-8 px-4">
              <CustomText size="xl" className="text-center ">
                {subTitle}
              </CustomText>
              {message ? (
                <CustomText className="text-center " secondary>
                  {message}
                </CustomText>
              ) : (
                children
              )}
            </View>
          </ScrollView>

          <View className="mb-6 px-4">
            <Button title="Confirm" variant="primary" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
