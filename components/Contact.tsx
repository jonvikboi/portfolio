"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);

    // MAGNETIC EFFECT LOGIC
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const dx = clientX - centerX;
        const dy = clientY - centerY;

        // This is the "pull" strength
        x.set(dx * 0.35);
        y.set(dy * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (headingRef.current) {
            gsap.fromTo(headingRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 90%",
                    }
                }
            );
        }

        if (quoteRef.current) {
            gsap.fromTo(quoteRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: "top 95%",
                    }
                }
            );
        }
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="section-burgundy relative py-48 md:py-80 overflow-hidden border-t border-primary/5 w-full flex flex-col items-center justify-center">
            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center">

                    <h2
                        ref={headingRef}
                        className="text-center w-full text-5xl md:text-[10vw] font-black font-outfit uppercase tracking-tighter leading-[0.9] mb-16 md:mb-24 text-foreground"
                    >
                        START A <br />
                        <span className="text-primary italic block md:inline">REVOLUTION.</span>
                    </h2>

                    <div className="group relative w-full flex justify-center mb-32 md:mb-48 px-4">
                        <motion.a
                            href="mailto:mistahjzj@gmail.com"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ x: mouseX, y: mouseY }}
                            className="relative z-10 inline-block text-xl md:text-5xl lg:text-7xl font-outfit font-bold uppercase tracking-tighter pb-4 text-center cursor-none break-all"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            <span className="relative inline-block text-foreground group-hover:text-primary transition-colors duration-500">
                                MISTAHJZJ@GMAIL.COM
                                <motion.div
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                                />
                            </span>
                        </motion.a>

                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200%] bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                        />
                    </div>

                    <div ref={quoteRef} className="mt-12 md:mt-24">
                        <p className="text-lg md:text-3xl font-outfit font-light italic tracking-widest text-foreground/30 text-center">
                            "Choices have consequences."
                        </p>
                        <p className="mt-6 text-[10px] uppercase tracking-[0.8em] text-primary/60 font-black">
                            — Ghost
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
