import { Button } from "~/components/bedrock/button";
import { Popup } from "~/components/bedrock/popup";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { CardDivider } from "~/components/bedrock/card";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { useState } from "react";
import { DownloadMethodCard } from "~/components/bedrock/download-method-card/download-method-card";
import { useContent } from "~/providers/content";
import { DownloadsItemDto } from "@better-bedrock/constants/downloads.dto";
import { useCheckout } from "~/providers/checkout";
// import { PaymentElement } from "@stripe/reacyt-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RYRswQKPqpU2QRoIVVEbYgYf1YzV8st0HFlZu8PotvTYB2YAlbJ6tyS6YKfvzwkUJtljg8DqjCZz5UoObyCrDe200FEnpIeiU",
);

interface HeroPopupProps {
  downloadItem: DownloadsItemDto;
  onClose?: () => void;
}

export const HeroPopup = ({ onClose, downloadItem }: HeroPopupProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month">("week");
  const [showCheckout, setShowCheckout] = useState(false);
  const { generateDownload, openLinkvertise } = useContent();
  const { createSession } = useCheckout();

  const purchase = async () => {
    try {
      // 1. createSession should now return an object like { sessionId: 'cs_test_...' }
      const session = await createSession();
      if (!session || !session.sessionId) {
        console.error("Failed to create a checkout session.");
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe.js has not loaded yet.");
        return;
      }

      // 2. Use the sessionId directly
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (error) {
        // If `redirectToCheckout` fails due to a browser issue or network error,
        // display the error message to your customer.
        console.error("Stripe redirectToCheckout error:", error.message);
      }
    } catch (error) {
      console.error("An error occurred during the purchase process:", error);
    }
  };

  const download = async () => {
    await generateDownload(downloadItem.downloadId);
    openLinkvertise();
  };

  const weekPrices = (
    <>
      <div className={styles.part}>
        <ButtonGroup direction="vertical">
          <DownloadMethodCard
            buttonType="alwaysWhite"
            price="1$"
            description="Get 50 Ad Free Downloads For One Week (Better Bedrock Content Only)"
            onClick={async () => {
              setShowCheckout(true);
              await purchase();
            }}
          />
          <DownloadMethodCard
            buttonType="alwaysWhite"
            price="2$"
            description="Get 50 Ad Free Downloads For One Week (Everything)"
          />
        </ButtonGroup>
      </div>
      <CardDivider />
      <div className={styles.part}>
        <ButtonGroup direction="vertical">
          <DownloadMethodCard
            buttonType="alwaysGreen"
            price="5$"
            description="Download Everything Ad Free For One Week + Discord VIP Role"
            onClick={download}
          />
          <DownloadMethodCard
            buttonType="alwaysWhite"
            price="Free"
            description="Download After Watching Ads"
            onClick={download}
          />
        </ButtonGroup>
      </div>
    </>
  );

  const monthPrices = (
    <>
      <div className={styles.part}>
        <ButtonGroup direction="vertical">
          <DownloadMethodCard
            buttonType="alwaysWhite"
            price="3$"
            description="Get 50 Ad Free Downloads For One Month (Better Bedrock Content Only)"
          />
          <DownloadMethodCard
            buttonType="alwaysWhite"
            price="5$"
            description="Get 50 Ad Free Downloads For One Month (Everything)"
          />
        </ButtonGroup>
      </div>
      <CardDivider />
      <div className={styles.part}>
        <ButtonGroup direction="vertical">
          <DownloadMethodCard
            buttonType="alwaysGreen"
            price="10$"
            description="Download Everything Ad Free For One Month + Discord VIP Role"
            onClick={download}
          />
          <DownloadMethodCard
            buttonType="alwaysWhite"
            price="Free"
            description="Download After Watching Ads"
            onClick={download}
          />
        </ButtonGroup>
      </div>
    </>
  );

  return (
    <Popup onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.part}>
          <BedrockText
            text="Download Method"
            type="h2"
            color="white"
            font="Minecraft"
            textAlign="left"
          />
          <BedrockText text="Lorem ipsum dolor sit amet" type="p" color="white" textAlign="left" />
          <ButtonGroup>
            <Button
              type="alwaysBlack"
              text="Week"
              className={styles.button}
              isClicked={selectedTimeframe === "week"}
              onClick={() => setSelectedTimeframe("week")}
            />
            <Button
              type="alwaysBlack"
              text="Month"
              className={styles.button}
              isClicked={selectedTimeframe === "month"}
              onClick={() => setSelectedTimeframe("month")}
            />
          </ButtonGroup>
        </div>
        <CardDivider />
        {/* <PaymentElement /> */}

        {!showCheckout && selectedTimeframe === "week" ? weekPrices : monthPrices}
      </div>
    </Popup>
  );
};
