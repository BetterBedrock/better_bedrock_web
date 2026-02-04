import { Card } from "@/shared/ui/card";
import { InformationVideos } from "@/shared/lib/information";
import { TutorialVideosDescription } from "./tutorial-videos-description";
import { TutorialVideosGrid } from "./tutorial-videos-grid";
import { TutorialVideosTitle } from "./tutorial-videos-title";

export interface TutorialVideosProps {
  videos: InformationVideos;
}

export const TutorialVideos = ({ videos }: TutorialVideosProps) => (
  <Card fullWidth>
    <Card.Body>
      <TutorialVideosTitle />
      <TutorialVideosDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <TutorialVideosGrid videos={videos.videos} />
    </Card.Body>
  </Card>
);
