import { UserRatingDto } from "@/_lib/api";
import clsx from "clsx";
import { Rating } from "@/_components/rating";

import styles from "./user.module.scss";

interface UserProfileRatingProps {
  rating: UserRatingDto | undefined;
}

export const UserProfileRating = ({ rating }: UserProfileRatingProps) => (
  <>
    <Rating
      extraClassName={styles.rating}
      rating={rating?.average}
      suffix={`(${rating?.count} All User Ratings)`}
    />
    <Rating
      extraClassName={clsx(styles.rating, styles.simple)}
      rating={rating?.average}
      simple
    />
  </>
);
