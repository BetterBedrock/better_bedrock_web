import { BedrockText } from "@/shared/ui/bedrock-text";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Button } from "@/shared/ui/button/button";
import { PlanDuration } from "../../model/offers-data";

interface PlansActionsProps {
  selectedPlan: PlanDuration;
  onPlanChange: (plan: PlanDuration) => void;
}

export const PlansActions = ({ selectedPlan, onPlanChange }: PlansActionsProps) => {
  return (
    <ButtonGroup direction="responsive">
      <Button
        width="100%"
        type="dark"
        center
        isClicked={selectedPlan === "weekly"}
        onClick={() => onPlanChange("weekly")}
      >
        <BedrockText text="Weekly" type="p" color="white" />
      </Button>
      <Button
        width="100%"
        type="dark"
        center
        isClicked={selectedPlan === "monthly"}
        onClick={() => onPlanChange("monthly")}
      >
        <BedrockText text="Monthly (Save ~20%)" type="p" color="white" />
      </Button>
    </ButtonGroup>
  );
};
