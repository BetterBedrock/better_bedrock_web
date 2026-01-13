import { Link } from "@/components/link";
import { BedrockText } from "@/components/bedrock-text";
import { SimpleButton } from "@/components/simple-button";
import { NavbarDivider } from "./navbar-divider";
import FavIcon from "@/public/images/favicon.png";
import styles from "./navbar.module.scss";
import clsx from "clsx";
import { Routes } from "@/utils/routes";

interface NavbarLogoProps {
    expandedNavbar: boolean;
    handleExpandNavbar: () => void;
}

export const NavbarLogo = ({ expandedNavbar, handleExpandNavbar }: NavbarLogoProps) => (
    <div className={clsx(styles.logoWrapper, styles.mobile)}>
        <Link className={clsx(styles.logoWrapper, styles.imageContainer)} link={Routes.HOME} hideStyles>
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
                {/* todo fix missing material icons font?  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> */}
                <div className={clsx("material-icons", styles.menu)}>menu</div>
            </SimpleButton>
        </div>
    </div>
);
