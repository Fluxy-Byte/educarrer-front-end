import { useEffect, useState } from "react";

export function useViewPort() {
    const [device, setDevice] = useState<
        "mobile" | "tablet" | "desktop"
    >("desktop");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 768) {
                setDevice("mobile");
            } else if (width < 1024) {
                setDevice("tablet");
            } else {
                setDevice("desktop");
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        device,
        isMobile: device === "mobile",
        isTablet: device === "tablet",
        isDesktop: device === "desktop",
    };
}