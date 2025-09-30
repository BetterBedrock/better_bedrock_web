import { Rating } from "~/components/rating";
import { UserRatingDto } from "~/lib/api";
import { styles } from ".";
import clsx from "clsx";

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
