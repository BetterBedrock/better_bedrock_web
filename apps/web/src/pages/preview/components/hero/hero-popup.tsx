import { Button } from "~/components/bedrock/button";
import { Popup } from "~/components/bedrock/popup";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { CardDivider } from "~/components/bedrock/card";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { useEffect, useState } from "react";
import { DownloadMethodCard } from "~/components/bedrock/download-method-card/download-method-card";
import { useContent } from "~/providers/content";
import { DownloadsItemDto } from "@better-bedrock/constants/downloads.dto";
import { useCheckout } from "~/providers/checkout";
// import { PaymentElement } from "@stripe/reacyt-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { useNotification } from "~/providers/notification";
import { VoucherDto } from "@better-bedrock/constants/voucher.dto";
import { Input } from "~/components/bedrock/input";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface HeroPopupProps {
  downloadItem: DownloadsItemDto;
  onClose?: () => void;
}

export const HeroPopup = ({ onClose, downloadItem }: HeroPopupProps) => {
  const { sendNotification } = useNotification();
  const navigate = useNavigate();
  const [cookie, setVoucher] = useCookies(["voucher"]);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>(undefined);
  const { generateDownload, openLinkvertise, downloads } = useContent();
  const { createSession, offers, activateVoucher } = useCheckout();

  const isBetterBedrockItem = downloads?.main.flatMap((list) => list.items).includes(downloadItem);

  const useVoucher = async () => {
    const voucher = await activateVoucher(undefined, voucherCode);
    if (voucher) {
      setVoucher("voucher", voucher);
      sendNotification({
        title: "Voucher Activated",
        label: "You succesfully activated your voucher",
        type: "success",
      });
    }
  };

  const purchase = async (priceId: string) => {
    try {
      // 1. createSession should now return an object like { sessionId: 'cs_test_...' }
      const session = await createSession(priceId);
      if (!session || !session.checkoutId) {
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
        sessionId: session.checkoutId,
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

  const verifyVoucher = (): boolean => {
    if (!cookie.voucher) {
      return false;
    }

    try {
      if ((cookie.voucher as VoucherDto).betterBedrockContentOnly && !isBetterBedrockItem) {
        sendNotification({
          title: "Cannot Apply Voucher",
          label: "Your voucher allows to download only better bedrock content without ads.",
          type: "info",
        });

        return false;
      }
      sendNotification({
        title: "Applied Voucher",
        label: "You just used your voucher to download this content.",
        type: "success",
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  };

  const download = async () => {
    await generateDownload(downloadItem.downloadId);

    if (verifyVoucher()) {
      navigate(Routes.FETCH);
      return;
    }
    openLinkvertise();
  };

  useEffect(() => {
    if (verifyVoucher()) {
      generateDownload(downloadItem.downloadId).then(() => {
        navigate(Routes.FETCH);
      });
    }
  }, []);

  const categories = offers?.offers;

  useEffect(() => {
    if (selectedTimeframe === undefined) {
      if (!categories || !categories[0]) {
        return;
      }
      setSelectedTimeframe(categories![0].title);
    }
  }, []);

  if (cookie.voucher || selectedTimeframe === undefined) {
    if (cookie.voucher satisfies VoucherDto) {
      if (!cookie.voucher.betterBedrockContentOnly) {
        if (onClose) onClose!();
        return <></>;
      }
      //   if (!(cookie.voucher.betterBedrockContentOnly && !isBetterBedrockItem)) {
      //     return <></>;
      //   }
    }
    if (!cookie.voucher) {
      return <></>;
    }
  }

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Optional: prevent form submission
      await useVoucher();
    }
  };

  return (
    <Popup onClose={onClose} title="Download Method">
      <div className={styles.container}>
        <div className={styles.part}>

          {/* <BedrockText text="Choose your download method you will use to download selected content" type="p" color="white" textAlign="left" /> */}
          <ButtonGroup>
            {categories!.map((category, index) => (
              <Button
                key={index}
                type="alwaysBlack"
                text={category.title}
                className={styles.button}
                isClicked={selectedTimeframe === category.title}
                onClick={() => setSelectedTimeframe(category.title)}
              />
            ))}
          </ButtonGroup>
          <div className={styles.voucher}>
            <Input
              placeholder="Voucher Code"
              className={styles.input}
              value={voucherCode}
              onKeyDown={handleKeyDown}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <Button text="Apply" type="alwaysBlack" onClick={useVoucher} />
          </div>
        </div>
        <CardDivider />
        {/* <PaymentElement /> */}
        {/* {selectedTimeframe === "week" ? weekPrices : monthPrices} */}
        <div className={styles.part}>
          <ButtonGroup direction="vertical">
            {categories
              ?.find((category) => category.title === selectedTimeframe)
              ?.items.map((item, index) => (
                <DownloadMethodCard
                  key={index}
                  buttonType={item.priceOption.featured ? "alwaysGreen" : "alwaysWhite"}
                  price={`${item.priceOption.price}$`}
                  description={item.priceOption.label}
                  onClick={() => purchase(item.priceId)}
                />
              ))}
          </ButtonGroup>
        </div>
        <CardDivider />
        <div className={styles.part}>
          <DownloadMethodCard
            buttonType="alwaysWhite"
            price="Free"
            description="Download After Watching Ads"
            onClick={download}
          />
        </div>
      </div>
    </Popup>
  );
};
