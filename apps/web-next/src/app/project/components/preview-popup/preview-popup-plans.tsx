import { BedrockText } from "@/_components/bedrock-text";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { Popup } from "@/_components/popup";
import { CheckoutOptionGroupDto } from "@/_lib/api";
import { DownloadMethodCard } from "@/_components/download-method-card";

import { styles, usePreviewPopupPlans, useCreateStripeSession } from ".";
import { Link } from "@/_components/link";

interface PreviewPopupPlansProps {
  categories: CheckoutOptionGroupDto[] | undefined;
  selectedTimeframe: string | undefined;
  download: () => Promise<void>;
  getLinkvertiseId: () => Promise<string>;
}

export const PreviewPopupPlans = ({
  categories,
  selectedTimeframe,
  download,
  getLinkvertiseId,
}: PreviewPopupPlansProps) => {
  const purchase = useCreateStripeSession();
  const { linkUrl } = usePreviewPopupPlans({ getLinkvertiseId });

  return (
    <Popup.Part>
      {categories && (
        <BedrockText
          textAlign="left"
          color="white"
          text={`Voucher period: ${selectedTimeframe}`}
          type="p2"
          extraClassName={styles.period}
        />
      )}
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
              onClick={() => purchase(item.priceId)}
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
    </Popup.Part>
  );
};
