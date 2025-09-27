import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { useAnalytics } from "~/providers/analytics";

export const HeaderAction = () => {
  const { setAutoRefresh, autoRefresh } = useAnalytics();

  const handleClick = () => {
    setAutoRefresh((prev) => !prev);
  };

  return (
    <Button width="100%" type={autoRefresh ? "green" : "dark"} center onClick={handleClick}>
      <BedrockText
        text={`Auto Refreshing Turned ${autoRefresh ? "On" : "Off"}`}
        type="p"
        color="white"
      />
    </Button>
  );
};
