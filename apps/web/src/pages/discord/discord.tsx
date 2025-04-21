import Footer from "../../components/bedrock/Footer";
import { StaticPage } from "~/components/bedrock/page-container/static-page";
import backgroundImg from "~/assets/images/crosshair_backgrounds/4.png";
import { Header } from "../../components/discord/header"
import { useEffect } from "react";

export const Discord = () => {
  useEffect(() => {
    window.location.href = "https://discord.gg/ZGK5WYXnEY";
    // window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")
  }, []);

  return (
    <>
      <StaticPage backgroundUrl={backgroundImg} useFullHeight={true}>
        <Header />
      </StaticPage >
      <Footer />
    </>
  );
};
