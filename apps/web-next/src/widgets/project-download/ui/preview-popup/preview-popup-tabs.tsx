"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group/button-group";
import { CheckoutOptionGroupDto } from "@/shared/api/openapi";
import { SetStateAction } from "react";

interface PreviewPopupTabsProps {
  categories: CheckoutOptionGroupDto[] | undefined;
  selectedTimeframe: string | undefined;
  setSelectedTimeframe: (value: SetStateAction<string | undefined>) => void;
}

export const PreviewPopupTabs = ({
  categories,
  selectedTimeframe,
  setSelectedTimeframe,
}: PreviewPopupTabsProps) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <ButtonGroup>
      {categories.map((category, index) => (
        <Button
          key={index}
          type="dark"
          width="100%"
          height="auto"
          isClicked={selectedTimeframe === category.title}
          onClick={() => setSelectedTimeframe(category.title)}
          center
        >
          <BedrockText color="white" type="p" text={category.title} />
        </Button>
      ))}
    </ButtonGroup>
  );
};
