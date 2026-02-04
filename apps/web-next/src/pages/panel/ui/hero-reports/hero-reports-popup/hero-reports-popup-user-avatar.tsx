import { DetailedUserDto } from "@/shared/lib/openapi";
import { Avatar } from "@/shared/ui/avatar";
import { Popup } from "@/shared/ui/popup";
import { Rating } from "@/shared/ui/rating";

interface HeroReportsPopupUserAvatarProps {
  reported: DetailedUserDto;
}

export const HeroReportsPopupUserAvatar = ({
  reported,
}: HeroReportsPopupUserAvatarProps) => (
  <Popup.Part>
    <Avatar>
      <Avatar.Profile name={reported.name} size="medium" />
      <Avatar.Details name={reported.name} at>
        <Rating simple rating={reported.rating.average} />
      </Avatar.Details>
    </Avatar>
  </Popup.Part>
);
