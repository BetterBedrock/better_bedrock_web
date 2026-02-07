import { Button } from "@/shared/ui/button";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { OfferData, PlanDuration } from "../../../model/offers-data";
import styles from "./offer-card.module.scss";

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
      width="100%"
      height="auto"
      type={data.color}
      lockClicking={true}
      playSound={false}
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
            />

            {isMonthly && (
              <BedrockText
                text={`${data.monthlyPrice}€`}
                type="h3"
                font="Minecraft"
                textAlign="left"
                color={textColor}
                extraClassName={styles.strikeThrough}
              />
            )}

            <BedrockText
              text={`${currentPrice}€`}
              type="h2"
              font="Minecraft"
              textAlign="left"
              color={textColor}
            />
          </div>

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
            <BedrockText
              key={index}
              text={`- ${benefit.label}:`}
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
          ))}
        </div>
      </div>
    </Button>
  );
};
