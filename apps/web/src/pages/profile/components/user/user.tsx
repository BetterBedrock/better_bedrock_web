import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import Steve from "~/assets/images/avatars/Steve.png";
// import { Label } from "~/components/bedrock/label";
import { Card } from "~/components/bedrock/card";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Rating } from "~/components/rating";
import { Tabs } from "~/pages/profile/components/user/tabs";
import { useUser } from "~/providers/user";
import { useEffect, useState } from "react";
import { SimpleUserDto } from "~/lib/api";
import { Routes } from "~/utils/routes";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { SimpleButton } from "~/components/bedrock/simple-button";
import SettingsGlyph from "~/assets/images/settings_glyph.png";
import { UserSettingsForm } from "~/pages/profile/components/user/user-settings-form";
import { useAuth } from "~/providers/auth";

export const User = () => {
  const { id } = useParams();
  const { findUserByName, updateProfile } = useUser();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<SimpleUserDto | undefined>();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate(Routes.HOME);
      return;
    }
    findUserByName(id).then((data) => {
      setSelectedUser(data);
    });
  }, []);

  if (!selectedUser) {
    return <CircularProgressIndicator size="medium" />;
  }

  return (
    <div className={styles.wrapper}>
      {settingsOpen && user && (
        <UserSettingsForm
          user={user}
          onClose={() => setSettingsOpen(false)}
          onSave={async (data) => {
            console.log("Begin updating profile");
            const newUser = await updateProfile(data);
            console.log("Finish updating profile");
            if (!newUser) return;
            console.log("Navigate");
            setSelectedUser(newUser);
            navigate(Routes.PROFILE + "/" + newUser.name + "/projects");
            console.log(data);
          }}
        />
      )}
      <Card>
        <div className={styles.profile}>
          <img src={Steve} className={styles.image} />
          <div className={styles.info}>
            <div className={styles.name}>
              <BedrockText
                type="h1"
                text={selectedUser.name}
                color="white"
                textAlign="left"
                font="Minecraft"
              />
              <SimpleButton transparent onClick={() => setSettingsOpen(true)}>
                <img src={SettingsGlyph} className={styles.icon} />
              </SimpleButton>
            </div>
            <Rating rating={2.56} />
            <BedrockText type="p" text={selectedUser.bio} color="white" textAlign="left" />
          </div>
        </div>
      </Card>

      <Tabs />

      <Outlet context={{ selectedUser }} />
    </div>
  );
};
