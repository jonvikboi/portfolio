"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Works", href: "#works" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Transform values based on scroll - THIN profile on scroll, Maximised at top
    const navWidth = useTransform(scrollY, [0, 100], ["100%", "fit-content"]);
    const navPadding = useTransform(scrollY, [0, 100], ["0.8rem 6rem", "0.3rem 1.5rem"]);
    const navTop = useTransform(scrollY, [0, 100], ["1.5rem", "1.5rem"]);

    // Background and blur transforms
    const navBackground = useTransform(
        scrollY,
        [0, 50, 100],
        ["rgba(21, 0, 0, 0)", "rgba(21, 0, 0, 0.4)", "rgba(21, 0, 0, 0.8)"]
    );
    const navBorder = useTransform(
        scrollY,
        [0, 95, 100],
        ["1px solid rgba(244, 12, 63, 0)", "1px solid rgba(244, 12, 63, 0)", "1px solid rgba(244, 12, 63, 0.2)"]
    );
    const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
    const navGap = useTransform(scrollY, [0, 100], ["6rem", "2rem"]);

    // Logo Specific Transforms - Scaled for high impact at top, slim on scroll
    const logoOpacity = useTransform(scrollY, [0, 50], [1, 1]);
    const logoY = useTransform(scrollY, [0, 50], [0, 0]);
    const logoScale = useTransform(scrollY, [0, 100], [2.2, 0.8]);

    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["about", "works", "contact"];
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

    const handleLinkClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false); // Close menu on click
        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const el = document.querySelector(href);
            if (el) {
                const top = el.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                }}
                style={{
                    width: navWidth,
                    padding: navPadding,
                    top: navTop,
                    backgroundColor: navBackground,
                    border: navBorder,
                    backdropFilter: navBlur,
                    gap: navGap,
                }}
                className="fixed left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between lg:justify-center rounded-full transition-all duration-500 ease-out pointer-events-auto max-w-[95vw]"
            >
                {/* Mobile Logo: Always Visible Leftish */}
                <div className="lg:hidden flex items-center pl-4">
                    <a href="#" onClick={(e) => handleLinkClick(e, "#")} className="relative w-44 h-14">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
                    </a>
                </div>

                {/* Desktop Left Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.slice(0, 2).map((link) => (
                        <NavLink link={link} key={link.name} isActive={activeSection === link.href.replace("#", "")} onClick={(e) => handleLinkClick(e, link.href)} />
                    ))}
                </div>

                {/* Desktop Middle Logo */}
                <motion.div
                    className="hidden lg:block relative"
                    style={{
                        opacity: logoOpacity,
                        y: logoY,
                        scale: logoScale,
                    }}
                >
                    <a
                        href="#"
                        onClick={(e) => handleLinkClick(e, "#")}
                        className="group relative flex items-center px-6"
                    >
                        <div className="relative w-40 h-10 md:w-48 md:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                            <Image src="/logo.png" alt="JonVikBoi Logo" fill className="object-contain" priority />
                        </div>
                    </a>
                </motion.div>

                {/* Desktop Right Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.slice(2).map((link) => (
                        <NavLink link={link} key={link.name} isActive={activeSection === link.href.replace("#", "")} onClick={(e) => handleLinkClick(e, link.href)} />
                    ))}
                </div>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 pr-4 text-primary transition-transform active:scale-90"
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 250 }}
                        className="fixed inset-0 z-[110] bg-background/98 backdrop-blur-3xl lg:hidden flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-10 right-10 text-primary border border-primary/20 p-4 rounded-full transition-transform active:scale-90"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-center gap-14">
                            {NAV_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    initial={{ opacity: 0, skewX: 0, scale: 1 }}
                                    animate={{ opacity: 1, skewX: 0, scale: 1 }}
                                    whileHover={{
                                        scale: 1.1,
                                        color: "#F40C3F",
                                        letterSpacing: "0.1em",
                                        skewX: -12
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ originX: 0.5 }}
                                    transition={{
                                        opacity: { duration: 0.6, delay: i * 0.1 },
                                        default: { type: "spring", stiffness: 250, damping: 25, mass: 0.5 }
                                    }}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className={cn(
                                        "text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter",
                                        activeSection === link.href.replace("#", "") ? "text-primary" : "text-foreground/80"
                                    )}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        <div className="absolute bottom-12 text-center">
                            <p className="text-[10px] uppercase tracking-[0.6em] text-primary/40 font-black">
                                JonVikBoi // Systems Engineer
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ link, isActive, onClick }: { link: { name: string, href: string }, isActive: boolean, onClick: (e: React.MouseEvent) => void }) {
    return (
        <a
            href={link.href}
            onClick={onClick}
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
