import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";

interface MainArchiveButtonProps {
  showArchived: boolean;
  setShowArchived: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: (tab: number) => void;
}

export const MainArchiveButton = ({ showArchived, setShowArchived, setActiveTab }: MainArchiveButtonProps) => (
  <ButtonGroup>
    <Button
      text={showArchived ? "Close archived versions" : "Open archived versions"}
      type="alwaysGreen"
      width="100%"
      height="auto"
      onTap={() => setShowArchived((prev) => !prev)}
    />
    <Button
      text={"Navigate to Community"}
      type="alwaysWhite"
      width="100%"
      height="auto"
      onTap={() => setActiveTab(1)}
    />
    <Button
      text={"Navigate to Side Projects"}
      type="alwaysWhite"
      width="100%"
      height="auto"
      onTap={() => setActiveTab(2)}
    />
  </ButtonGroup>
);
