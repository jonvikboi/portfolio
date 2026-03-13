"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // LIGHT & RESPONSIVE SPRING: Snappy, smooth, and easy to move without heavy organic lag.
    // Higher stiffness + lower mass = a very light, responsive pointer.
    const springConfig = { damping: 28, stiffness: 350, mass: 0.92 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovered(true);
            }
        };

        const handleHoverEnd = () => {
            setIsHovered(false);
        };

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mouseover", handleHoverStart);
        window.addEventListener("mouseout", handleHoverEnd);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mouseover", handleHoverStart);
            window.removeEventListener("mouseout", handleHoverEnd);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
                backgroundColor: "#F40C3F", // Brand Red base
            }}
            initial={{ opacity: 0, width: 12, height: 12 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                // ZOOM TRANSITIONS: Still present and sharp.
                width: isHovered ? 48 : 12,
                height: isHovered ? 48 : 12,
                backgroundColor: isHovered ? "#FFFFFF" : "#F40C3F",
            }}
            transition={{
                // HOVER ZOOM SPRING: Snappy bounce when entering links.
                width: { type: "spring", stiffness: 250, damping: 20 },
                height: { type: "spring", stiffness: 250, damping: 20 },
                // EASE-IN-OUT: For the internal color/glow logic.
                backgroundColor: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
                opacity: { duration: 0.3, ease: "easeInOut" }
            }}
        >
            <div className={`absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'}`} />
        </motion.div>
    );
}
