import "./Footer.css";
import { Label } from "./label";
import { BedrockText } from "./text/bedrock-text";

interface FooterProps {
  width?: string;
}

const Footer: React.FC<FooterProps> = ({ width = "auto" }) => {
  return (
    <footer id="footer">
      <Label width={width}>
        <div className="footer-text">
          <BedrockText
            text="Copyright © Better Bedrock | All rights reserved | Not affiliated with Mojang Studios"
            type={"p"}
          />
        </div>
      </Label>
    </footer>
  );
};

export default Footer;
