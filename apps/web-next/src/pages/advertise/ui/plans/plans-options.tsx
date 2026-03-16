"use client"

import { useState } from "react";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Banner } from "@/shared/ui/banner";

import { offersData, PlanDuration } from "../../model/offers-data";
import { OfferCard } from "./model/offer-card";
import { PlansActions } from "./plans-actions";
import styles from "./plans.module.scss";

export const PlansOptions = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanDuration>("weekly");

  const isWeekly = selectedPlan === "weekly";

  return (
    <div className={styles.optionsContainer}>
      <Banner
        type={isWeekly ? "error" : "success"}
        message={
          <BedrockText
            text={isWeekly
              ? "💡 Pro Tip: Switch to Monthly and save ~20% instantly!"
              : "✅ Smart Choice! You are saving ~20% compared to weekly billing."
            }
            type="p"
            color="white"
          />
        }
      />
      
      <PlansActions selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />

      {offersData.map((offer, index) => (
        <OfferCard key={index} data={offer} plan={selectedPlan} />
      ))}
    </div>
  );
};
