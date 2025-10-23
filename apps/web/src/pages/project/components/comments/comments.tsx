import { Card, CardDivider } from "~/components/bedrock/card";
import { useEffect } from "react";
import { HeaderTitle } from "~/pages/project/components/header";
import { ReportProvider } from "~/providers/report";

import { CommentsList, CommentsPost, styles, useComments } from ".";

export const Comments = () => {
  const { selectedProject, fetchComments } = useComments();

  useEffect(() => {
    fetchComments();
  }, [selectedProject]);

  return (
    <ReportProvider>
      <Card sub>
        <div className={styles.editor}>
          <HeaderTitle title="Comments" />
        </div>
        <CardDivider sub />
        <CommentsPost />
        <CommentsList />
      </Card>
    </ReportProvider>
  );
};
