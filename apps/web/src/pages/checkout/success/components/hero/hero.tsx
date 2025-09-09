import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { useCheckout } from "~/providers/checkout";
import { Routes } from "~/utils/routes";
import { styles } from ".";

export const Hero = () => {
  const navigate = useNavigate();
  const [__, setCookie] = useCookies(["voucher"]);
  const [searchParams, _] = useSearchParams();
  const { activateVoucher } = useCheckout();

  useEffect(() => {
    activateVoucher(searchParams.get("checkoutId") || "").then((voucher) => {
      if (voucher === null) {
        return;
      }

      setCookie("voucher", voucher);
    });
  }, []);

  return (
    <div>
      <BedrockText
        type="h1"
        text="Payment Finished Successfuly"
        color="white"
        font="Minecraft"
      />
      <BedrockText
        type="p"
        color="white"
        text={
          "You successfully completed your payment. Thank you for your support! If you have any questions or need assistance, please reach out to us."
        }
      />
      <Button
        width="100%"
        height="auto"
        className={styles.return}
        type="green"
        onClick={() => navigate(Routes.HOME)}
        center
      >
        <BedrockText text="Return to Home" type="p" color="white" />
      </Button>
    </div>
  );
};
