import { useState } from "react";
import { HeroHeader, HeroInput, HeroActions } from ".";
import { styles } from ".";

export const Hero = () => {
  const [password, setPassword] = useState("");

  return (
    <div className={styles.wrapper}>
      <HeroHeader />
      <HeroInput value={password} onChange={setPassword} />
      <HeroActions password={password} />
    </div>
  );
};