"use client";

import { useSyncExternalStore } from "react";

type Device = "mobile" | "tablet" | "desktop";

const QUERIES = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width: 768px) and (max-width: 1023px)",
} as const;

function getSnapshot(): Device {
    if (typeof window === "undefined") return "desktop";
    if (window.matchMedia(QUERIES.mobile).matches) return "mobile";
    if (window.matchMedia(QUERIES.tablet).matches) return "tablet";
    return "desktop";
}

function subscribe(callback: () => void) {
    const mqls = Object.values(QUERIES).map((q) => window.matchMedia(q));
    mqls.forEach((mql) => mql.addEventListener("change", callback));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", callback));
}

function getServerSnapshot(): Device {
    return "desktop"; // valor neutro enquanto não há window
}

export function useViewPort() {
    const device = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return {
        device,
        isMobile: device === "mobile",
        isTablet: device === "tablet",
        isDesktop: device === "desktop",
    };
}