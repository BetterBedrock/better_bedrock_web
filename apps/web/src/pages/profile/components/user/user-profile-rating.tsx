import { Rating } from "~/components/rating";
import { UserRatingDto } from "~/lib/api";
import { styles } from ".";

interface UserProfileRatingProps {
  rating: UserRatingDto | undefined;
}

export const UserProfileRating = ({ rating }: UserProfileRatingProps) => (
  <Rating
    extraClassName={styles.rating}
    rating={rating?.average}
    suffix={`(${rating?.count} All User Ratings)`}
  />
);
