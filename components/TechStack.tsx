"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import {
    Code2,
    FileJson,
    Layers,
    Layout,
    Terminal,
    Cpu,
    FileCode,
    Coffee,
    Binary,
    Globe,
    Zap,
    Wind
} from "lucide-react";

const WEB_STACK = [
    { name: "HTML", icon: Globe },
    { name: "CSS", icon: Layers },
    { name: "JAVASCRIPT", icon: FileJson },
    { name: "TYPESCRIPT", icon: Code2 },
    { name: "TAILWIND CSS", icon: Wind },
    { name: "REACT", icon: Zap },
    { name: "NEXT.JS", icon: Layout },
];

const CODING_STACK = [
    { name: "PYTHON", icon: Cpu },
    { name: "C", icon: Terminal },
    { name: "C++", icon: Binary },
    { name: "JAVA", icon: Coffee },
    { name: "SHELL", icon: FileCode },
];

export default function TechStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (headingRef.current) {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 90%",
                    }
                }
            );
        }

        if (containerRef.current) {
            const groups = containerRef.current.querySelectorAll(".stack-group");
            gsap.fromTo(groups,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.3,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        animate(e.currentTarget, {
            scale: 1.05,
            backgroundColor: "rgba(244, 12, 63, 0.1)",
            duration: 300,
            ease: "outQuad"
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        animate(e.currentTarget, {
            scale: 1,
            backgroundColor: "rgba(244, 12, 63, 0)",
            duration: 500,
            ease: "outElastic(1, .8)"
        });
    };

    return (
        <section id="tech-stack" className="section-crimson py-32 md:py-64 relative overflow-hidden flex flex-col items-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center">
                <h2
                    ref={headingRef}
                    className="text-5xl md:text-8xl font-black font-outfit uppercase tracking-tighter text-primary mb-32 text-center"
                >
                    THE ARSENAL
                </h2>

                <div ref={containerRef} className="w-full max-w-6xl space-y-48">
                    {/* Web Stack */}
                    <div className="stack-group flex flex-col items-center">
                        <h3 className="text-[10px] uppercase tracking-[0.8em] text-primary/60 font-black mb-16 text-center">Development Stack</h3>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 cursor-none">
                            {WEB_STACK.map((tech) => (
                                <div
                                    key={tech.name}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="tech-tag flex items-center gap-4 px-6 py-4 border border-primary/10 bg-transparent transition-colors group cursor-none"
                                >
                                    <tech.icon className="w-5 h-5 md:w-6 md:h-6 text-primary/60 group-hover:text-primary transition-colors" />
                                    <span className="text-xl md:text-3xl font-bold font-outfit uppercase tracking-tighter text-foreground/80 group-hover:text-foreground">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coding Stack */}
                    <div className="stack-group flex flex-col items-center">
                        <h3 className="text-[10px] uppercase tracking-[0.8em] text-primary/60 font-black mb-16 text-center">Coding Stack</h3>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 cursor-none">
                            {CODING_STACK.map((tech) => (
                                <div
                                    key={tech.name}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="tech-tag flex items-center gap-4 px-6 py-4 border border-primary/10 bg-transparent transition-colors group cursor-none"
                                >
                                    <tech.icon className="w-5 h-5 md:w-6 md:h-6 text-primary/60 group-hover:text-primary transition-colors" />
                                    <span className="text-xl md:text-3xl font-bold font-outfit uppercase tracking-tighter text-foreground/80 group-hover:text-foreground">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
