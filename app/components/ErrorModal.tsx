import React from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import Button from "./Button";

const { width } = Dimensions.get("window");

interface ErrorModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  onDismiss: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  visible,
  title = "Account creation Error",
  message = "We could not complete your registration, give it another shot",
  onDismiss,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-5">
        <View className="bg-primary-400 rounded-2xl p-6 items-center w-[90%] max-w-80 shadow-lg">
          <View className="mb-4">
            <View className="bg-red-600 w-14 h-14 rounded-full justify-center items-center">
              <Text className="text-white text-2xl font-bold">×</Text>
            </View>
          </View>

          <Text className="text-white text-xl font-bold text-center mb-2">
            {title}
          </Text>

          <Text className="text-white text-base text-center leading-6 mb-6">
            {message}
          </Text>

        
          <Button title=" Try again" onPress={onDismiss} variant="primary"/>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
