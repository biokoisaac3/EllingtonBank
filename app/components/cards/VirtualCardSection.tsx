import React from "react";
import VirtualCardPreview from "@/app/components/VirtualCardPreview";

interface VirtualCardSectionProps {
  activeTab: string;
  showCardDetails: boolean;
}

const VirtualCardSection: React.FC<VirtualCardSectionProps> = ({
  activeTab,
  showCardDetails,
}) => {
  return (
    <VirtualCardPreview
      gradientColors={
        activeTab === "virtual"
          ? ["#1A1A1A", "#88894B"]
          : ["#181818", "#434343"]
      }
      icon={activeTab === "virtual" ? "visa" : "mastercard"}
      textColor="white"
      amount="12,500"
      symbol="₦"
      showDetails={showCardDetails}
    />
  );
};

export default VirtualCardSection;
