import { useEffect } from "react";

export const useInfiniteScroll = (ref, onReachEnd, enabled) => {
  useEffect(() => {
    if (!enabled || !ref.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onReachEnd();
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, onReachEnd, ref]);
};
