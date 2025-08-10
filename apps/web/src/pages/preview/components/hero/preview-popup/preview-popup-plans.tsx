import { BedrockText } from "~/components/bedrock/bedrock-text";
import { DownloadMethodCard } from "~/components/bedrock/download-method-card/download-method-card";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { CheckoutOptionGroupDto } from "~/lib/api";

interface PreviewPopupPlansProps {
  categories: CheckoutOptionGroupDto[] | undefined;
  selectedTimeframe: string | undefined;
  download: () => Promise<void>;
  purchase: (priceId: string) => Promise<void>;
}

export const PreviewPopupPlans = ({
  categories,
  selectedTimeframe,
  download,
  purchase,
}: PreviewPopupPlansProps) => (
  <div className={styles.part}>
    {categories && (
      <BedrockText
        textAlign={"left"}
        color={"white"}
        text={`Voucher period: ${selectedTimeframe}`}
        type="p2"
        style={{ paddingBottom: "0.5rem" }}
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
      <DownloadMethodCard
        buttonType="white"
        price="Free"
        title="Download After Watching Ads"
        onClick={download}
      />
    </ButtonGroup>
  </div>
);
