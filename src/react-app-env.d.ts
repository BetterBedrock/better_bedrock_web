/// <reference types="react-scripts" />

declare module '*.mp3' {
    const src: string;
    export default src;
  }
  
  declare module '*.wav';

  // global.d.ts
interface AndroidInterface {
    showToast(message: string): void;
    getAppData(): string;
}

interface Window {
    Android: AndroidInterface;
}