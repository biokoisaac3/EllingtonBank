import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Pressable,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import CustomText from "./CustomText";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  title?: string;
  buttonText?: string;
  hideshowButton?: boolean;
  showConfirmButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
}

const { height: screenHeight } = Dimensions.get("window");

const CloseIcon = () => <Ionicons name="close" size={24} color="#FFF" />;

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  onConfirm,
  children,
  title,
  buttonText = "Close",
  hideshowButton = false,
  showConfirmButton = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onCancel,
}) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleButtonPress = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const renderButtons = () => {
    if (hideshowButton) return null;

    if (showConfirmButton) {
      return (
        <View className="flex-row justify-between mt-10 mb-10">
          <Button
            title={cancelText}
            onPress={handleCancel}
            variant="secondary"
            className="flex-1 mr-2"
          />
          <Button
            title={confirmText}
            onPress={onConfirm}
            variant="primary"
            className="flex-1 ml-2"
          />
        </View>
      );
    }

    return (
      <Button
        title={buttonText}
        onPress={handleButtonPress}
        className="mt-10 mb-10"
        variant="primary"
      />
    );
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <Pressable
        onPress={onClose}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
      />
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: screenHeight * 1,
          transform: [{ translateY: slideAnim }],
          backgroundColor: "#3F401B",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <View
            style={{ padding: 24 }}
            onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
          >
            <View style={{ marginBottom: 16 }}>
              {title && (
                <CustomText
                  size="xl"
                  weight="bold"
                  style={{ textAlign: "center" }}
                >
                  {title}
                </CustomText>
              )}
              <Pressable
                onPress={onClose}
                style={{
                  position: "absolute",
                  right: 0,
                  top: -10,
                  padding: 8,
                  backgroundColor: "#4F5132",
                  borderRadius: 50,
                }}
              >
                <CloseIcon />
              </Pressable>
            </View>

            <ScrollView
              style={{ maxHeight: screenHeight * 0.7 }}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
            >
              {children}
            </ScrollView>

            {renderButtons()}
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
