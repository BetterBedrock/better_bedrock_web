import { HeadingDescription, HeadingTitle } from ".";

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
