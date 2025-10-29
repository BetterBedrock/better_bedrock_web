import { CREATORS, HELPERS, CreatorsModule } from ".";

export const CreatorsModuleList = () => (
  <>
    <CreatorsModule
      title="CREATORS"
      description="Meet the creators behind the project! Initially created by AmBro and later expanded by iDarkQ. Check out the parts they worked on below!"
      contributors={CREATORS}
    />
    <CreatorsModule
      title="HELPERS"
      description="Meet the Better Bedrock helpers. They have significantly contributed to developing many features for the Texture Pack."
      contributors={HELPERS}
    />
  </>
);
