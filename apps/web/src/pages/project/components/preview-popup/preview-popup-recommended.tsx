import { DownloadMethodCard } from "~/components/bedrock/download-method-card/download-method-card";
import { CheckoutOptionGroupDto } from "~/lib/api";
import { useCreateStripeSession } from ".";

interface PreviewPopupRecommendedProps {
  categories: CheckoutOptionGroupDto[] | undefined;
}

export const PreviewPopupRecommended = ({ categories }: PreviewPopupRecommendedProps) => {
  const purchase = useCreateStripeSession();
  return categories?.[1]?.items
    .slice(1, 2)
    .map((item, index) => (
      <DownloadMethodCard
        key={index}
        buttonType="green"
        color="white"
        price={`${item.priceOption.price}€`}
        label={item.priceOption.label}
        title={`${item.priceOption.title} (Recommended, monthly)`}
        onClick={() => purchase(item.priceId)}
      />
    ));
};
