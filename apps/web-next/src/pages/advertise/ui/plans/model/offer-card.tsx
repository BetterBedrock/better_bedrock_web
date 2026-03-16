import { Button } from "@/shared/ui/button";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { OfferData, PlanDuration } from "../../../model/offers-data";
import styles from "./offer-card.module.scss";
import Image from "next/image";

interface OfferCardProps {
  data: OfferData;
  plan: PlanDuration;
}

const getTextColor = (color: OfferData["color"]) =>
  color === "white" || color === "gold" ? "black" : "white";

const getPrice = (data: OfferData, plan: PlanDuration) =>
  plan === "weekly" ? data.weeklyPrice : data.monthlySalePrice;

export const OfferCard = ({ data, plan }: OfferCardProps) => {
  const textColor = getTextColor(data.color);
  const currentPrice = getPrice(data, plan);
  const isMonthly = plan === "monthly";

  return (
    <Button
      className={`${styles.offerCard}`}
      width="100%"
      height="auto"
      type={data.color}
      disabled={false}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <BedrockText
              text={`${data.title}:`}
              type="h2"
              font="Minecraft"
              textAlign="left"
              color={textColor}
              extraClassName={styles.inlineText}
            />
            {" "}
            {isMonthly && data.id !== "exclusive" && (
              <>
                <BedrockText
                  text={`${data.monthlyPrice}€`}
                  type="h3"
                  font="Minecraft"
                  textAlign="left"
                  color={textColor}
                  extraClassName={`${styles.strikeThrough} ${styles.inlineText}`}
                />
                {" "}
              </>
            )}

            <BedrockText
              text={data.id === "exclusive" ? "Contact Us" : `${currentPrice}€`}
              type="h2"
              font="Minecraft"
              textAlign="left"
              color={textColor}
              extraClassName={styles.inlineText}
            />
          </div>
          
          {data.tags && data.tags.length > 0 && (
            <div className={styles.tagsContainer}>
              {data.tags.map((tag) => (
                <p key={tag} className={`${styles.tag} ${styles[data.color] || ''}`}>
                  {tag}
                </p>
              ))}
            </div>
          )}

          <BedrockText
            text={data.description}
            type="p"
            textAlign="left"
            color={textColor}
          />
        </div>

        <div className={styles.benefits}>
          <BedrockText
            text="Benefits:"
            type="h3"
            font="Minecraft"
            textAlign="left"
            color={textColor}
          />

          {data.benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitRow}>
              <Image
                src="/icons/checkmark2.png"
                alt="Checkmark"
                width={24}
                height={24}
                className={`${styles.iconImage} ${data.color !== "green" ? styles.iconBlack : ''}`}
              />
              <BedrockText
                text={`${benefit.label}:`}
                color={textColor}
                type="p"
                font="MojanglesBold"
                textAlign="left"
                extraClassName={styles.benefit}
              >
                <BedrockText
                  text={` ${benefit.value}`}
                  color={textColor}
                  type="span"
                  textAlign="left"
                  extraClassName={styles.benefit}
                />
              </BedrockText>
            </div>
          ))}
        </div>

        {isMonthly && !(data.id === "exclusive") && (
          <BedrockText
            text="-20%"
            type="h2"
            font="Minecraft"
            extraClassName={styles.discountBadge}
          />
        )}
      </div>
    </Button>
  );
};
