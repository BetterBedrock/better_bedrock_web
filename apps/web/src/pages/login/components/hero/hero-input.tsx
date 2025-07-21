import { Input } from "~/components/bedrock/input";
import { styles } from ".";

interface HeroInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const HeroInput = ({ value, onChange }: HeroInputProps) => (
  <Input
    placeholder="Password"
    className={styles.input}
    value={value}
    onChange={e => onChange(e.target.value)}
    type="password"
  />
);