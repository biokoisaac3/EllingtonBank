import React, { useState } from "react";
import { View } from "react-native";
import { svgIcons } from "@/app/assets/icons/icons";
import InfoRow from "./InfoRow";
import FreezeCardToggle from "./FreezeCardToggle";

const {
  zip_code: ZipCode,
  name: Name,
  billing_address: BillingAddress,
  card_number: CardNumber,
  expiry_date: ExpiryDate,
  security_code: SecurityCode,
} = svgIcons;

const MoreInfoContent: React.FC = () => {
  const [isFrozen, setIsFrozen] = useState(false);

  return (
    <View className="space-y-4 bg-primary-100">
      <InfoRow
        label="Name on card"
        value="Sarah Joe"
        icon={<Name width={20} height={20} />}
      />

      <InfoRow
        label="Card number"
        value="2345 6768 6868 9087"
        icon={<CardNumber width={20} height={20} />}
      />

      <View className="flex-row gap-4">
        <View className="flex-1">
          <InfoRow
            label="Expiry date"
            value="09/29"
            icon={<ExpiryDate width={20} height={20} />}
          />
        </View>

        <View className="flex-1">
          <InfoRow
            label="Security code"
            value="611"
            icon={<SecurityCode width={20} height={20} />}
          />
        </View>
      </View>

      <InfoRow
        label="Billing address"
        value="Sarah Joe"
        icon={<BillingAddress width={20} height={20} />}
      />

      <InfoRow
        label="Zip code"
        value="1000213"
        icon={<ZipCode width={20} height={20} />}
      />

      <FreezeCardToggle value={isFrozen} onChange={setIsFrozen} />
    </View>
  );
};

export default MoreInfoContent;
