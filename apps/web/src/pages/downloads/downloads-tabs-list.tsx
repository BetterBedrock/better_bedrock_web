import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { styles, TAB_NAMES } from ".";

interface DownloadsTabsListProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const DownloadsTabsList = ({ activeTab, setActiveTab }: DownloadsTabsListProps) => (
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
