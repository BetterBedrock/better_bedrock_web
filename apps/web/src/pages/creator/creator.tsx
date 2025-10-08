import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { useAuth } from "~/providers/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";

export const Editor = () => {
  const {user, fetched} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user && fetched) {
      navigate(Routes.LINKVERTISE);
    }
  }, [user, fetched]);

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed center>
        <Hero />
      </Section>
    </main>
  );
};
