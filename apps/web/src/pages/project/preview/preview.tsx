import {
  Comments,
  Description,
  DownloadButton,
  Header,
  RateProject,
} from "~/pages/project/components";

export const Preview = () => (
  <>
    <Header mode="view" />
    <Description mode="view" />
    <DownloadButton />
    <RateProject />
    <Comments />
  </>
);
