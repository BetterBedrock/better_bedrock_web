import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { styles, useProfileTabClick } from ".";

interface TabsButtonProps {
  text: string;
}

export const TabsButton = ({ text }: TabsButtonProps) => {
  const handleTabClick = useProfileTabClick();
  const currentPage = location.pathname.split("/").pop();

  return (
    <Button
      type="dark"
      center
      className={styles.tab}
      isClicked={currentPage === text.toLowerCase()}
      onClick={() => handleTabClick(text.toLowerCase())}
    >
      <BedrockText text={text} color="white" type="h2" font="Mojangles" paragraphSize />
    </Button>
  );
};
