import { useNavigate, useOutletContext } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { useProject } from "~/providers/project";
import { useEffect, useState } from "react";
import { SimpleProjectDto, SimpleUserDto } from "~/lib/api";

export const Drafts = () => {
  const navigate = useNavigate();
  const { selectedUser } = useOutletContext<{ selectedUser: SimpleUserDto }>();
  const { fetchUserProjects } = useProject();
  const [projects, setProjects] = useState<SimpleProjectDto[]>([]);

  useEffect(() => {
    if (!selectedUser) {
      navigate(Routes.HOME);
      return;
    }
    fetchUserProjects(selectedUser.id).then((data) =>
      setProjects(data?.filter((d) => d.draft === true) ?? []),
    );
  }, []);

  return (
    <div className={styles.list}>
      <Button type="green" onClick={() => navigate(Routes.CREATE)} center>
        <BedrockText text="Submit A Project" type="p" color="white" />
      </Button>
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <GridDownloadCard
            key={index}
            project={project}
            mode="edit"
          />
        ))}
      </div>
    </div>
  );
};
