import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Link } from "~/components/link";
import { styles, useAuthorDetailsSkipButton } from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";

export const AuthorDetailsSkipButton = () => {
  const { downloadButtonRef } = useProjectManager();
  const { handleScrollToButton } = useAuthorDetailsSkipButton({ ref: downloadButtonRef });

  return (
    <Link>
      <BedrockText
        text="Skip to download"
        type="p"
        color="white"
        extraClassName={styles.skip}
        onClick={handleScrollToButton}
      />
    </Link>
  );
};
