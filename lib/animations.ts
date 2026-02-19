import gsap from "gsap";
import { animate, stagger } from "animejs";

// Animation utility functions for future phases
export const staggerText = (target: string) => {
    animate(target, {
        y: [20, 0],
        opacity: [0, 1],
        delay: stagger(100),
        ease: "outExpo",
        duration: 1000,
    });
};

export const fadeIn = (target: string) => {
    gsap.fromTo(target,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
};
