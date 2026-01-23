export const singularize = (word: string) => {
    const endings = {
        ves: 'fe',
        ies: 'y',
        i: 'us',
        zes: 'ze',
        ses: 's',
        es: 'e',
        s: ''
    };
    return word.replace(
        new RegExp(`(${Object.keys(endings).join('|')})$`),
        r => endings[r as keyof typeof endings]
    );
}

export const capitalizeFirstLetter = (val: string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

import type { JSONContent } from "@tiptap/core"

export const extractFirstLinesFromTiptap = (
    doc: JSONContent | undefined | null,
    count = 3
): string => {
    if (!doc) return ""

    if (typeof doc === "string") {
        return (doc as string).split("\n").slice(0, count).join(" ").trim()
    }

    const lines: string[] = []

    const walk = (node: JSONContent) => {
        if (lines.length >= count) return

        if (typeof node.text === "string") {
            lines.push(node.text)
            return
        }

        if (Array.isArray(node.content)) {
            for (const child of node.content) {
                if (lines.length >= count) break
                walk(child)
            }
        }
    }

    walk(doc)

    return lines.slice(0, count).join(" ").trim()
}
