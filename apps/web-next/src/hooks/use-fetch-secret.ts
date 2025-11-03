import { useCookies } from "next-client-cookies"


export const useFetchSecret = () => {
    const cookies = useCookies();

    return cookies.get("secret");
}