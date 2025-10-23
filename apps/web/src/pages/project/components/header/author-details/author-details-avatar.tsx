import { Avatar } from "~/components/avatar";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Rating } from "~/components/rating";
import { useProjectManager } from "~/pages/project/providers/project-manager";

export const AuthorDetailsAvatar = () => {
  const { selectedProject } = useProjectManager();

  const creator = selectedProject?.user;

  return (
    <Avatar>
      <Avatar.Profile name={creator?.name ?? "Unnamed"} size="medium" />

      {creator ? (
        <Avatar.Details name={creator!.name} at>
          <Rating rating={selectedProject.user.rating} simple />
        </Avatar.Details>
      ) : (
        <CircularProgressIndicator size="small" />
      )}
    </Avatar>
  );
};
