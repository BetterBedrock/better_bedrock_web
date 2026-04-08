import { useSettings } from "@/app/providers/settings";
import { BannerVariant } from "@/shared/lib/openapi";
import { capitalizeFirstLetter, INPUT_FORMAT } from "@/shared/lib/utils";
import { Banner } from "@/shared/ui/banner";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Collapsible } from "@/shared/ui/collapsible";
import { Field } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Popup } from "@/shared/ui/popup";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import z from "zod";

interface SettingsBannerPopupProps {
  onClose?: () => void;
}

const schema = z.object({
  bannerText: z.string(),
  bannerExpirationDate: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val || val === "") return null;
      return val;
    }),
  bannerVariant: z.enum(BannerVariant).optional(),
});

export const SettingsBannerPopup = ({ onClose }: SettingsBannerPopupProps) => {
  const { settings, updateSettings } = useSettings();

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...settings,
      bannerExpirationDate: dayjs(settings?.bannerExpirationDate).format(
        INPUT_FORMAT,
      ),
    },
    resolver: zodResolver(schema),
  });

  const onClickSubmit = handleSubmit(async (data) => {
    if (!settings) return;

    const newSettings = {
      ...settings,
      ...data,
    };

    await updateSettings(newSettings);
    onClose?.();
  });

  const bannerText = watch("bannerText");
  const bannerVariant = watch("bannerVariant");

  return (
    <form onSubmit={onClickSubmit}>
      <Popup onClose={onClose} title="Banner">
        <Popup.Body>
          <Popup.Part>
            <Popup.Item>
              <Field
                name="Banner Text (supports markdown)"
                id="bannerText"
                errors={errors}
              >
                <Input
                  type="text"
                  placeholder="Banner Text"
                  {...register("bannerText")}
                />
              </Field>
            </Popup.Item>
            <Popup.Item>
              <Field
                name="Banner Expiration Date"
                id="bannerExpirationDate"
                errors={errors}
              >
                <Input
                  type="datetime-local"
                  placeholder="Banner Expiration Date"
                  {...register("bannerExpirationDate")}
                />
              </Field>
            </Popup.Item>
            <Popup.Item>
              <Field name="Banner Variant" id="bannerVariant" errors={errors}>
                <Controller
                  name="bannerVariant"
                  control={control}
                  render={({ field }) => {
                    const cField = capitalizeFirstLetter(
                      field.value ?? "Not selected",
                    );

                    return (
                      <Collapsible headerText={cField}>
                        <ButtonGroup direction="vertical">
                          {Object.keys(BannerVariant).map((v, index) => {
                            const color = v === cField ? "white" : "black";
                            const type = v === cField ? "green" : "white";

                            const handleClick = () => {
                              field.onChange(v.toLowerCase());
                            };

                            return (
                              <Button
                                key={index}
                                type={type}
                                center
                                width="100%"
                                onClick={handleClick}
                                buttonType="button"
                              >
                                <BedrockText color={color}>{v}</BedrockText>
                              </Button>
                            );
                          })}
                        </ButtonGroup>
                      </Collapsible>
                    );
                  }}
                />
              </Field>
            </Popup.Item>
            <Popup.Item>
              <BedrockText textAlign="start" color="white">
                Preview
              </BedrockText>
              <Banner
                message={<Markdown>{bannerText}</Markdown>}
                variant={bannerVariant}
              />
            </Popup.Item>
          </Popup.Part>
        </Popup.Body>
        <Popup.Footer>
          <Button type="green" center width="100%" buttonType="submit">
            <BedrockText color="white">Save</BedrockText>
          </Button>
        </Popup.Footer>
      </Popup>
    </form>
  );
};
