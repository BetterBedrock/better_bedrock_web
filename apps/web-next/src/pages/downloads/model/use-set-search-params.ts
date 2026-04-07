import { usePathname, useSearchParams } from "next/navigation";

export const useSetSearchParams = (name: string, value: string) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const params = new URLSearchParams(searchParams?.toString());
    params.set(name, value);
    const href = `${pathname}?${params.toString()}`;

    return href;
}