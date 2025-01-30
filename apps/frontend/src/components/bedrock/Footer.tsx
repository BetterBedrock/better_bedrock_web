import "./Footer.css";
import { Label } from "./label";
import { BedrockText } from "./text/bedrock-text";

interface FooterProps {
  width: string;
}

const Footer: React.FC<FooterProps> = ({ width }) => {
  return (
    <footer>
      <Label width={width}>
        <div className="footer-text">
          <BedrockText
            text="Copyright © Better Bedrock | All rights reserved | Not affiliated with
        Mojang Studios"
            type={"p"}
            textAlign="center"
          />
        </div>
      </Label>
    </footer>
  );
};

export default Footer;
