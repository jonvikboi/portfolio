"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lanyard from "./Lanyard";
import { WordPullUp } from "./ui/word-pull-up";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const lanyardContainerRef = useRef<HTMLDivElement>(null);
    const isLanyardInView = useInView(lanyardContainerRef, { once: true, margin: "800px" });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });

        tl.fromTo(".fade-up",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out" }
        );
    }, []);

    const rules = [
        { title: "Architecture", desc: "Before aesthetics" },
        { title: "Separation", desc: "Before scale" },
        { title: "Performance", desc: "Before polish" },
        { title: "Refinement", desc: "Before release" }
    ];

    return (
        <section id="about" ref={containerRef} className="bg-background relative py-48 md:py-80 overflow-hidden">
            {/* Extremely subtle ambient glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-40 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">

                    {/* Primary Layout Grid */}
                    <div className="grid lg:grid-cols-12 gap-24 lg:gap-32">

                        {/* LEFT: Identity & Visual Anchor */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-16 md:space-y-20 flex flex-col items-center xl:items-start text-center xl:text-left">
                            <div className="fade-up">
                                <h2
                                    ref={headingRef}
                                    className="text-6xl md:text-[8vw] font-black font-outfit uppercase tracking-tighter text-primary leading-[0.8]"
                                >
                                    ABOUT<br />ME
                                </h2>
                                <div className="mt-6 md:mt-8 h-[2px] w-16 md:w-24 bg-primary/40 mx-auto xl:mx-0" />
                            </div>

                            {/* PORTRAIT: 3D Interactable Lanyard */}
                            <div 
                                ref={lanyardContainerRef}
                                className="fade-up flex justify-center w-full min-h-[500px] md:min-h-[600px] xl:pl-20"
                            >
                                {isLanyardInView && <Lanyard />}
                            </div>
                        </div>

                        {/* RIGHT: The Manifesto & Story */}
                        <div ref={contentRef} className="lg:col-span-12 xl:col-span-7 space-y-24 md:space-y-48 mt-12 md:mt-0">

                            {/* The Hook */}
                            <div className="fade-up space-y-10 md:space-y-12">
                                <div className="flex flex-col text-left">
                                    <WordPullUp
                                        words="I don’t just build stuff,"
                                        className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black text-foreground leading-[1.1] tracking-tight text-left block"
                                        framerProps={{
                                            hidden: { y: 20, opacity: 0 },
                                            show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
                                        }}
                                    />
                                    <WordPullUp
                                        words="I engineer experiences."
                                        className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black text-primary italic leading-[1.1] tracking-tight text-left block mt-1"
                                        wrapperFramerProps={{
                                          hidden: { opacity: 0 },
                                          show: {
                                            opacity: 1,
                                            transition: {
                                              staggerChildren: 0.1,
                                              delayChildren: 0.5 // Faster transition
                                            },
                                          },
                                        }}
                                        framerProps={{
                                            hidden: { y: 20, opacity: 0 },
                                            show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 25 } }
                                        }}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 md:gap-16 text-base md:text-xl text-foreground/60 font-inter font-light leading-relaxed">
                                    <WordPullUp
                                        words="I’m a B.Tech student who lives and breathes systems thinking, performance, and cinematic frontend feels. I spend my time in places where tech depth and visual appeal collide."
                                        delayMultiple={0}
                                        className="text-left text-base md:text-xl font-inter font-light leading-relaxed text-foreground/60"
                                        wrapperFramerProps={{
                                            hidden: { opacity: 0 },
                                            show: { opacity: 1, transition: { staggerChildren: 0.02 } }
                                        }}
                                    />
                                    <WordPullUp
                                        words="My roots are in AIML, OS, and full-stack development. I’m all about creating high-performance environments using modern React ecosystems and solid design logic."
                                        delayMultiple={0}
                                        className="text-left text-base md:text-xl font-inter font-light leading-relaxed text-foreground/60"
                                        wrapperFramerProps={{
                                            hidden: { opacity: 0 },
                                            show: { opacity: 1, transition: { staggerChildren: 0.02 } }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* The Purpose List */}
                            <div className="fade-up border-t border-primary/10 pt-16 md:pt-20">
                                <h3 className="text-[10px] uppercase tracking-[0.8em] text-primary/60 font-black mb-12 md:mb-16">
                                    The Core Tenets
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
                                    {rules.map((rule, idx) => (
                                        <div key={idx} className="group border-b border-primary/5 pb-8">
                                            <p className="text-[10px] font-mono text-primary/40 mb-2">0{idx + 1}</p>
                                            <p className="text-xl md:text-3xl font-outfit font-black uppercase tracking-tighter text-foreground/80 group-hover:text-primary transition-colors duration-500">
                                                {rule.title}
                                            </p>
                                            <p className="mt-1 font-outfit text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/20">
                                                {rule.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Final Rule */}
                            <div className="fade-up pt-24 md:pt-40 border-t border-primary/10">
                                <p className="text-lg md:text-2xl font-outfit font-medium text-foreground italic leading-snug">
                                    Whether it’s AIML, animation, or UI, I build stuff that adheres to one rule:
                                </p>
                                <p className="mt-6 text-xl md:text-4xl lg:text-5xl font-outfit font-black uppercase tracking-tighter text-primary">
                                    Make it striking. Efficient. Correct.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
