"use client";

import { DownloadMethodCard } from "@/_components/download-method-card";
import { CheckoutOptionGroupDto } from "@/_lib/api";
import { createStripeSession } from "@/app/project/components/preview-popup/hooks/use-create-stripe-session";

interface PreviewPopupRecommendedProps {
  categories: CheckoutOptionGroupDto[] | undefined;
}

export const PreviewPopupRecommended = ({
  categories,
}: PreviewPopupRecommendedProps) =>
  categories?.[1]?.items
    .slice(1, 2)
    .map((item, index) => (
      <DownloadMethodCard
        key={index}
        buttonType="green"
        color="white"
        price={`${item.priceOption.price}€`}
        label={item.priceOption.label}
        title={`${item.priceOption.title} (Recommended, monthly)`}
        onClick={async () => await createStripeSession(item.priceId)}
      />
    ));
