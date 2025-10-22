import { BedrockText } from "~/components/bedrock/bedrock-text";
import { DownloadMethodCard } from "~/components/bedrock/download-method-card/download-method-card";
import { ButtonGroup } from "~/components/button-group/button-group";
import { CheckoutOptionGroupDto } from "~/lib/api";
import { Link } from "~/components/link";
import { Popup } from "~/components/bedrock/popup";

import { styles, usePreviewPopupPlans, useCreateStripeSession } from ".";

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
