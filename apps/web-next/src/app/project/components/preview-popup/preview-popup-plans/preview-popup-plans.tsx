import { Popup } from "@/_components/popup";
import { CheckoutOptionGroupDto } from "@/_lib/api";

import { PreviewPopupPlansPeriod, PreviewPopupPlansList } from ".";

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
}: PreviewPopupPlansProps) => (
  <Popup.Part>
    {categories && (
      <PreviewPopupPlansPeriod selectedTimeframe={selectedTimeframe} />
    )}
    <PreviewPopupPlansList
      categories={categories}
      selectedTimeframe={selectedTimeframe}
      download={download}
      getLinkvertiseId={getLinkvertiseId}
    />
  </Popup.Part>
);
