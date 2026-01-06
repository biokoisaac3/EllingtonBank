import React from "react";
import Header from "@/app/components/header-back";

interface CardHeaderProps {
  title: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
  return <Header title={title} showBack={false} />;
};

export default CardHeader;
