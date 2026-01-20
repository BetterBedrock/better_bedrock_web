import { DownloadsHeadingDescription } from "./downloads-heading-description";
import { DownloadsHeadingTitle } from "./downloads-heading-title";

interface HeadingProps {
  title: string;
  description: string;
}

export const DownloadsHeading = ({ title, description }: HeadingProps) => (
  <>
    <DownloadsHeadingTitle title={title} />
    <DownloadsHeadingDescription description={description} />
  </>
);
