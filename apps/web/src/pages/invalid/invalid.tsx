import Footer from "../../components/bedrock/Footer";
import { StaticPage } from "~/components/bedrock/page-container/static-page";
import backgroundImg from "../../assets/images/crosshair_backgrounds/1.png";
import { Header } from "../../components/invalid/header"

export const Invalid = () => {
  return (
    <>
      <StaticPage backgroundUrl={backgroundImg} useFullHeight={true}>
        <Header />
      </StaticPage >
      <Footer />
    </>
  );
};
