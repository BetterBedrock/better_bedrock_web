import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

export const PreviewPopupFooter = () => (
  <div className={styles.part}>
    <BedrockText
      textAlign="left"
      color="white"
      text="* Only Better Bedrock Content - Main Texture Pack, All 9 extensions, Archives"
      type="p2"
    />
    <BedrockText
      textAlign="left"
      color="white"
      text="* Everything On The Site - Main Texture Pack, All 9 extensions, Archives, Community & Side Projects packs. "
      type="p2"
    />
    <BedrockText
      textAlign="left"
      color="gray"
      text="* Payments are processed by Stripe"
      type="p2"
    />
    <BedrockText
      textAlign="left"
      color="gray"
      text="* Free download is option, however results in 60m cooldown. To ensure a smooth experience, we are informing you here."
      type="p2"
    />
    <BedrockText
      textAlign="left"
      color="gray"
      text="* To get your Discord VIP role, contact us on Discord. We suggest opening a ticket. Thank YOU for the support!"
      type="p2"
    />
    <BedrockText
      textAlign="left"
      color="gray"
      text="* Purchasing the weekly plan grants a limit of 50 uses, while the monthly plan provides a limit of 300 uses."
      type="p2"
    />
    <BedrockText
      textAlign="left"
      color="gray"
      text="* Publicly sharing voucher codes may result in the code being banned and loss of access."
      type="p2"
    />
  </div>
);
