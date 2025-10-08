export const baseUrl =
    process.env.DEBUG === "true" ? process.env.LOCAL_BACKEND_URL : process.env.BACKEND_URL;

export const baseFrontendUrl =
    process.env.DEBUG === "true" ? process.env.LOCAL_FRONTEND_URL : process.env.FRONTEND_URL;
