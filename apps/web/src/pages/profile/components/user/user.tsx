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
import { SimpleUserDto, UserDto, UserRatingDto } from "~/lib/api";
import { Routes } from "~/utils/routes";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { SimpleButton } from "~/components/bedrock/simple-button";
import SettingsGlyph from "~/assets/images/settings_glyph.png";
import ReportGlyph from "~/assets/images/glyphs/WarningGlyph.png";
import { UserSettingsForm } from "~/pages/profile/components/user/user-settings-form";
import { useAuth } from "~/providers/auth";
import { AnalyticsProvider } from "~/providers/analytics";
import { PopupReport } from "~/components/bedrock/popup/popup-report";

export const User = () => {
  const { id } = useParams();
  const { findUserByName, updateProfile, manageProfile, getProfileRating, findDetailedUserByName } =
    useUser();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<SimpleUserDto | undefined>();
  const [detailedUser, setDetailedUser] = useState<UserDto | undefined>();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [rating, setRating] = useState<UserRatingDto | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      navigate(Routes.HOME);
      return;
    }
    if (user?.admin) {
      findDetailedUserByName(id).then(async (data) => {
        setDetailedUser(data);
      });
    }
  }, [user, id]);

  useEffect(() => {
    if (!id) {
      navigate(Routes.HOME);
      return;
    }
    findUserByName(id).then(async (data) => {
      setSelectedUser(data);
      if (data) {
        const userRating = await getProfileRating(data.id);
        setRating(userRating);
      }
    });
  }, [user, id, detailedUser]);

  const baseUser = selectedUser ?? detailedUser;

  if (!baseUser) {
    return <CircularProgressIndicator size="medium" />;
  }

  const detailedSelectdUser = detailedUser ?? (user?.name === id ? user : undefined);
  const ownsProfile = user?.name === id;

  return (
    <AnalyticsProvider>
      <div className={styles.wrapper}>
        {settingsOpen && detailedSelectdUser && (
          <UserSettingsForm
            user={detailedSelectdUser}
            onClose={() => setSettingsOpen(false)}
            admin={!ownsProfile && user?.admin}
            onSave={async (data) => {
              if (ownsProfile) {
                const newUser = await updateProfile(data);
                if (!newUser) return;

                setSelectedUser(newUser);
                navigate(Routes.PROFILE + "/" + newUser.name + "/projects");
                return;
              }
              if (!detailedUser) return;

              const newUser = await manageProfile(detailedUser.id, data);
              if (!newUser) return;

              setDetailedUser(newUser);
              navigate(Routes.PROFILE + "/" + newUser.name + "/projects");
            }}
          />
        )}
        {reportOpen && selectedUser && (
          <PopupReport
            name={selectedUser.name}
            id={selectedUser.id}
            type="user"
            onClose={() => setReportOpen(false)}
          />
        )}
        <Card>
          <div className={styles.profile}>
            <img src={Steve} className={styles.image} />
            <div className={styles.info}>
              <div className={styles.name}>
                <BedrockText
                  type="h1"
                  text={baseUser.name + `${baseUser.banned ? " (banned)" : ""}`}
                  color="white"
                  textAlign="left"
                  font="Minecraft"
                />
                <div className={styles.icons}>
                  {selectedUser && user?.id !== baseUser.id && (
                    <SimpleButton transparent onClick={() => setReportOpen(true)}>
                      <img src={ReportGlyph} className={styles.report} />
                    </SimpleButton>
                  )}
                  {detailedSelectdUser && (
                    <SimpleButton transparent onClick={() => setSettingsOpen(true)}>
                      <img src={SettingsGlyph} className={styles.settings} />
                    </SimpleButton>
                  )}
                </div>
              </div>
              {rating && selectedUser && (
                <Rating rating={rating.average} suffix={`(${rating.count} Reviews)`} />
              )}
              <BedrockText type="p" text={baseUser.bio} color="white" textAlign="left" />
            </div>
          </div>
        </Card>

        <Tabs />

        {selectedUser && <Outlet context={{ selectedUser }} />}
      </div>
    </AnalyticsProvider>
  );
};
