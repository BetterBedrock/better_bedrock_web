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
  const { downloads, fetched } = useContent();

  if (!fetched) {
    return <></>;
  }

  return (
    <div className={styles.tabs}>
      <ButtonGroup>
        {downloads?.categories.map((category, index) => (
          <Button
            key={index}
            isClicked={activeTab === category.id}
            onClick={() => setActiveTab(category.id)}
            width="100%"
            height="auto"
            type="dark"
            center
          >
            <BedrockText color="white" type="p" text={category.name} />
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
