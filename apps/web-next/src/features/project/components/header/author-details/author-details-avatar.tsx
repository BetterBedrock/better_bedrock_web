import { Avatar } from "@/components/avatar";
import { CircularProgressIndicator } from "@/components/circular-progress-indicator";
import { Rating } from "@/components/rating";
import { DetailedProjectDto } from "@/lib/api";

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
