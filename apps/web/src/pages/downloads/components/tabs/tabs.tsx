import { styles } from ".";
import { useContent } from "~/providers/content";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";

interface TabsProps {
  activeTab: string;
}

export const Tabs = ({ activeTab }: TabsProps) => {
  const { downloads, fetched } = useContent();

  if (!fetched) {
    return <></>;
  }

  return (
    <div className={styles.tabs}>
      <ButtonGroup>
        {downloads?.categories.map((category, index) => (
          <Link link={Routes.DOWNLOADS + "/" + category.id} className={styles.link}>
            <Button
              key={index}
              isClicked={activeTab === category.id}
              width="100%"
              height="auto"
              type="dark"
              center
            >
              <BedrockText color="white" type="p" text={category.name} />
            </Button>
          </Link>
        ))}
      </ButtonGroup>
    </div>
  );
};
