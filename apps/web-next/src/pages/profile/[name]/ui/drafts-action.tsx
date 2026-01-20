import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/model/routes";

export const DraftsAction = () => (
  <Link link={Routes.CREATE} hideStyles>
    <Button width="100%" type="green" center>
      <BedrockText text="Create a project" type="p" color="white" />
    </Button>
  </Link>
);
