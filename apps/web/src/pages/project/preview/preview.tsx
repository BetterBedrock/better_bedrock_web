import { Comments } from "~/pages/project/components/comments";
import { Description } from "~/pages/project/components/description";
import { DownloadButton } from "~/pages/project/components/download-button";
import { Header } from "~/pages/project/components/header";
import { RateProject } from "~/pages/project/components/rate-project";

export const Preview = () => {
  return (
    <>
      <Header mode="view" />
      <Description mode="view"/>
      <DownloadButton />
      <RateProject />
      <Comments />
    </>
  );
};
