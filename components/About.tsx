"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CometCard } from "./ui/comet-card";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
                        <div className="lg:col-span-12 xl:col-span-5 space-y-20">
                            <div className="fade-up">
                                <h2
                                    ref={headingRef}
                                    className="text-8xl md:text-[8vw] font-black font-outfit uppercase tracking-tighter text-primary leading-[0.8]"
                                >
                                    ABOUT<br />ME
                                </h2>
                                <div className="mt-8 h-[2px] w-24 bg-primary/40" />
                            </div>

                            {/* PORTRAIT: Comet Card Integration */}
                            <div className="fade-up flex justify-center lg:justify-start lg:pl-20 xl:pl-40 lg:translate-x-8">
                                <CometCard rotateDepth={8} translateDepth={15}>
                                    <div
                                        className="relative flex w-full max-w-[400px] flex-col items-stretch rounded-[24px] border border-primary/10 bg-[#120002] p-3 md:p-5 transition-colors overflow-hidden"
                                        style={{
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px]">
                                            <img
                                                loading="lazy"
                                                className="h-full w-full object-cover saturate-[0.8] contrast-[1.1]"
                                                alt="Joshua Zachary Jose"
                                                src="/dev.jpeg"
                                                style={{
                                                    transform: "translateZ(10px)",
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                                        </div>

                                        <div className="mt-6 flex flex-col p-2" style={{ transform: "translateZ(40px)" }}>
                                            <div className="font-outfit text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
                                                Joshua Zachary Jose
                                            </div>
                                            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.4em] text-primary/60">
                                                Systems Engineer // B.Tech
                                            </div>
                                        </div>

                                        {/* Corner Decoration */}
                                        <div className="absolute top-0 right-0 p-6 opacity-20 h-full w-full pointer-events-none flex items-start justify-end">
                                            <div className="h-12 w-12 border-t-2 border-r-2 border-primary/40 rounded-tr-xl" />
                                        </div>
                                    </div>
                                </CometCard>
                            </div>
                        </div>

                        {/* RIGHT: The Manifesto & Story */}
                        <div ref={contentRef} className="lg:col-span-12 xl:col-span-7 space-y-32 md:space-y-48">

                            {/* The Hook */}
                            <div className="fade-up space-y-12">
                                <p className="text-4xl md:text-5xl lg:text-6xl font-outfit font-black text-foreground leading-[1.05] tracking-tight">
                                    I don’t just build stuff,<br />
                                    <span className="text-primary italic">I engineer experiences.</span>
                                </p>

                                <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-lg md:text-xl text-foreground/60 font-inter font-light leading-relaxed">
                                    <p>
                                        I’m a B.Tech student who lives and breathes <span className="text-foreground font-medium">systems thinking</span>, performance, and cinematic frontend feels. I spend my time in places where tech depth and visual appeal collide.
                                    </p>
                                    <p>
                                        My roots are in <span className="text-foreground font-medium">ML, OS, and full-stack</span> development. I’m all about creating high-performance environments using modern React ecosystems and solid design logic.
                                    </p>
                                </div>
                            </div>

                            {/* The Purpose List */}
                            <div className="fade-up border-t border-primary/10 pt-20">
                                <h3 className="text-[10px] uppercase tracking-[0.8em] text-primary/60 font-black mb-16">
                                    The Core Tenets
                                </h3>

                                <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12">
                                    {rules.map((rule, idx) => (
                                        <div key={idx} className="group border-b border-primary/5 pb-8">
                                            <p className="text-[10px] font-mono text-primary/40 mb-2">0{idx + 1}</p>
                                            <p className="text-2xl md:text-3xl font-outfit font-black uppercase tracking-tighter text-foreground/80 group-hover:text-primary transition-colors duration-500">
                                                {rule.title}
                                            </p>
                                            <p className="mt-1 font-outfit text-xs uppercase tracking-[0.4em] text-foreground/20">
                                                {rule.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Final Rule */}
                            <div className="fade-up pt-40 border-t border-primary/10">
                                <p className="text-xl md:text-2xl font-outfit font-medium text-foreground italic leading-snug">
                                    Whether it’s ML, animation, or UI, I build stuff that adheres to one rule:
                                </p>
                                <p className="mt-6 text-2xl md:text-4xl lg:text-5xl font-outfit font-black uppercase tracking-tighter text-primary">
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
