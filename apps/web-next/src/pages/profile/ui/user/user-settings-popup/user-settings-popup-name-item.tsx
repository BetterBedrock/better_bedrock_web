import { Field } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Popup } from "@/shared/ui/popup";

import styles from "./user-settings-popup.module.scss";
import { FieldError, UseFormRegister } from "react-hook-form";
import { UserSettingsPopupSchema } from "@/pages/profile/ui/user/user-settings-popup/user-settings-popup-schema";

interface UserSettingsPopupNameItemProps {
  register: UseFormRegister<UserSettingsPopupSchema>;
  error?: FieldError;
}

export const UserSettingsFormNameItem = ({
  register,
  error,
}: UserSettingsPopupNameItemProps) => (
  <Popup.Item>
    <Field name="Username" error={error}>
      <Input
        sub
        placeholder="Name"
        className={styles.input}
        {...register("name")}
      />
    </Field>
  </Popup.Item>
);
