import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { TAB_NAMES } from "../..";
import { styles } from ".";

interface TabsProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const Tabs = ({ activeTab, setActiveTab }: TabsProps) => (
  <div className={styles.tabs}>
    <ButtonSeparator>
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
    </ButtonSeparator>
  </div>
);
