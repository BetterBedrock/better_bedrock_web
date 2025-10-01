import clsx from "clsx";
import { Banner } from "~/components/bedrock/banner";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Card, CardDivider } from "~/components/bedrock/card";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { SimpleButton } from "~/components/bedrock/simple-button";
import { Rating } from "~/components/rating";
import { ProjectMode } from "~/pages/project";
import ReportGlyph from "~/assets/images/glyphs/WarningGlyph.png";
import { Link } from "~/components/link";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { HeaderTitle, styles } from ".";
import { PopupReport } from "~/components/bedrock/popup/popup-report";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import EditIcon from "~/assets/ui/tiptap-icons/8.png";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";
import { Avatar } from "~/components/avatar";

interface HeaderProps {
  mode: ProjectMode;
}

export const Header = ({ mode }: HeaderProps) => {
  const { user } = useAuth();
  const { selectedProject, downloadButtonRef } = useProjectManager();
  const navigate = useNavigate();

  const creator = selectedProject?.user;

  if (!selectedProject) return;

  const handleScrollToButton = () => {
    if (!downloadButtonRef.current) return;

    downloadButtonRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  return (
    <>
      {selectedProject.submitted && (
        <Banner
          type="info"
          message="The project has been submitted, and any edits are no longer saved. We will get back to you via email within 24 hours."
        />
      )}
      {selectedProject.error && (
        <Banner
          type="error"
          message={
            <>
              <BedrockText
                textAlign="start"
                type="p"
                color="white"
                font="Minecraft"
                text="Your project has been decline for the following reason:"
              />
              <BedrockText textAlign="start" type="p" color="white" text={selectedProject.error} />
            </>
          }
        />
      )}
      <Card sub className={styles.information}>
        {/* <HeroDescription download={download} /> */}
        <div className={clsx(styles.editor)}>
          <div className={styles.title}>
            <HeaderTitle title={selectedProject?.title ?? ""} />
            {user && user?.id !== selectedProject.userId && mode === "view" && (
              <PopupWrapper
                popup={(close) => (
                  <PopupReport
                    name={selectedProject.title}
                    id={selectedProject.id}
                    type="project"
                    onClose={close}
                  />
                )}
              >
                <SimpleButton transparent>
                  <img src={ReportGlyph} className={styles.icon} />
                </SimpleButton>
              </PopupWrapper>
            )}
            {user?.admin && mode !== "edit" && (
              <SimpleButton
                transparent
                onClick={() => navigate(Routes.PROJECT_EDIT + "/" + selectedProject.id)}
              >
                <img src={EditIcon} className={styles.icon} />
              </SimpleButton>
            )}
          </div>
          {mode === "view" && (
            <Rating
              rating={selectedProject.rating.average}
              suffix={`(${selectedProject.rating.count} All Project Ratings)`}
            />
          )}
        </div>

        <CardDivider sub />

        <div className={clsx(styles.editor)}>
          <Avatar>
            <Avatar.Profile name={creator?.name ?? "Unnamed"} size="medium" />

            {creator ? (
              <Avatar.Details name={creator!.name} at>
                <Rating rating={selectedProject.user.rating} simple />
              </Avatar.Details>
            ) : (
              // <BedrockText text={`@${creator?.name}`} type="p" color="white" />
              <CircularProgressIndicator size="small" />
            )}
          </Avatar>
          {mode === "view" && (
            <Link>
              <BedrockText
                text="Skip to download"
                type="p"
                color="white"
                extraClassName={styles.skip}
                onClick={handleScrollToButton}
              />
            </Link>
          )}
        </div>
      </Card>
    </>
  );
};
