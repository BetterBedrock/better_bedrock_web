export const baseUrl =
    process.env.DEBUG === "true" ? process.env.LOCAL_BACKEND_URL : process.env.BACKEND_URL;
