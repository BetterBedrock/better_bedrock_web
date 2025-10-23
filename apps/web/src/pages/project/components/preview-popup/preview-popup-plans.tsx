import { BedrockText } from "~/components/bedrock/bedrock-text";
import { DownloadMethodCard } from "~/components/bedrock/download-method-card/download-method-card";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { CheckoutOptionGroupDto } from "~/lib/api";
import { Link } from "~/components/link";
import { useEffect, useState } from "react";
import { Popup } from "~/components/bedrock/popup";

interface PreviewPopupPlansProps {
  categories: CheckoutOptionGroupDto[] | undefined;
  selectedTimeframe: string | undefined;
  download: () => Promise<void>;
  getLinkvertiseId: () => Promise<string>;
  purchase: (priceId: string) => Promise<void>;
}

export const PreviewPopupPlans = ({
  categories,
  selectedTimeframe,
  download,
  purchase,
  getLinkvertiseId,
}: PreviewPopupPlansProps) => {
  const [linkUrl, setLinkUrl] = useState<string>();

  useEffect(() => {
    const fetchLink = async () => {
      const url = await getLinkvertiseId();
      setLinkUrl(url);
    };
    fetchLink();
  }, []);

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
