import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Routes } from "@/utils/routes";

export const DraftsAction = () => (
  <Link link={Routes.CREATE} hideStyles>
    <Button width="100%" type="green" center>
      <BedrockText text="Create A Project" type="p" color="white" />
    </Button>
  </Link>
);
