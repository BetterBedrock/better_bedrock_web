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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractFirstLinesFromTiptap = (doc: any): string => {
    if (!doc) return "";

    if (typeof doc === "string") {
        return (doc as string).split("\n").join(" ").trim();
    }

    const lines: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const walk = (node: any) => {
        if (typeof node?.text === "string") {
            lines.push(node?.text);
            return;
        }

        if (Array.isArray(node?.content)) {
            for (const child of node?.content ?? []) {
                walk(child);
            }
        }
    };

    walk(doc);

    return lines.join(" ").trim();
};
