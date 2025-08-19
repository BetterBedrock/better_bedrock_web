import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { useAuth } from "~/providers/auth";
import { useEffect } from "react";

const tabs = ["projects", "stats", "drafts"];

export const Tabs = () => {
  //   const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  const { pathname } = useLocation();
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    navigate(Routes.PROFILE + "/" + id + "/" + tab);
  };

  console.log({ user, id });

  return (
    <ButtonGroup className={styles.tabs}>
      <Button
        type="dark"
        center
        className={styles.tab}
        isClicked={lastSegment === "projects"}
        onClick={() => handleTabClick("projects")}
      >
        <BedrockText text="Projects" color="white" type="p" />
      </Button>
      <Button
        type="dark"
        center
        className={styles.tab}
        isClicked={lastSegment === "stats"}
        onClick={() => handleTabClick("stats")}
      >
        <BedrockText text="Stats" color="white" type="p" />
      </Button>
      {user?.name === id && (
        <Button
          type="dark"
          center
          className={styles.tab}
          isClicked={lastSegment === "drafts"}
          onClick={() => handleTabClick("drafts")}
        >
          <BedrockText text="Drafts" color="white" type="p" />
        </Button>
      )}
    </ButtonGroup>
  );
};
