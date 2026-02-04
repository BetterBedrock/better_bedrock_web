import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Popup } from "@/shared/ui/popup";

interface HeroReportsPopupActionsProps {
  handleResolveButton: () => void;
  resolved?: boolean;
}

export const HeroReportsPopupActions = ({
  handleResolveButton,
  resolved,
}: HeroReportsPopupActionsProps) => (
  <Popup.Footer>
    <Button
      type={resolved ? "white" : "green"}
      center
      width="100%"
      onClick={handleResolveButton}
    >
      <BedrockText
        text={resolved ? "Reopen" : "Resolve"}
        type="p"
        color={resolved ? "black" : "white"}
      />
    </Button>
  </Popup.Footer>
);
