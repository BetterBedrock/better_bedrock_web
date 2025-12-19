import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group/button-group";
import {
  InformationTab,
  informationData,
} from "@/app/(informations)/information/[slug]/data/information-data";
import { Routes } from "@/utils/routes";

import styles from "./header.module.scss";
import { Link } from "@/components/link";

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
