declare module "*.css";
declare module "*.scss";
declare module "*.svg";
declare module "*.png";
declare module "*.mp3";
declare module "*.mp4";
declare module "*.wav";

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LINKVERTISE_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}