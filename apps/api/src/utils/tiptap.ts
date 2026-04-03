const isObject = (val: unknown): val is Record<string, unknown> =>
    typeof val === "object" && val !== null;

const isArray = (val: unknown): val is Array<unknown> => Array.isArray(val);

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

export const extractImagesCount = (doc: unknown): number => {
    let count = 0;
    if (!doc) return count;

    const walk = (node: unknown) => {
        if (!isObject(node)) return;

        if (node.type === "image") {
            count++;
            return;
        }

        if (node.type === "gallery") {
            if (!isObject(node.attrs) || !isArray(node.attrs.images)) return;
            const images = node.attrs?.images;
            count += images?.length ?? 0;
            return;
        }

        if (Array.isArray(node.content)) {
            for (const child of node.content) {
                walk(child);
            }
        }
    };

    walk(doc);
    return count;
};
