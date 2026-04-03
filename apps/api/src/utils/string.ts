import { Request } from "express";

export const obscureEmail = (email: string, visibleChars: number = 1): string => {
    const [username, domain] = email.split("@");
    if (!domain) {
        // Invalid email — return it unchanged (or throw/error as needed)
        return email;
    }
    if (username.length <= visibleChars) {
        return email;
    }
    const hiddenPart = "*".repeat(username.length - visibleChars);
    return `${username.slice(0, visibleChars)}${hiddenPart}@${domain}`;
};

export const extractTokenFromHeader = (request: Request): string | undefined => {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
};
