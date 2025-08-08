import { styles } from ".";

export const TrailerVideo = () => (
  <div className={styles.video}>
    <iframe
      width="100%"
      height="100%"
      // todo: update 
      src="https://youtube.com/embed/DEQu3Q19ZMM"
      title="Better Bedrock Changelog v8.0 #1 | Client release on windows! | New Texture Pack version | Showcase"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
);
