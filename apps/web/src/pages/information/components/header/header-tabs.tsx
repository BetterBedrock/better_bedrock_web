import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Link } from "~/components/link";
import { informationData, InformationTab } from "~/pages/information";
import { Routes } from "~/utils/routes";
import { styles } from ".";

interface HeaderTabsProps {
  selectedCategory: InformationTab;
}

export const HeaderTabs = ({ selectedCategory }: HeaderTabsProps) => (
  <div>
    <ButtonGroup>
      {informationData.map((c, index) => (
        <Link link={Routes.INFORMATION + "/" + c.id} className={styles.link}>
          <Button
            key={index}
            tabIndex={index}
            isToggled={selectedCategory.id === c.id}
            isClicked={selectedCategory.id === c.id}
            width="100%"
            height="100%"
            type="green"
            center
          >
            <BedrockText text={c.name} color="white" type="p" />
          </Button>
        </Link>
      ))}
    </ButtonGroup>
  </div>
);
