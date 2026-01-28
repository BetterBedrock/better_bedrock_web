"use client";

import { useState } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Card, CardBody } from "@/shared/ui/card";
import { MonetizationType, UserDto } from "@/shared/lib/openapi";
import { useAuth } from "@/app/providers/auth";
import { capitalizeFirstLetter, Routes } from "@/shared/lib/utils";
import { Popup } from "@/shared/ui/popup";
import { Input, InputSwitch } from "@/shared/ui/input";
import { Link } from "@/shared/ui/link";
import { useRouter } from "next/navigation";
import { manageProfile, updateProfile } from "@/entities/user";

import styles from "./user.module.scss";
import { Collapsible } from "@/shared/ui/collapsible";
import { ButtonGroup } from "@/shared/ui/button-group";

const schema = z.object({
  name: z.string(),
  bio: z.string(),
  monetizationType: z.enum(MonetizationType).nullable(),
  linkvertiseId: z.string().nullable(),
  linkvertiseSecret: z.string().nullable(),
  lootlabsLinkId: z.string().nullable(),
  lootlabsSecret: z.string().nullable(),
  banned: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface UserSettingsFormProps {
  onClose: () => void;
  user: UserDto;
  ownsProfile: boolean;
  admin?: boolean;
}

export const UserSettingsForm = ({
  onClose,
  // onSave,
  ownsProfile,
  user,
  admin = false,
}: UserSettingsFormProps) => {
  const router = useRouter();
  const { logout, setUser } = useAuth();
  const [monetizationType, setMonetizationType] = useState(
    user.monetizationType,
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
  const onClickSubmit = handleSubmit(async (profile) => {
    console.log({ profile });
    if (ownsProfile) {
      const user = await updateProfile(profile);
      setUser(user);
    } else {
      await manageProfile(user.id, profile);
    }

    if (profile.name !== user.name) {
      router.push(Routes.PROFILE + "/" + profile.name + "/projects");
    } else {
      router.refresh();
    }

    onClose();
  });

  return (
    <Popup onClose={onClose} title="Account Settings">
      <Popup.Wrapper>
        <form onSubmit={onClickSubmit}>
          <Popup.Part>
            <div className={styles.input}>
              <BedrockText
                textAlign="start"
                text="Username"
                type="p"
                color="white"
              />
              <Input
                sub
                placeholder="Name"
                className={styles.input}
                {...register("name")}
              />
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
              <BedrockText
                textAlign="start"
                text="Bio"
                type="p"
                color="white"
              />
              <Input
                sub
                placeholder="Description"
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
              <p className={styles.linkvertiseInfo}>
                Monetization System - receive 100% revenue from ADs.{" "}
                <Link link={Routes.LINKVERTISE} className={styles.link}>
                  Check this tutorial for more information!
                </Link>
              </p>
              <Controller
                name="monetizationType"
                control={control}
                render={({ field }) => (
                  <Collapsible
                    headerText={capitalizeFirstLetter(
                      monetizationType ?? "None",
                    )}
                  >
                    {Object.values(MonetizationType).map((mT, key) => (
                      <ButtonGroup key={key}>
                        <Button
                          onClick={() => {
                            field.onChange(mT);
                            setMonetizationType(mT);
                          }}
                          buttonType="button"
                          isClicked={mT === monetizationType}
                          center
                          type="white"
                          width="100%"
                        >
                          <BedrockText
                            type="p"
                            color="#000"
                            text={capitalizeFirstLetter(mT)}
                          />
                        </Button>
                      </ButtonGroup>
                    ))}
                  </Collapsible>
                )}
              />
            </div>

            {monetizationType === "linkvertise" && (
              <>
                <div className={styles.input}>
                  <BedrockText
                    textAlign="start"
                    text="Linkvertise User Id"
                    type="p"
                    color="white"
                  />
                  <Input
                    sub
                    placeholder="Id"
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
                  <BedrockText
                    textAlign="start"
                    text="Linkvertise Anti-bypass Token"
                    type="p"
                    color="white"
                  />
                  <Input
                    sub
                    placeholder="Token"
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

            {monetizationType === "lootlabs" && (
              <>
                <div className={styles.input}>
                  <BedrockText
                    textAlign="start"
                    text="Lootlabs Link Id"
                    type="p"
                    color="white"
                  />
                  <Input
                    sub
                    placeholder="Id"
                    className={styles.input}
                    {...register("lootlabsLinkId")}
                  />

                  {errors["lootlabsLinkId"] && (
                    <BedrockText
                      type="p2"
                      extraClassName={styles.error}
                      text={errors["lootlabsLinkId"]?.message as string}
                      textAlign="start"
                    />
                  )}
                </div>
                <div className={styles.input}>
                  <BedrockText
                    textAlign="start"
                    text="Lootlabs API Token"
                    type="p"
                    color="white"
                  />
                  <Input
                    sub
                    placeholder="Token"
                    className={styles.input}
                    type="password"
                    {...register("lootlabsSecret")}
                  />

                  {errors["lootlabsSecret"] && (
                    <BedrockText
                      type="p2"
                      extraClassName={styles.error}
                      text={errors["lootlabsSecret"]?.message as string}
                      textAlign="start"
                    />
                  )}
                </div>
              </>
            )}
          </Popup.Part>

          <Popup.Footer>
            {admin && (
              <Controller
                name="banned"
                control={control}
                render={({ field }) => (
                  <Button
                    type={field.value ? "dark" : "red"}
                    width="100%"
                    center
                    onClick={() => field.onChange(!field.value)}
                    buttonType="submit"
                  >
                    <BedrockText
                      type="p"
                      text={field.value ? "Unban" : "Ban"}
                      color="white"
                    />
                  </Button>
                )}
              />
            )}
            <Button type="green" buttonType="submit" center width="100%">
              <BedrockText type="p" text="Save Settings" color="white" />
            </Button>
            {!admin && (
              <Button type="red" width="100%" center onClick={logout}>
                <BedrockText type="p" text="Logout" color="white" />
              </Button>
            )}
          </Popup.Footer>
        </form>
      </Popup.Wrapper>
    </Popup>
  );
};
