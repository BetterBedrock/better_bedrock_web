import { BedrockText } from "@/shared/ui/bedrock-text";

export const HeroSuccessPageDescription = () => (
  <BedrockText
    type="p"
    color="white"
    text={
      "You successfully completed your payment. Your voucher has been automatically activated. A voucher code has been sent to the email address you used during checkout. Thank you for your support! If you have any questions or need assistance, please reach out to us."
    }
  />
);
