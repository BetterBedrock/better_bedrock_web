import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { useCheckout } from "~/providers/checkout";
import { Routes } from "~/utils/routes";

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
    <main>
      <BedrockText
        type="h1"
        text="Payment Finished Successfuly"
        color="white"
        font="MinecraftTen"
      />
      <BedrockText
        type="p"
        color="white"
        text={
          "You successfully completed your payment. Thank you for your support! If you have any questions or need assistance, please reach out to us."
        }
      />
      <Button
        text="Return to Home"
        width="100%"
        height="auto"
        type="alwaysGreen"
        style={{ paddingTop: "1rem" }}
        onTap={() => {
          navigate(Routes.HOME);
        }}
      />
    </main>
  );
};
