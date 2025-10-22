import { RefObject } from "react";

interface UseScrollIntoViewProps {
  ref: RefObject<HTMLElement | null>;
}

export const useAuthorDetailsSkipButton = ({ ref }: UseScrollIntoViewProps) => {
  const handleScrollToButton = () => {
    if (!ref?.current) return;

    ref.current.scrollIntoView({ block: "center", behavior: "smooth" });
  };
  return { handleScrollToButton };
};