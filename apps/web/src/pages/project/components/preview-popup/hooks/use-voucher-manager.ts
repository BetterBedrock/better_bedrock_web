import { useState, useEffect, KeyboardEvent } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ProjectDto, VoucherDto } from "~/lib/api";
import { useCheckout } from "~/providers/checkout";
import { useDownload } from "~/providers/download";
import { useNotification } from "~/providers/notification";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";


interface usePreviewPopupProps {
  project: ProjectDto;
  onClose?: () => void;
}

export const useVoucherManager = ({ project, onClose }: usePreviewPopupProps) => {
  const { sendNotification } = useNotification();
  const navigate = useNavigate();
  const [cookie, setVoucher] = useCookies(["voucher"]);

  const [voucherCode, setVoucherCode] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>(undefined);

  const { generateDownload, openLinkvertise, getLinkvertiseUrl } = useDownload();
  const { offers, activateVoucher } = useCheckout();
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

    await openLinkvertise(linkvertiseId);
  };

  const getLinkvertiseId = async (): Promise<string> => {
    const creator = await findUserById(project.userId);

    let linkvertiseId = import.meta.env.VITE_LINKVERTISE_ID;

    if(creator?.customLinkvertise && creator?.linkvertiseId && creator.linkvertiseId.trim().length > 0) {
      linkvertiseId = creator.linkvertiseId;
    }

    return await getLinkvertiseUrl(linkvertiseId);
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

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
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
    cookie,
  };
};
