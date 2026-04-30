"use client";

import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

import styles from "./infinite-list.module.scss";

interface InfiniteListProps<T> {
  direction?: "horizontal" | "vertical";
  onLoad: (page: number) => Promise<T[]>;
  onRender: (data: T) => ReactNode;
  defaultData?: T[];
  maxPages: number;
  defaultPage?: number;
}

export function InfiniteList<T>({
  direction = "vertical",
  defaultPage = 1,
  onLoad,
  onRender,
  maxPages,
  defaultData,
}: InfiniteListProps<T>) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(defaultPage);
  const [data, setData] = useState<T[]>(defaultData ?? []);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const canLoadMore = page < maxPages;

  useEffect(() => {
    const el = anchorRef.current;
    if (!el || !canLoadMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (loading) return;

        if (entries[0].isIntersecting) {
          setLoading(true);
          const newItems = await onLoad(page + 1);
          setData((prev) => [...prev, ...newItems]);
          setLoading(false);
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, canLoadMore]);

  return (
    <div
      className={clsx(
        styles.list,
        direction === "horizontal" ? styles.horizontal : styles.vertical
      )}
    >
      {data.map((d) => onRender(d))}
      {loading && <CircularProgressIndicator size="medium" />}
      <div ref={anchorRef} />
    </div>
  );
}
