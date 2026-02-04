import { Popup } from "@/shared/ui/popup";
import { CheckoutOptionGroupDto } from "@/shared/lib/openapi";
import { PreviewPopupPlansList } from "@/pages/project/ui/project-download/preview-popup/preview-popup-plans/preview-popup-plans-list";
import { PreviewPopupPlansPeriod } from "@/pages/project/ui/project-download/preview-popup/preview-popup-plans/preview-popup-plans-period";

interface PreviewPopupPlansProps {
  categories: CheckoutOptionGroupDto[] | undefined;
  selectedTimeframe: string | undefined;
  download: () => Promise<void>;
}

export const PreviewPopupPlans = ({
  categories,
  selectedTimeframe,
  download,
}: PreviewPopupPlansProps) => (
  <Popup.Part>
    {categories && (
      <PreviewPopupPlansPeriod selectedTimeframe={selectedTimeframe} />
    )}
    <PreviewPopupPlansList
      categories={categories}
      selectedTimeframe={selectedTimeframe}
      download={download}
    />
  </Popup.Part>
);
