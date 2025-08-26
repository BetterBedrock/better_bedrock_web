import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ProjectDto, VoucherDto } from "~/lib/api";
import { useCheckout } from "~/providers/checkout";
import { useDownload } from "~/providers/download";
import { useNotification } from "~/providers/notification";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface usePreviewPopupProps {
  project: ProjectDto;
  onClose?: () => void;
}

export const usePreviewPopup = ({ project, onClose }: usePreviewPopupProps) => {
  const { sendNotification } = useNotification();
  const navigate = useNavigate();
  const [cookie, setVoucher] = useCookies(["voucher"]);

  const [voucherCode, setVoucherCode] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>(undefined);

  const { generateDownload, openLinkvertise, getLinkvertiseUrl } = useDownload();
  const { createSession, offers, activateVoucher } = useCheckout();
  const { findUserById } = useUser();

  const isBetterBedrockItem = project.betterBedrockContent;

  const useVoucher = async () => {
    const voucher = await activateVoucher(undefined, voucherCode);
    if (voucher) {
      setVoucher("voucher", voucher);
      sendNotification({
        title: "Voucher Activated",
        label: "You succesfully activated your voucher",
        type: "success",
      });
      onClose?.();
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
    await generateDownload(project);
    const creator = await findUserById(project.userId);
    if (verifyVoucher()) {
      navigate(Routes.FETCH);
      return;
    }

    const linkvertiseId = creator?.customLinkvertise
      ? (creator.linkvertiseId ?? import.meta.env.VITE_LINKVERTISE_ID)
      : import.meta.env.VITE_LINKVERTISE_ID;

    openLinkvertise(linkvertiseId);
  };

  const getLinkvertiseId = async (): Promise<string> => {
    const creator = await findUserById(project.userId);

    const linkvertiseId = creator?.customLinkvertise
      ? (creator.linkvertiseId ?? import.meta.env.VITE_LINKVERTISE_ID)
      : import.meta.env.VITE_LINKVERTISE_ID;

    return getLinkvertiseUrl(linkvertiseId);
  };

  useEffect(() => {
    if (verifyVoucher()) {
      generateDownload(project).then(() => {
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

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await useVoucher();
    }
  };

  return {
    categories,
    handleKeyDown,
    selectedTimeframe,
    setSelectedTimeframe,
    voucherCode,
    setVoucherCode,
    useVoucher,
    download,
    getLinkvertiseId,
    purchase,
    cookie,
  };
};
