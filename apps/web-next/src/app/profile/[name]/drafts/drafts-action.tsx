import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { Link } from "@/_components/link";
import { Routes } from "@/utils/routes";

export const DraftsAction = () => (
  <Link link={Routes.CREATE} hideStyles>
    <Button width="100%" type="green" center>
      <BedrockText text="Create A Project" type="p" color="white" />
    </Button>
  </Link>
);
