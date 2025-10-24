import { Dispatch, SetStateAction } from "react";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";

interface MainArchiveButtonProps {
  showArchived: boolean;
  setShowArchived: Dispatch<SetStateAction<boolean>>;
  setActiveTab: (tab: string) => void;
}

export const BetterBedrockArchiveButton = ({
  showArchived,
  setShowArchived,
}: MainArchiveButtonProps) => (
  <Button
    type="green"
    width="100%"
    height="auto"
    onClick={() => setShowArchived((prev) => !prev)}
    center
  >
    <BedrockText
      type="p"
      color="white"
      text={showArchived ? "Close archived versions" : "Open archived versions"}
    />
  </Button>
);
