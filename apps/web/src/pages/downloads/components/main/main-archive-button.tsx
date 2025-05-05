import { Button } from "~/components/bedrock/button";

interface MainArchiveButtonProps {
  showArchived: boolean;
  setShowArchived: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainArchiveButton = ({ showArchived, setShowArchived }: MainArchiveButtonProps) => (
  <Button
    text={showArchived ? "Close archived versions" : "Open archived versions"}
    type="alwaysGreen"
    width="100%"
    onTap={() => setShowArchived((prev) => !prev)}
  />
);
