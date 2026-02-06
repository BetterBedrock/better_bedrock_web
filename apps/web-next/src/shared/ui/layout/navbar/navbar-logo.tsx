import { Link } from "@/shared/ui/link";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { SimpleButton } from "@/shared/ui/simple-button";
import { NavbarDivider } from "./navbar-divider";
import { Routes } from "@/shared/lib/utils";
import FavIcon from "@/public/images/favicon.png";
import styles from "./navbar.module.scss";
import clsx from "clsx";
import Image from "next/image";

interface NavbarLogoProps {
  expandedNavbar: boolean;
  handleExpandNavbar: (value?: boolean) => void;
}

export const NavbarLogo = ({
  expandedNavbar,
  handleExpandNavbar,
}: NavbarLogoProps) => (
  <div className={clsx(styles.logoWrapper, styles.mobile)}>
    <Link
      className={clsx(styles.logoWrapper, styles.imageContainer)}
      link={Routes.HOME}
      hideStyles
    >
      <img alt="logo" src={FavIcon.src} className={styles.image} />
      <BedrockText
        text="Better Bedrock"
        type="p"
        font="Minecraft"
        headerSize
        extraClassName={styles.heading}
      />
    </Link>
    <div className={styles.mobileMenu}>
      <NavbarDivider />
      <SimpleButton
        height="100%"
        onTap={handleExpandNavbar}
        className={styles.menuButton}
        isClicked={expandedNavbar}
      >
        <Image src="/svgs/menu.svg" height={24} width={24} alt="menu" />
      </SimpleButton>
    </div>
  </div>
);
