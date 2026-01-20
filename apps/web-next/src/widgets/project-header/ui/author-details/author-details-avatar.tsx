import { Avatar } from "@/shared/ui/avatar";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { Rating } from "@/shared/ui/rating";
import { DetailedProjectDto } from "@/shared/api/openapi";

interface AuthorDetailsAvatarProps {
  selectedProject: DetailedProjectDto;
}

export const AuthorDetailsAvatar = ({
  selectedProject,
}: AuthorDetailsAvatarProps) => {
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
