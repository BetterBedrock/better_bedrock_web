import { Card } from "@/shared/ui/card";
import { BookingList } from "./booking-list";
import { BookingTitle } from "./booking-title";
import { BookingDescription } from "./booking-description";

export const Booking = () => (
  <Card fullWidth>
    <Card.Body>
      <BookingTitle />
      <BookingDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <BookingList />
    </Card.Body>
  </Card>
);
