import { BedrockText } from "@/components/bedrock-text";

import styles from "./preview-popup-plans.module.scss";

interface PreviewPopupPlansPeriodProps {
  selectedTimeframe: string | undefined;
}

export const PreviewPopupPlansPeriod = ({
  selectedTimeframe,
}: PreviewPopupPlansPeriodProps) => (
  <BedrockText
    textAlign="left"
    color="white"
    text={`Voucher period: ${selectedTimeframe}`}
    type="p2"
    extraClassName={styles.period}
  />
);
