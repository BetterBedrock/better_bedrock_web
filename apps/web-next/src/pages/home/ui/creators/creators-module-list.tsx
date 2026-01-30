import { CREATORS, HELPERS } from "./creators-data";
import { CreatorsModule } from "./creators-module";

export const CreatorsModuleList = () => (
  <>
    <CreatorsModule
      title="The Minds Behind Better Bedrock"
      description="Founded by AmBro and evolved to new heights by iDarkQ. Discover the visionaries who built the most advanced Bedrock ecosystem from the ground up."
      contributors={CREATORS}
    />
    <CreatorsModule
      title="Community Heroes"
      description="Meet the dedicated support team that keeps our community alive. They work tirelessly on Discord to assist users, solve problems, and maintain a welcoming environment for everyone."
      contributors={HELPERS}
    />
  </>
);
