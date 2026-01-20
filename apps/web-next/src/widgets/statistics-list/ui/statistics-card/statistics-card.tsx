"use client";

import { BedrockText, styles } from "@/shared/ui/bedrock-text";
import { ButtonGroup } from "@/shared/ui/button-group/button-group";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";

import { useState, useEffect } from "react";
import { Collapsible } from "@/shared/ui/collapsible";
import { FData, StatisticsCardProps, transformToFData } from "@/widgets/statistics-list/ui/statistics-card/use-statistics-card";
import { Button } from "@/shared/ui/button";
import { BarChart } from "@/widgets/statistics-list/ui/bar-chart/bar-chart";

export const DATA_RANGE_OPTIONS = [
  { label: "7d", text: "Last 7 Days" },
  { label: "14d", text: "Last 14 Days" },
  { label: "30d", text: "Last 30 Days" },
  { label: "6m", text: "Last 6 Months" },
  { label: "ytd", text: "This Year" },
  { label: "all", text: "All Time" },
];

export const StatisticsCard = ({
  name,
  data = [],
  showGraph = true,
  suffix = "",
  ...props
}: StatisticsCardProps) => {
  const LOCAL_STORAGE_KEY = `statisticsCard_toggleGraph_${name}`;
  const [toggleGraph, setToggleGraph] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored !== null) {
      setToggleGraph(stored === "true");
    }
    setLoaded(true);
  }, [LOCAL_STORAGE_KEY]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, String(toggleGraph));
    }
  }, [toggleGraph, LOCAL_STORAGE_KEY, loaded]);

  const [category, setCategory] = useState(DATA_RANGE_OPTIONS[0].label);

  let total = 0;
  let fdata: FData | null = null;

  if (typeof data === "number") {
    total = data;
  } else {
    fdata = transformToFData(data, category);
    total = fdata.categories[0].pieces.reduce((sum, p) => sum + p.value, 0);
  }

  return (
    <Card {...props} sub>
      <CardBody smallerPadding>
        <BedrockText
          extraClassName={styles.name}
          type="h3"
          text={name.replace("_", " ")}
          textAlign="left"
          color="white"
          font="Minecraft"
        />
        <BedrockText
          key={total}
          type="p"
          text={`${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })}${suffix}`}
          textAlign="left"
          color="white"
          extraClassName={styles.highlight}
        />
      </CardBody>
      {fdata && loaded && (
        <>
          <CardDivider sub />
          <CardBody gap>
            <div className={styles.buttons}>
              <Collapsible
                className={styles.collapsible}
                floating
                headerText={
                  DATA_RANGE_OPTIONS.find((d) => d.label === category)?.text ??
                  "No Data Range"
                }
                contentText=""
                width="100%"
                limit
              >
                <ButtonGroup direction="vertical">
                  {DATA_RANGE_OPTIONS.map((c) => (
                    <Button
                      key={c.label}
                      type="dark"
                      width="100%"
                      isClicked={c.label === category}
                      onClick={() => setCategory(c.label)}
                      center
                    >
                      <BedrockText type="p" color="white" text={c.text} />
                    </Button>
                  ))}
                </ButtonGroup>
              </Collapsible>
              {showGraph && (
                <Button
                  className={styles.chartButton}
                  type="white"
                  onClick={() => setToggleGraph((prev) => !prev)}
                  center
                >
                  <BedrockText
                    text={toggleGraph ? "Hide" : "Show"}
                    type="p"
                    color="black"
                  />
                </Button>
              )}
            </div>
            {toggleGraph && showGraph && loaded && (
              <BarChart
                direction="horizontal"
                data={fdata}
                category={category}
              />
            )}
          </CardBody>
        </>
      )}
    </Card>
  );
};
