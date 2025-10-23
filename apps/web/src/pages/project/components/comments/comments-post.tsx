import { Banner } from "~/components/bedrock/banner";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Input } from "~/components/bedrock/input";
import { ButtonGroup } from "~/components/button-group/button-group";
import { useAuth } from "~/providers/auth";

import { useComments, styles } from ".";

export const CommentsPost = () => {
  const { user } = useAuth();
  const { handleKeyDown, handlePostComment, commentInputRef } = useComments();

  return (
    <div className={styles.editor}>
      {!user ? (
        <Banner message="You need to be logged in to comment and rate projects" type="neutral" />
      ) : (
        <ButtonGroup>
          <Input
            className={styles.input}
            ref={commentInputRef}
            placeholder="Your Comment..."
            onKeyDown={handleKeyDown}
          />
          <Button type="green" onClick={handlePostComment} center>
            <BedrockText text="Post" type="p" color="white" />
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};
