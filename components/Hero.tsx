"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";
import dynamic from "next/dynamic";
import TextPressure from "./TextPressure";

const Scene = dynamic(() => import("@/components/Scene"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />
});

export default function Hero() {
    const titleContainerRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const hireRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial entrance animation for the title container
        if (titleContainerRef.current) {
            animate(titleContainerRef.current, {
                opacity: [0, 1],
                y: [50, 0],
                duration: 1500,
                ease: "outExpo"
            });
        }

        if (subtitleRef.current) {
            animate(subtitleRef.current, {
                opacity: [0, 1],
                y: [20, 0],
                delay: 800,
                duration: 1000,
                ease: "outExpo"
            });
        }

        if (ctaRef.current) {
            animate(ctaRef.current, {
                opacity: [0, 1],
                scale: [0.9, 1],
                delay: 1200,
                duration: 800,
                ease: "outExpo"
            });
        }

        // Side Labels Fade In
        if (hireRef.current) {
            animate(hireRef.current, {
                opacity: [0, 0.3],
                x: [-20, 0],
                delay: 1500,
                duration: 1000,
                ease: "outExpo"
            });
        }

        if (scrollRef.current) {
            animate(scrollRef.current, {
                opacity: [0, 0.3],
                x: [20, 0],
                delay: 1500,
                duration: 1000,
                ease: "outExpo"
            });
        }
    }, []);

    return (
        <section id="hero" className="relative section-background overflow-hidden min-h-screen flex items-center">
            <Scene />
            {/* Background glow refinement */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center justify-center">

                {/* Text Pressure Title */}
                <div
                    ref={titleContainerRef}
                    className="w-full h-[120px] md:h-[180px] lg:h-[220px] mb-12 opacity-0"
                >
                    <TextPressure
                        text="JONVIKBOI"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#F40C3F"
                        minFontSize={48}
                        className="font-outfit font-black"
                    />
                </div>

                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl lg:text-2xl text-foreground/60 max-w-2xl mx-auto font-inter font-light tracking-[0.05em] leading-relaxed opacity-0"
                >
                    Shaping digital brutality into cinematic experiences.
                    <span className="block mt-2 font-medium text-foreground/40 text-sm md:text-base uppercase tracking-[0.2em]">Designing the edge of what's possible.</span>
                </p>

                <div ref={ctaRef} className="mt-20 opacity-0 relative group">
                    {/* Extra Outer Glow */}
                    <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                    <motion.button
                        initial={{ paddingLeft: "3rem", paddingRight: "1rem" }}
                        whileHover={{
                            paddingLeft: "4.5rem",
                            paddingRight: "4.5rem",
                        }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                            const aboutSection = document.getElementById('about');
                            if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 30,
                            mass: 0.8
                        }}
                        className="group relative py-6 md:py-8 bg-primary/5 border-2 border-primary/20 text-primary font-playfair font-black italic uppercase tracking-[0.1em] text-lg md:text-2xl rounded-full overflow-hidden transition-colors duration-300 hover:border-primary/60 hover:shadow-[0_0_50px_rgba(244,12,63,0.4)] flex items-center justify-center"
                    >
                        <span className="relative z-10 transition-colors duration-500 group-hover:text-background flex items-center gap-10">
                            Explore
                            <span className="inline-block transform transition-transform duration-500 group-hover:translate-x-4">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-background transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </span>

                        {/* Swipe Effect Layer */}
                        <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    </motion.button>
                </div>
            </div>

            {/* Side labels for premium agency vibe */}
            <div ref={hireRef} className="absolute bottom-12 left-12 hidden lg:block opacity-0">
                <p className="font-outfit text-xs uppercase tracking-[0.4em] text-foreground rotate-180 [writing-mode:vertical-lr]">
                    Available for hire · 2026
                </p>
            </div>
            <div ref={scrollRef} className="absolute bottom-12 right-12 hidden lg:block opacity-0">
                <p className="font-outfit text-xs uppercase tracking-[0.4em] text-foreground [writing-mode:vertical-lr]">
                    Scroll to explore
                </p>
            </div>
        </section>
    );
}
