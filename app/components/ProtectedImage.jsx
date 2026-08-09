"use client"

import Image from "next/image"


/**
 * Protected image wrapper with anti-save protection.
 * Blocks right-click, drag-to-save, and direct image interactions.
 *
 * Props:
 * - Image props: src, alt, fill, width, height, priority, sizes, className
 * - wrapperClassName: Outer wrapper class
 * - style: Outer wrapper inline styles
 */

export default function ProtectedImage({ src, alt, fill, width, height, priority, sizes,
    className = "object-cover",
    wrapperClassName = "",
    style, children,
}) {
    return (
        <div className={`img-protected ${wrapperClassName}`} style={style} onContextMenu={(e) => e.preventDefault()}>
            {/* Transparent overlay - blocks right-click & drag on the image */}
            <div className="img-overlay"/>
            <Image
            src={src}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            priority={priority}
            sizes={sizes}
            className={className}
            />
            {children}
        </div>
    );
}
