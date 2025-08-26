import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { CardDivider } from "~/components/bedrock/card";
import { Popup } from "~/components/bedrock/popup";
import { styles } from ".";
import { Input } from "~/components/bedrock/input";
import { InputSwitch } from "~/components/bedrock/input/input-switch";
import { useState } from "react";
import z from "zod";
import { UserDto } from "~/lib/api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";
import { useAuth } from "~/providers/auth";

const schema = z.object({
  name: z.string(),
  bio: z.string(),
  customLinkvertise: z.boolean(),
  linkvertiseId: z.string().nullable(),
  linkvertiseSecret: z.string().nullable(),
});

type FormValues = z.infer<typeof schema>;

interface UserSettingsFormProps {
  onClose: () => void;
  onSave: (data: FormValues) => void;
  user: UserDto;
}

export const UserSettingsForm = ({ onClose, onSave, user }: UserSettingsFormProps) => {
  const { logout } = useAuth();
  const [showLinkvertiseOptions, setShowLinkvertiseOptions] = useState(
    user.customLinkvertise ?? false,
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: user,
    resolver: zodResolver(schema),
  });

  console.log({ errors });

  const onClickSubmit = handleSubmit(onSave);

  return (
    <Popup onClose={onClose} title="Account Settings">
      <form onSubmit={onClickSubmit}>
        <div className={styles.part}>
          <div className={styles.input}>
            <BedrockText textAlign="start" text="User name" type="p" color="white" />
            <Input placeholder="Name" className={styles.input} {...register("name")} />
            {errors["name"] && (
              <BedrockText
                type="p2"
                extraClassName={styles.error}
                text={errors["name"]?.message as string}
                textAlign="start"
              />
            )}
          </div>

          <div className={styles.input}>
            <BedrockText textAlign="start" text="Bio" type="p" color="white" />
            <Input
              placeholder="Profile description..."
              className={styles.input}
              {...register("bio")}
            />

            {errors["bio"] && (
              <BedrockText
                type="p2"
                extraClassName={styles.error}
                text={errors["bio"]?.message as string}
                textAlign="start"
              />
            )}
          </div>

          <div>
            <BedrockText
              textAlign="start"
              text="Custom Linkvertise (allows you to receive 100% of ad money to your account)"
              type="p"
              color="white"
            />
            <Link link={Routes.HOME}>
              <BedrockText
                textAlign="start"
                text="Learn how to make money with your projects"
                type="p2"
                extraClassName={styles.link}
              />
            </Link>
            <Controller
              name="customLinkvertise"
              control={control}
              render={({ field }) => (
                <InputSwitch
                  placeholder="Custom Linkvertise"
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    setShowLinkvertiseOptions(e.target.checked);
                  }}
                />
              )}
            />
          </div>

          {showLinkvertiseOptions && (
            <>
              <div className={styles.input}>
                <BedrockText textAlign="start" text="Linkvertise User Id" type="p" color="white" />
                <Input
                  placeholder="Linkvertise User Id"
                  className={styles.input}
                  {...register("linkvertiseId")}
                />

                {errors["linkvertiseId"] && (
                  <BedrockText
                    type="p2"
                    extraClassName={styles.error}
                    text={errors["linkvertiseId"]?.message as string}
                    textAlign="start"
                  />
                )}
              </div>
              <div className={styles.input}>
                <BedrockText textAlign="start" text="Linkvertise Secret" type="p" color="white" />
                <Input
                  placeholder="Linkvertise Secret"
                  className={styles.input}
                  type="password"
                  {...register("linkvertiseSecret")}
                />

                {errors["linkvertiseSecret"] && (
                  <BedrockText
                    type="p2"
                    extraClassName={styles.error}
                    text={errors["linkvertiseSecret"]?.message as string}
                    textAlign="start"
                  />
                )}
              </div>
            </>
          )}
        </div>

        <CardDivider />
        <div className={styles.part}>
          <Button type="green" buttonType="submit" center width="100%">
            <BedrockText type="p" text="Save Settings" color="white" />
          </Button>
          <Button type="dark" width="100%" center onClick={logout}>
            <BedrockText type="p" text="Logout" color="white" />
          </Button>
        </div>
      </form>
    </Popup>
  );
};
