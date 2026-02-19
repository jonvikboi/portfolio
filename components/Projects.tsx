"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

interface Repository {
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    displayName: string;
    image?: string;
}

const FEATURED_MAP: Record<string, string> = {
    "UI-UX-Movie-Info-Website": "The Bad Guys Movie Info",
    "Video_Game_Photo_Gallery": "Video Games Pic Gallery",
    "restaurant-delivery-angular": "Restaurant Order and Delivery",
    "recipe-website": "Recipel",
    "mindsake-website": "Mindsake",
    "dbms-project": "Online Shopping System"
};

const REPO_IMAGES: Record<string, string> = {
    "UI-UX-Movie-Info-Website": "/bad-guys.png",
    "Video_Game_Photo_Gallery": "/game.png",
    "restaurant-delivery-angular": "/restaurant.png",
    "recipe-website": "/recipel.png",
    "mindsake-website": "/mindsake.png"
};

const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2564&auto=format&fit=crop",
];

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRepos() {
            try {
                const response = await fetch("https://api.github.com/users/jonvikboi/repos?per_page=100");
                const data = await response.json();

                if (Array.isArray(data)) {
                    // Map only the specific repos requested, in the specific order
                    const featuredNames = Object.keys(FEATURED_MAP);
                    const filtered = featuredNames.map(name => {
                        const repo = data.find((r: any) => r.name === name);
                        if (repo) {
                            return {
                                ...repo,
                                displayName: FEATURED_MAP[name],
                                image: REPO_IMAGES[name]
                            };
                        }
                        return null;
                    }).filter(Boolean) as Repository[];

                    setRepos(filtered);
                }
            } catch (error) {
                console.error("Error fetching repos:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRepos();
    }, []);

    useEffect(() => {
        if (loading || repos.length === 0) return;

        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        // The exact horizontal movement distance
        // We use scrollWidth - window.innerWidth to slide precisely to the end
        const xMove = -(section.scrollWidth - window.innerWidth);

        const pin = gsap.to(section, {
            x: xMove,
            ease: "none",
            scrollTrigger: {
                trigger: trigger,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${section.scrollWidth - window.innerWidth}`,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            },
        });

        // Refresh ScrollTrigger after a short delay to ensure layout is settled
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timer);
            if (pin.scrollTrigger) pin.scrollTrigger.kill();
            pin.kill();
        };
    }, [repos, loading]);

    return (
        <div ref={triggerRef} id="works" className="overflow-hidden bg-background">
            {loading ? (
                <div className="h-screen flex items-center justify-center bg-background">
                    <p className="font-outfit text-primary animate-pulse tracking-[0.5em] uppercase text-xs">Accessing Data...</p>
                </div>
            ) : (
                <div
                    ref={sectionRef}
                    className="flex h-screen items-center will-change-transform"
                    style={{ width: `${repos.length * 100}vw` }}
                >
                    {repos.map((repo, index) => (
                        <div
                            key={repo.name}
                            className="w-[100vw] h-full flex items-center justify-center px-6 md:px-20 shrink-0"
                        >
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-card relative w-full h-[70vh] md:h-[80vh] group overflow-hidden bg-burgundy/20 border border-primary/10 cursor-none"
                            >
                                {/* Background Layer */}
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        src={repo.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                                        alt={repo.displayName}
                                        fill
                                        className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-40 transition-all duration-1000"
                                    />
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                                {/* Info Container */}
                                <div className="absolute bottom-16 left-12 right-12 z-20">
                                    <p className="text-primary font-outfit font-bold tracking-[0.4em] uppercase mb-4 text-[10px]">
                                        {repo.language || "Open Source"} // CREATIVE REPOSITORY
                                    </p>
                                    <h3 className="text-4xl md:text-7xl lg:text-9xl font-black font-outfit text-foreground leading-[0.85] tracking-tighter uppercase break-words max-w-5xl">
                                        {repo.displayName}
                                    </h3>
                                    <p className="mt-8 text-foreground/40 font-inter font-light text-sm md:text-xl max-w-xl line-clamp-2 uppercase tracking-wide">
                                        {repo.description || "Experimental digital architecture and creative engineering."}
                                    </p>
                                </div>

                                {/* Interactive Number */}
                                <div className="absolute top-12 right-12 z-20">
                                    <span className="font-outfit text-white/5 text-9xl font-black leading-none uppercase">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Magnetic Glow Effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at center, rgba(244, 12, 63, 0.1) 0%, transparent 70%)`
                                    }}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
