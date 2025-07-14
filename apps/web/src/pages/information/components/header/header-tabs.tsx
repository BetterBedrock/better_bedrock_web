import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";

interface HeaderTabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TAB_NAMES: string[] = ["General", "Mobile Devices", "PC/Other Devices"];

export const HeaderTabs = ({ activeTab, setActiveTab }: HeaderTabsProps) => (
  <div>
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
          type="alwaysGreen"
        />
      ))}
    </ButtonGroup>
  </div>
);
