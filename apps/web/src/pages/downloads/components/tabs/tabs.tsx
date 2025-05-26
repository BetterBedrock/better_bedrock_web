import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { TAB_NAMES } from "../..";
import { styles } from ".";
import { useContent } from "~/providers/content";
import { ButtonGroup } from "~/components/button-group/button-group";

interface TabsProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const { downloads } = useContent();

  if (downloads.length < 1) {
    return <></>;
  }

  return (
    <div className={styles.tabs}>
      <ButtonGroup>
        {TAB_NAMES.map((text, index) => (
          <Button
            key={index}
            tabIndex={index}
            isClicked={activeTab === index}
            onTap={() => setActiveTab(index)}
            width="100%"
            height="auto"
            text={text}
            type="alwaysBlack"
          />
        ))}
      </ButtonGroup>
    </div>
  );
};
