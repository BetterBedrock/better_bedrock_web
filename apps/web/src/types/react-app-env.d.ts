declare module "*.css";
declare module "*.scss";
declare module "*.svg";
declare module "*.png";
declare module "*.webp";
declare module "*.mp3";
declare module "*.mp4";
declare module "*.wav";

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LINKVERTISE_ID: string;
    readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
    readonly VITE_LOCAL_BACKEND_URL: string;
    readonly VITE_LOCAL_FRONTEND_URL: string;
    readonly VITE_BACKEND_URL: string;
    readonly VITE_FRONTEND_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_DEBUG: string;
    readonly VITE_PORT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}