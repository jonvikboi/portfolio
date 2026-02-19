"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Works", href: "#works" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const { scrollY } = useScroll();

    // Transform values based on scroll
    // When scrollY is 0, we want it spread out. When scrollY > 100, we want it as a pill.
    const navWidth = useTransform(scrollY, [0, 100], ["100%", "fit-content"]);
    const navPadding = useTransform(scrollY, [0, 100], ["2rem", "0.5rem"]);
    const navTop = useTransform(scrollY, [0, 100], ["1.5rem", "1.5rem"]);
    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(21, 0, 0, 0)", "rgba(21, 0, 0, 0.8)"]
    );
    const navBorder = useTransform(
        scrollY,
        [0, 100],
        ["none", "1px solid rgba(244, 12, 63, 0.2)"]
    );
    const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
    const navGap = useTransform(scrollY, [0, 100], ["4rem", "1.5rem"]);

    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["about", "tech-stack", "works", "contact"];
            let current = "";
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el && el.getBoundingClientRect().top <= 100) {
                    current = section;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.nav
            style={{
                width: navWidth,
                padding: navPadding,
                top: navTop,
                backgroundColor: navBackground,
                border: navBorder,
                backdropFilter: navBlur,
                gap: navGap,
            }}
            className="fixed left-1/2 -translate-x-1/2 z-[100] flex items-center justify-center rounded-full transition-all duration-500 ease-out pointer-events-auto"
        >
            {/* Left Links */}
            <div className="hidden lg:flex items-center gap-8">
                {NAV_LINKS.slice(0, 2).map((link) => (
                    <NavLink link={link} key={link.name} isActive={activeSection === link.href.replace("#", "")} />
                ))}
            </div>

            {/* Middle Logo */}
            <a
                href="#"
                onClick={scrollToTop}
                className="group relative flex items-center px-6"
            >
                <span className="font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter text-primary transition-all duration-300 group-hover:scale-110">
                    JONVIKBOI
                </span>
                <span className="absolute -bottom-1 left-6 right-6 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </a>

            {/* Right Links */}
            <div className="hidden lg:flex items-center gap-8">
                {NAV_LINKS.slice(2).map((link) => (
                    <NavLink link={link} key={link.name} isActive={activeSection === link.href.replace("#", "")} />
                ))}
            </div>

            {/* Mobile Menu Toggle (Simplified) */}
            <div className="lg:hidden">
                <NavLink link={NAV_LINKS[1]} isActive={activeSection === "about"} />
                <NavLink link={NAV_LINKS[4]} isActive={activeSection === "contact"} />
            </div>
        </motion.nav>
    );
}

function NavLink({ link, isActive }: { link: { name: string, href: string }, isActive: boolean }) {
    return (
        <a
            href={link.href}
            className={cn(
                "relative font-outfit text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300",
                isActive ? "text-primary" : "text-primary/60 hover:text-primary"
            )}
        >
            {link.name}
            {isActive && (
                <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                />
            )}
        </a>
    );
}
