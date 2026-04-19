"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { MonetizationType, UserDto } from "@/shared/lib/openapi";
import { useAuth } from "@/app/providers/auth";
import { capitalizeFirstLetter, Routes } from "@/shared/lib/utils";
import { Popup } from "@/shared/ui/popup";
import { Input } from "@/shared/ui/input";
import { Link } from "@/shared/ui/link";
import { useRouter } from "next/navigation";
import { manageProfile, updateProfile } from "@/entities/user";

import styles from "./user-settings-popup.module.scss";
import { Collapsible } from "@/shared/ui/collapsible";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Banner } from "@/shared/ui/banner";
import { useNotification } from "@/app/providers/notification";
import { Field } from "@/shared/ui/field";
import { UserSettingsFormNameItem } from "@/pages/profile/ui/user/user-settings-popup/user-settings-popup-name-item";
import { UserSettingsPopupSchema, userSettingsPopupSchema } from "@/pages/profile/ui/user/user-settings-popup/user-settings-popup-schema";

interface UserSettingsFormProps {
  onClose: () => void;
  user: UserDto;
  ownsProfile: boolean;
  admin?: boolean;
}

export const UserSettingsPopup = ({
  onClose,
  ownsProfile,
  user,
  admin = false,
}: UserSettingsFormProps) => {
  const router = useRouter();
  const { logout, setUser } = useAuth();
  const { throwError } = useNotification();
  const [monetizationType, setMonetizationType] = useState(
    user.monetizationType,
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UserSettingsPopupSchema>({
    defaultValues: user,
    resolver: zodResolver(userSettingsPopupSchema),
  });

  const onClickSubmit = handleSubmit(async (profile) => {
    const { data, error } = ownsProfile
      ? await updateProfile(profile)
      : await manageProfile(user.id, profile);
    if (error) {
      throwError(null, error);
      return;
    }

    if (ownsProfile) setUser(data);

    if (profile.name !== user.name) {
      router.push(Routes.PROFILE + "/" + profile.name + "/projects");
    } else {
      router.refresh();
    }

    onClose();
  });

  return (
    <form onSubmit={onClickSubmit}>
      <Popup onClose={onClose} title="Account Settings">
        <Popup.Body>
          <Popup.Part>
            <UserSettingsFormNameItem register={register} error={errors.name} />

            <Popup.Item>
              <Field name="Bio" error={errors.bio}>
                <Input
                  sub
                  placeholder="Description"
                  className={styles.input}
                  {...register("bio")}
                />
              </Field>
            </Popup.Item>
          </Popup.Part>

          <Popup.Part>
            <Banner
              variant="info"
              message={
                <p className={styles.bannerText}>
                  Monetization System - receive 100% revenue from ADs.{" "}
                  <Link link={Routes.MONETIZATION} className={styles.link}>
                    Check this tutorial for more information!
                  </Link>
                </p>
              }
            />
            <Popup.Item>
              <BedrockText
                textAlign="start"
                text="Monetization Type"
                type="p"
                color="white"
              />
              <Controller
                name="monetizationType"
                control={control}
                render={({ field }) => (
                  <Collapsible
                    headerText={capitalizeFirstLetter(
                      monetizationType ?? "None",
                    )}
                  >
                    <ButtonGroup direction="vertical">
                      {Object.values(MonetizationType).map((mT, key) => (
                        <Button
                          key={key}
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
                            color="black"
                            text={capitalizeFirstLetter(mT)}
                          />
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Collapsible>
                )}
              />
            </Popup.Item>

            {monetizationType === "linkvertise" && (
              <>
                <Popup.Item>
                  <Field
                    name="Linkvertise User Id"
                    error={errors.linkvertiseId}
                  >
                    <Input
                      sub
                      placeholder="Id"
                      className={styles.input}
                      {...register("linkvertiseId")}
                    />
                  </Field>
                </Popup.Item>
                <Popup.Item>
                  <Field
                    name="Linkvertise Anti-bypass Token"
                    error={errors.linkvertiseSecret}
                  >
                    <Input
                      sub
                      placeholder="Token"
                      className={styles.input}
                      type="password"
                      {...register("linkvertiseSecret")}
                    />
                  </Field>
                </Popup.Item>
              </>
            )}

            {monetizationType === "lootlabs" && (
              <>
                <Popup.Item>
                  <Field name="Lootlabs Link Id" error={errors.lootlabsLinkId}>
                    <Input
                      sub
                      placeholder="Id"
                      className={styles.input}
                      {...register("lootlabsLinkId")}
                    />
                  </Field>
                </Popup.Item>
                <Popup.Item>
                  <Field
                    name="Lootlabs API Token"
                    error={errors.lootlabsSecret}
                  >
                    <Input
                      sub
                      placeholder="Token"
                      className={styles.input}
                      type="password"
                      {...register("lootlabsSecret")}
                    />
                  </Field>
                </Popup.Item>
              </>
            )}
          </Popup.Part>
        </Popup.Body>

        <Popup.Footer>
          <ButtonGroup direction={admin ? "vertical" : "horizontal"}>
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
          </ButtonGroup>
        </Popup.Footer>
      </Popup>
    </form>
  );
};
