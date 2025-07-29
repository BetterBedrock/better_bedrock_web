import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";

interface MainArchiveButtonProps {
  showArchived: boolean;
  setShowArchived: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: (tab: string) => void;
}

export const MainArchiveButton = ({
  showArchived,
  setShowArchived,
  // setActiveTab,
}: MainArchiveButtonProps) => (
  <ButtonGroup>
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
    {/* <Button type="white" width="100%" height="auto" onClick={() => setActiveTab("community")} center>
      <BedrockText type="p" color="black" text="Navigate to Community" />
    </Button>
    <Button type="white" width="100%" height="auto" onClick={() => setActiveTab("sideProjects")} center>
      <BedrockText type="p" color="black" text="Navigate to Side Projects" />
    </Button> */}
  </ButtonGroup>
);
