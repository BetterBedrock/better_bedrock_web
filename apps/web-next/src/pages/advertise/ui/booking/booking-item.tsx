import { BedrockText } from "@/shared/ui/bedrock-text";
import { Card } from "@/shared/ui/card";
import { BookingStep } from "../../model/booking-texts";

interface BookingItemProps extends BookingStep {
  index: number;
}

export const BookingItem = ({ index, title, description }: BookingItemProps) => (
  <Card sub>
    <Card.Body>
      <BedrockText
        type="h3"
        text={`${index}. ${title}`}
        textAlign="left"
        color="white"
        font="Minecraft"
      />
      <BedrockText type="p" text={description} textAlign="left" color="white" />
    </Card.Body>
  </Card>
);
