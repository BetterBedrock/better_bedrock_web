"use client";

import { createStripeSession } from "@/pages/project/model/use-create-stripe-session";
import { DownloadMethodCard } from "@/pages/project/ui/project-download/download-method-card";
import { CheckoutOptionGroupDto } from "@/shared/lib/openapi";

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
