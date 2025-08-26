import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { Input } from "~/components/bedrock/input";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { useState } from "react";
import { useProject } from "~/providers/project";

export const HeroActions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const { createProject } = useProject();

  const handleCreateProject = async () => {
    const project = await createProject(title);
    if(!project) return;

    navigate(Routes.EDITOR + "/" + project.id);
  };

  if (!id) {
    return (
      <div className={styles.actions}>
        <Input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleCreateProject} center>
          <BedrockText text="Create" type="p" color="white" />
        </Button>
      </div>
    );
  }
  return <></>;
};
