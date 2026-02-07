import { bookingTexts } from "../../model/booking-texts";
import { BookingItem } from "./booking-item";
import styles from "./booking.module.scss";

export const BookingList = () => (
  <div className={styles.list}>
    {bookingTexts.map((step, index) => (
      <BookingItem
        key={index}
        index={index + 1}
        title={step.title}
        description={step.description}
      />
    ))}
  </div>
);
