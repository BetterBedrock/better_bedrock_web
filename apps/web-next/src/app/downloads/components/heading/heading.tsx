import { HeadingDescription } from "./heading-description";
import { HeadingTitle } from "./heading-title";

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
