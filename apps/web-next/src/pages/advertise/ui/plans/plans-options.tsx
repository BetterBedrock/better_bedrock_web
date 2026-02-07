"use client"

import { useState } from "react";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Button } from "@/shared/ui/button/button";
import { Banner } from "@/shared/ui/banner";

import { offersData, PlanDuration } from "../../model/offers-data";
import { OfferCard } from "./model/offer-card";
import styles from "./plans.module.scss";

export const PlansOptions = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanDuration>("weekly");

  const isWeekly = selectedPlan === "weekly";

  return (
    <>
      <div>
        <ButtonGroup direction="responsive">
          <Button
            width="100%"
            type="dark"
            center
            isClicked={selectedPlan === "weekly"}
            onClick={() => setSelectedPlan("weekly")}
          >
            <BedrockText text="Weekly" type="p" color="white" />
          </Button>
          <Button
            width="100%"
            type="dark"
            center
            isClicked={selectedPlan === "monthly"}
            onClick={() => setSelectedPlan("monthly")}
          >
            <BedrockText text="Monthly (Save ~20%)" type="p" color="white" />
          </Button>
        </ButtonGroup>
      </div>

      <div className={styles.offers}>
        <Banner
          type={isWeekly ? "error" : "success"}
          message={
            <BedrockText
              text={isWeekly
                ? "💡 Pro Tip: Switch to Monthly and save ~20% instantly!"
                : "✅ Smart Choice! You are saving ~20% vs Weekly."
              }
              type="p"
              color="white"
            />
          }
        />

        {offersData.map((offer, index) => (
          <OfferCard key={index} data={offer} plan={selectedPlan} />
        ))}
      </div>
    </>
  );
};
