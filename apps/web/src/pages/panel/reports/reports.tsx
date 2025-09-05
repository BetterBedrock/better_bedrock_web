import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { useEffect, useState } from "react";
import { ReportDto } from "~/lib/api";
import { useReport } from "~/providers/report";
import { ReportCard } from "~/components/bedrock/report-card";

export const Reports = () => {
  const { fetchReports } = useReport();
  const [reports, setReports] = useState<ReportDto[]>();

  useEffect(() => {
    fetchReports().then((data) => setReports(data));
  }, []);

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed center>
        <Hero />
        <div className={styles.projects}>
          {reports?.map((report, index) => (
            <ReportCard key={index} report={report} />
          ))}
        </div>
      </Section>
    </main>
  );
};
