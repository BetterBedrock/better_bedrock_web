import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { Input } from "~/components/bedrock/input";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { useState } from "react";

export const HeroActions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectId, setProjectId] = useState("");

  const createProject = () => {

    navigate(Routes.EDITOR + "/" + projectId);
  };

  if (!id) {
    return (
      <div className={styles.actions}>
        <Input
          placeholder="Project Title"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <Button onClick={createProject} center>
          <BedrockText text="Create" type="p" color="white" />
        </Button>
      </div>
    );
  }
  return <></>;
};
