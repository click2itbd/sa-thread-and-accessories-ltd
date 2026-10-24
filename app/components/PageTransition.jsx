"use client";

import { useEffect, useState } from "react";

/**
 * Smooth page transition on route change.
 */

export default function PageTransition({ children }) {
    const [visible, setVisible] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setVisible(true));
        const timer = setTimeout(() => setDone(true), 360);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
            setVisible(false);
            setDone(false);
        };
    }, []);

    return (
        <div 
          className="flex-1 flex flex-col"
          style={
            done
              ? undefined
              : {
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }
          }>
        {children}</div>
    );
}