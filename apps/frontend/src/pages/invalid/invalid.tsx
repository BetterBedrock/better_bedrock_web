import { useState } from "react";
import Footer from "../../components/bedrock/Footer";
import { StaticPage } from "components/bedrock/page-container/static-page";
import backgroundImg from "../../assets/images/crosshair_backgrounds/1.png";
import styles from "./invalid.module.css";
import { Header } from "../../components/invalid/header"

export const Invalid = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <StaticPage backgroundUrl={backgroundImg} useFullHeight={true}>
        <Header />
      </StaticPage >
      <Footer />
    </>
  );
};
