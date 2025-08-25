import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import Steve from "~/assets/images/avatars/Steve.png";

interface CommentProps {
  creator: string;
  comment: string;
  subComments?: CommentProps[]; // For future use with nested comments
}

export const Comment = ({ creator, comment, subComments }: CommentProps) => {
  const getComment = (user: string, content: string, reply: boolean = false) => (
    <div className={styles.header}>
      <img src={Steve} className={styles.avatar} />

      <div>
        <BedrockText text={`@${user}`} type="p" color="white" textAlign="start" font="Minecraft" />
        <BedrockText text={content} type="p" color="white" />

        {reply && (
            <BedrockText text="Reply" type="p" textAlign="start" color="#303030" />
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.comment}>
      {getComment(creator, comment, true)}
      {subComments?.map((c) => getComment(c.creator, c.comment))}
    </div>
  );
};
