import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";

interface HeaderTabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TAB_NAMES: string[] = ["General", "Mobile Devices", "PC/Other Devices"];

export const HeaderTabs = ({ activeTab, setActiveTab }: HeaderTabsProps) => (
  <div>
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
          type="alwaysGreen"
        />
      ))}
    </ButtonSeparator>
  </div>
);
