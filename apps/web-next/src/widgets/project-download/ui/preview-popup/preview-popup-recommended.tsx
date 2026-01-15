"use client";

import { CheckoutOptionGroupDto } from "@/shared/api/openapi";
import { createStripeSession } from "@/widgets/project-download/model/use-create-stripe-session";
import { DownloadMethodCard } from "@/widgets/project-download/ui/download-method-card";

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
