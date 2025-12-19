import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Routes } from "@/utils/routes";

interface BetterBedrockArchiveButtonProps {
  searchParams?: { archived?: boolean };
}

export const BetterBedrockArchiveButton = async ({
  searchParams,
}: BetterBedrockArchiveButtonProps) => {
  const showArchived = searchParams?.archived;
  const link = !showArchived
    ? `${Routes.DOWNLOADS_BETTERBEDROCK}?archived=true`
    : Routes.DOWNLOADS_BETTERBEDROCK;

  return (
    <Link link={link} scroll={false} hideStyles>
      <Button type="green" width="100%" height="auto" center>
        <BedrockText
          type="p"
          color="white"
          text={
            showArchived ? "Close archived versions" : "Open archived versions"
          }
        />
      </Button>
    </Link>
  );
};
