import { baseFrontendUrl } from "@/utils/url";

export const openLinkvertise = async (linkvertiseId: string) => {
    const link = await getLinkvertiseUrl(linkvertiseId);
    const finalUri = new URL(link);

    window.open(finalUri.toString(), "_blank");
};

export const getLinkvertiseUrl = async (linkvertiseId: string): Promise<string> => {
    const targetUrl = baseFrontendUrl + "/verify";
    const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1piHDY9WRIehbfC3Fpol
    Ly/WrJF8TKFVdDMobj3fkNjN/69dTv9JgXt+gcJxVn/h4NCMtQ2mCQXNBMXzLOky
    HJipiFMoyPtOOlMlbWRAiaQE1GpMebGNRcsxYnWzF53v63+hUQgrMahH9X0Ii/NJ
    hvDyFlPX77+z9xiyd45L+xrgayePpOxvQpj6VJDlpNNKWbuIkFvkMmUVRM2TLulL
    JSgs4EgoBZgTYRpmhgR8tYfDOW+cOctffggcMAzKUC2CzYNmhzX15O7DKaZdYgfa
    BR/hqvyNAxBepHOJnBfHkQqaox5diHGqdwXXLwiJKzoK5R26vaI3jg2+d69VPSGL
    0QIDAQAB
    -----END PUBLIC KEY-----`;

    function str2ab(str: string): ArrayBuffer {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    async function importKey(pem: string): Promise<CryptoKey> {
        const pemHeader = "-----BEGIN PUBLIC KEY-----";
        const pemFooter = "-----END PUBLIC KEY-----";
        const pemContents = pem.substring(
            pemHeader.length,
            pem.length - pemFooter.length - 1
        );
        const binaryDer = str2ab(atob(pemContents));
        return await crypto.subtle.importKey(
            "spki",
            binaryDer,
            { name: "RSA-OAEP", hash: "SHA-256" },
            false,
            ["encrypt"]
        );
    }

    const encodedHref = new TextEncoder().encode(targetUrl);

    // Split into two parts like the official script
    let part1: BufferSource, part2: string;
    if (encodedHref.length > 70) {
        part1 = encodedHref.slice(0, 70);
        part2 = new TextDecoder().decode(encodedHref.slice(70));
    } else {
        part1 = encodedHref;
        part2 = "";
    }

    const key = await importKey(pemEncodedKey);
    const encryptedHref = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        key,
        part1
    );

    // Convert encrypted part to base64
    let binary = "";
    const bytes = new Uint8Array(encryptedHref);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const encryptedBase64 = btoa(binary);

    const fullEncryptedHref = `${encryptedBase64}${part2}`;
    const baseLinkvertiseUrl = `https://link-to.net/${linkvertiseId}/${Math.floor(Math.random() * 1000)}/dynamic/`;

    return `${baseLinkvertiseUrl}?r=${fullEncryptedHref}&v=2`;
};