import { Rating } from "~/components/rating";
import { useAuth } from "~/providers/auth";

import { styles, useManageRating } from ".";

export const RateProject = () => {
  const { user } = useAuth();
  const { userRating, handlePostRating, handleDeleteRating } = useManageRating();

  if (!user) return;

  return (
    <div className={styles.center}>
      <Rating
        rating={userRating}
        onReset={handleDeleteRating}
        onUpdate={async (rating) => await handlePostRating(rating)}
        className={styles.rating}
        extraClassName={styles.tooltip}
        selectable={true}
        size="medium"
      />
    </div>
  );
};
