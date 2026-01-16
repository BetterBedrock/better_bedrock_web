import { Card, CardBody, CardDivider } from "@/components/card";
import { InformationVideos } from "@/features/shared/types/information";
import { TutorialVideosDescription } from "./tutorial-videos-description";
import { TutorialVideosGrid } from "./tutorial-videos-grid";
import { TutorialVideosTitle } from "./tutorial-videos-title";

export interface TutorialVideosProps {
  videos: InformationVideos;
}

export const TutorialVideos = ({ videos }: TutorialVideosProps) => (
  <Card fullWidth>
    <CardBody>
      <TutorialVideosTitle />
      <TutorialVideosDescription />
    </CardBody>
    <CardDivider />
    <CardBody>
      <TutorialVideosGrid videos={videos.videos} />
    </CardBody>
  </Card>
);
