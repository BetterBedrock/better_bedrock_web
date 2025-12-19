import { HeadingDescription } from "./downloads-heading-description";
import { HeadingTitle } from "./downloads-heading-title";

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading = ({ title, description }: HeadingProps) => (
  <>
    <HeadingTitle title={title} />
    <HeadingDescription description={description}  />
  </>
);
