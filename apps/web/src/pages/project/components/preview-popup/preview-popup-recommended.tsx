import { DownloadMethodCard } from "~/components/bedrock/download-method-card/download-method-card";
import { CheckoutOptionGroupDto } from "~/lib/api";

interface PreviewPopupRecommendedProps {
  categories: CheckoutOptionGroupDto[] | undefined;
  purchase: (priceId: string) => Promise<void>;
}

export const PreviewPopupRecommended = ({ categories, purchase }: PreviewPopupRecommendedProps) =>
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
        onClick={() => purchase(item.priceId)}
      />
    ));
