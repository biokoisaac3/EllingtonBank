import { View, Text, Image } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import Button from "../Button";
import { svgIcons } from "@/app/assets/icons/icons";
import { useRouter } from "expo-router";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

const steps: Step[] = [
  {
    icon: <svgIcons.evelop width={24} height={24} fill="#FFFFFF" />,
    title: "Request received",
    description: "We got your card request",
    date: "20, May 2021",
    completed: true,
  },
  {
    icon: <svgIcons.process width={24} height={24} fill="#FFFFFF" />,
    title: "Order processing",
    description: "We are processing your card",
    date: "20, May 2021",
    completed: true,
  },
  {
    icon: <svgIcons.print width={24} height={24} fill="#FFFFFF" />,
    title: "Printing card",
    description: "Your card is being printed",
    date: "20, May 2021",
    completed: true,
  },
  {
    icon: <svgIcons.box width={24} height={24} fill="#FFFFFF" />,
    title: "Ready for delivery",
    description: "Your card is ready for delivery",
    date: "",
    completed: true,
  },
  {
    icon: <svgIcons.shipping width={24} height={24} fill="#FFFFFF" />,
    title: "Card sent for delivery",
    description:
      "Your card has been sent for delivery. It may take longer than usual depending on location",
    date: "",
    completed: true,
  },
];

const CardActivation = ({
  cardImage,
  selectedColor,
}: {
  cardImage: any;
  selectedColor?: string;
}) => {
  const router = useRouter();
  return (
    <View className="flex-1 space-y-6">
      <CustomText size="xl" weight="bold" className="text-center">
        Track your physical card
      </CustomText>
      <View className="bg-primary-400 flex-row items-center gap-4 p-6 rounded-2xl mb-4">
        <Image
          source={cardImage}
          style={{
            width: "20%",
            height: 50,
            resizeMode: "contain",
          }}
        />
        <View>
          <CustomText>Sarah John</CustomText>
          <CustomText secondary>
            Delivering to 123 street, Ikeja, Lagos
          </CustomText>
        </View>
      </View>

      <View className="flex-1 space-y-6 bg-primary-400 rounded-2xl p-6 mb-4">
        {steps.map((step, index) => (
          <View key={index} className="flex-row items-start">
            <View className="mr-4">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center bg-primary-500`}
              >
                {step.icon}
              </View>
              {index < steps.length - 1 && (
                <View className="w-0.5 h-16 bg-primary-500 self-center mt-2" />
              )}
            </View>
            <View className="flex-1">
              <CustomText weight="medium">{step.title}</CustomText>
              <CustomText secondary>{step.description}</CustomText>
              {step.date && (
                <CustomText size="sm" secondary>
                  {step.date}
                </CustomText>
              )}
            </View>
          </View>
        ))}
      </View>

      <Button
        title="Activate card"
        variant="primary"
        onPress={() =>
          router.push({
            pathname: "/(root)/cards/physical-card/activate/defult",
            params: { selectedColor },
          })
        }
      />
    </View>
  );
};

export default CardActivation;
