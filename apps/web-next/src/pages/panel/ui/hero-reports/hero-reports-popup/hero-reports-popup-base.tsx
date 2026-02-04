import { DetailedUserDto } from "@/shared/lib/openapi";
import { Avatar } from "@/shared/ui/avatar";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Popup } from "@/shared/ui/popup";
import { Rating } from "@/shared/ui/rating";

interface HeroReportsPopupBaseProps {
  message: string;
  reporter: DetailedUserDto;
}

export const HeroReportsPopupBase = ({
  reporter,
  message,
}: HeroReportsPopupBaseProps) => (
  <Popup.Part>
    <Avatar>
      <Avatar.Profile name={reporter.name} size="medium" />
      <Avatar.Details name={reporter.name} at>
        {<Rating simple rating={reporter.rating.average} />}
      </Avatar.Details>
    </Avatar>
    <BedrockText
      type="p"
      text={message}
      textAlign="start"
      color="white"
    />
  </Popup.Part>
);
