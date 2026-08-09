"use client";

import { useEffect, useState } from "react";

/**
 * Smooth page transition on route change.
 */

export default function PageTransition({ children }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Small delay ensures the class swap is painted after mount
        const raf = requestAnimationFrame(() => setVisible(true));
        return () => {
            cancelAnimationFrame(raf);
            setVisible(false);
        };
    }, []);

    return (
        <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            }}>
        {children}</div>
    );
}