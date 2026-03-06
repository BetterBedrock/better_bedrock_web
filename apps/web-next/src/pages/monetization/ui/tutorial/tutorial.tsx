"use client"

import { useState } from "react";
import { TutorialParts } from "./tutorial-parts";
import { Card } from "@/shared/ui/card";

import { TutorialTitle } from "./tutorial-title";
import { TutorialDescription } from "./tutorial-description";
import { TutorialActions } from "./tutorial-actions";
import { TutorialBanner } from "./tutorial-banner";

export const Tutorial = () => {
  const [selectedProvider, setSelectedProvider] = useState<'linkvertise' | 'lootlabs'>('lootlabs');

  return (
    <Card fullWidth>
      <Card.Body>
        <TutorialTitle />
        <TutorialDescription />
      </Card.Body>
      <Card.Divider />
      <Card.Body gap="md">
        <TutorialActions 
          selectedProvider={selectedProvider}
          onProviderChange={setSelectedProvider}
        />
        <TutorialBanner selectedProvider={selectedProvider} />
        <TutorialParts selectedProvider={selectedProvider} />
      </Card.Body>
    </Card>
  );
};
