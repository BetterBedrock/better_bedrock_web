import { HeroLoginButton } from "@/pages/login/ui/hero/hero-login-button";
import { HeroHeader } from "./hero-header";
import styles from "./hero.module.scss";

export const Hero = () => (
  <div className={styles.wrapper}>
    <HeroHeader />
    <HeroLoginButton />
  </div>
);
