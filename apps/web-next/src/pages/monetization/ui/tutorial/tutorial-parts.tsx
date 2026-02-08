import Markdown from "react-markdown";
import { Card } from "@/shared/ui/card";
import { tutorialData } from "../../model/tutorial-data";

import styles from "./tutorial.module.scss";

interface TutorialPartsProps {
  selectedProvider: 'linkvertise' | 'lootlabs';
}

export const TutorialParts = ({ selectedProvider }: TutorialPartsProps) => {
  const providerData = tutorialData[selectedProvider];

  return (
    <div className={styles.parts}>
      {providerData.steps.map((step, index) => (
        <Card key={step.title} sub className={styles.sub}>
          <Card.Body>
            <Markdown>{`## ${index + 1}. ${step.title}\n${step.content}`}</Markdown>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
