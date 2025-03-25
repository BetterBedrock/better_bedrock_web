/// <reference types="react-scripts" />

declare module '*.mp3' {
    const src: string;
    export default src;
  }
  
  declare module '*.wav';

  
declare module '*.mp4' {

  const src: string;

  export default src;

}

//TODO: Move to another file
//   // global.d.ts
// interface AndroidInterface {
//     showToast(message: string): void;
//     getAppData(): string;
// }

// interface Window {
//     Android: AndroidInterface;
// }