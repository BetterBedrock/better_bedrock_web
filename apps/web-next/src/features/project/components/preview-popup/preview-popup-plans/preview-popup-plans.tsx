import { Popup } from "@/components/popup";
import { CheckoutOptionGroupDto } from "@/lib/api";
import { PreviewPopupPlansList } from "@/features/project/components/preview-popup/preview-popup-plans/preview-popup-plans-list";
import { PreviewPopupPlansPeriod } from "@/features/project/components/preview-popup/preview-popup-plans/preview-popup-plans-period";

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
