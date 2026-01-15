import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group/button-group";
import { informationData } from "@/pages/information/[slug]/model/information-data";
import { Routes } from "@/shared/model/routes";
import { InformationTab } from "@/shared/model/information";

import styles from "./header.module.scss";
import { Link } from "@/shared/ui/link";

interface HeaderTabsProps {
  selectedCategory: InformationTab;
}

export const HeaderTabs = ({ selectedCategory }: HeaderTabsProps) => (
  <div>
    <ButtonGroup>
      {informationData.map((c, index) => (
        <Link
          key={index}
          link={Routes.INFORMATION + "/" + c.id}
          className={styles.link}
        >
          <Button
            key={index}
            tabIndex={index}
            isToggled={selectedCategory.id === c.id}
            isClicked={selectedCategory.id === c.id}
            width="100%"
            height="100%"
            type="white"
            center
          >
            <BedrockText text={c.name} color="black" type="p" />
          </Button>
        </Link>
      ))}
    </ButtonGroup>
  </div>
);
