import { BedrockText } from "@/_components/bedrock-text";

import { styles, useAuthorDetailsSkipButton } from ".";
import { Link } from "@/_components/link";

export const AuthorDetailsSkipButton = () => {
  // const { handleScrollToButton } = useAuthorDetailsSkipButton({ ref: downloadButtonRef });

  return (
    <Link link="#download" className={styles.smooth}>
      <BedrockText
        text="Skip to download"
        type="p"
        color="white"
        extraClassName={styles.skip}
        // onClick={handleScrollToButton}
      />
    </Link>
  );
};
