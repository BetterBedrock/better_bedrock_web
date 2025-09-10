import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { useAuth } from "~/providers/auth";

export const Tabs = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split("/").pop();

  const handleTabClick = (tab: string) => {
    navigate(Routes.PROFILE + "/" + id + "/" + tab);
  };

  if (user?.name !== id && !user?.admin) {
    return <></>;
  }

  return (
    <ButtonGroup className={styles.tabs}>
      <Button
        type="dark"
        center
        className={styles.tab}
        isClicked={currentPage === "projects"}
        onClick={() => handleTabClick("projects")}
      >
        <BedrockText text="Projects" color="white" type="p" />
      </Button>
      <Button
        type="dark"
        center
        className={styles.tab}
        isClicked={currentPage === "stats"}
        onClick={() => handleTabClick("stats")}
      >
        <BedrockText text="Stats" color="white" type="p" />
      </Button>

      <Button
        type="dark"
        center
        className={styles.tab}
        isClicked={currentPage === "drafts"}
        onClick={() => handleTabClick("drafts")}
      >
        <BedrockText text="Drafts" color="white" type="p" />
      </Button>
    </ButtonGroup>
  );
};
