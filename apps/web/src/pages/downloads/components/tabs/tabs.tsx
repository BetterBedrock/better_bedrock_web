import { TAB_NAMES } from "../..";
import { styles } from ".";
import { useContent } from "~/providers/content";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const { fetched } = useContent();

  if (!fetched) {
    return <></>;
  }

  return (
    <div className={styles.tabs}>
      <ButtonGroup>
        {Object.entries(TAB_NAMES).map(([index, type]) => (
          <Button
            key={index}
            // tabIndex={index}
            isClicked={activeTab === index}
            onClick={() => setActiveTab(index)}
            width="100%"
            height="auto"
            type="dark"
            center
          >
            <BedrockText color="white" type="p" text={type} />
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
