"use client";

import { ButtonGroup } from "@/shared/ui/button-group";
import { Link } from "@/shared/ui/link";
import { CheckoutOptionGroupDto } from "@/shared/lib/openapi";

import styles from "./preview-popup-plans.module.scss";
import { usePreviewPopupPlans } from "@/pages/project/model/use-preview-popup-plans";
import { DownloadMethodCard } from "@/pages/project/ui/project-download/download-method-card";
import { createStripeSession } from "@/pages/project/model/use-create-stripe-session";

interface PreviewPopupPlansListProps {
  categories: CheckoutOptionGroupDto[] | undefined;
  selectedTimeframe: string | undefined;
  download: () => Promise<void>;
  getLinkvertiseId: () => Promise<string>;
}

export const PreviewPopupPlansList = ({
  categories,
  selectedTimeframe,
  download,
  getLinkvertiseId,
}: PreviewPopupPlansListProps) => {
  const { linkUrl } = usePreviewPopupPlans({ getLinkvertiseId });

  return (
    <ButtonGroup direction="vertical" className={styles.group}>
      {categories
        ?.find((category) => category.title === selectedTimeframe)
        ?.items.map((item, index) => (
          <DownloadMethodCard
            key={index}
            buttonType={item.priceOption.featured ? "gold" : "white"} // instead of green make it gold - use latest 9slice buttons
            price={`${item.priceOption.price}€`}
            label={item.priceOption.label}
            title={item.priceOption.title}
            onClick={async () => await createStripeSession(item.priceId)}
          />
        ))}
      <Link isExternalLink={true} link={linkUrl} hideStyles>
        <DownloadMethodCard
          buttonType="white"
          price="Free"
          title="Download After Watching Ads"
          onClick={download}
        />
      </Link>
    </ButtonGroup>
  );
};
