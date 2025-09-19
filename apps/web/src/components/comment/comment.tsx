import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import Steve from "~/assets/images/avatars/Steve.png";
import { useRef, useState } from "react";
import { Input } from "~/components/bedrock/input";
import { Button } from "~/components/bedrock/button";
import { ProjectCommentDto } from "~/lib/api";
import { ButtonGroup } from "~/components/button-group/button-group";

import Exit from "~/assets/images/exit.png";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";

interface CommentProps {
  comment: ProjectCommentDto;
  subComments?: CommentProps[]; // For future use with nested comments
  onReply?: (comment: string, parentId: string) => void;
}

export const Comment = ({ comment, subComments, onReply }: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getComment = (user: string, content: string, reply: boolean = false) => (
    <div className={styles.header}>
      <img src={Steve} className={styles.avatar} />

        <div>
          <Link link={Routes.PROFILE + "/" + user} hideStyles>
            <BedrockText
              text={`@${user}`}
              type="p"
              color="white"
              textAlign="start"
              font="Minecraft"
            />
          </Link>
          <BedrockText text={content} type="p" color="white" textAlign="start" />

        {reply && !isReplying && (
          <BedrockText
            text="Reply"
            type="p"
            textAlign="start"
            color="#303030"
            onClick={() => setIsReplying(true)}
          />
        )}
        {isReplying && reply && (
          <div className={styles.reply}>
            <Input ref={inputRef} placeholder="Response..." />
            <Button
              type="green"
              center
              onClick={() => onReply?.(inputRef.current?.value ?? "", comment.id)}
            >
              <BedrockText color="white" type="p" text="Submit" />
            </Button>
            <Button type="dark" center onClick={() => setIsReplying(false)}>
              <img alt="Close" src={Exit} className={styles.icon} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.comment}>
      {getComment(comment.author.name, comment.content, true)}
      {subComments?.map((c) => getComment(c.comment.author.name, c.comment.content))}
    </div>
  );
};
