import { ReactNode } from "react";
import { Section } from "@/shared/ui/section";

import { Tabs } from "@/pages/profile/ui/tabs/tabs";
import { User } from "@/pages/profile/ui/user/user";

import { notFound } from "next/navigation";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";

import { styles } from "@/pages/profile/index";
import { fetchLoggedUser } from "@/entities/auth";
import { fetchUserByName } from "@/entities/user";

interface ProfileProps {
  children: ReactNode;
  params?: Promise<{ name: string }>;
}

export const generateMetadata = async ({ params }: ProfileProps) => {
  const loadedParams = await params;
  if (!loadedParams) {
    notFound();
  }

  const name = loadedParams.name;

  const user = await fetchUserByName(name);

  if (!user) {
    notFound();
  }

  const title = user.name;
  const description =
    user.bio ??
    "The best texture packs, scripts, maps, skins, and more for Minecraft PE on Better Bedrock.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
};

export default async function LayoutProfile({
  children,
  params,
}: ProfileProps) {
  const resolvedParams = await params;

  const user = await fetchLoggedUser();
  const name = resolvedParams?.name;

  const visible = user?.name === name || user?.admin;

  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
    >
      <Card fullWidth>
        <CardBody>
          <User params={resolvedParams} />
        </CardBody>
      </Card>

      <Card fullWidth>
        <CardBody>{visible && <Tabs params={resolvedParams} />}</CardBody>
        {visible && <CardDivider />}
        <CardBody>{children}</CardBody>
      </Card>
    </Section>
  );
}
