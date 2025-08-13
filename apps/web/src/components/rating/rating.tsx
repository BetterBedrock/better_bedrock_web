import FilledStar from "~/assets/ui/star/filledStar.png";
import EmptyStar from "~/assets/ui/star/emptyStar.png";
import HalfFilledStar from "~/assets/ui/star/halfFilledStar.png";
import { styles } from ".";
import { Tooltip } from "~/components/bedrock/tooltip";
import { BedrockText } from "~/components/bedrock/bedrock-text";

interface RatingProps {
  simple?: boolean;
  max?: number;
  rating?: number;
}

export const Rating = ({ max = 5, rating = 1, simple }: RatingProps) => (
  <Tooltip text={`${rating}/${max}`}>
    <div className={styles.rating}>
      {simple ? (
        <>
          <BedrockText extraClassName={styles.text} type="p" text={`${rating}/${max}`} color="white"/>
          <img className={styles.star} src={FilledStar} />
        </>
      ) : (
        Array.from({ length: max }, (_, i) => {
          if (rating >= i + 1) {
            return <img key={i} className={styles.star} src={FilledStar} />;
          } else if (rating > i && rating < i + 1) {
            return (
              <img
                key={i}
                className={styles.star}
                src={rating - i >= 0.5 ? HalfFilledStar : EmptyStar}
              />
            );
          } else {
            return <img key={i} className={styles.star} src={EmptyStar} />;
          }
        })
      )}
    </div>
  </Tooltip>
);
