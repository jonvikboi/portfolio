"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-background py-24 border-t border-primary/5 flex flex-col items-center justify-center overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">

                <div className="flex flex-col items-center gap-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-outfit text-4xl md:text-7xl font-black uppercase tracking-tighter text-primary/80"
                    >
                        JONVIKBOI
                    </motion.p>
                    <div className="h-[1px] w-12 bg-primary/20" />
                    <p className="font-inter text-[10px] uppercase tracking-[0.8em] text-foreground/20">
                        Digital Identity · Motion Architecture
                    </p>
                </div>

                {/* Resume Download Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="my-20"
                >
                    <motion.a
                        href="/Resume.pdf"
                        download="Joshua_Zachary_Jose_Resume.pdf"
                        initial={{ paddingLeft: "2rem", paddingRight: "2rem" }}
                        whileHover={{
                            paddingLeft: "3.5rem",
                            paddingRight: "3.5rem",
                            scale: 1.04
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                            mass: 1.2
                        }}
                        className="group relative h-14 md:h-16 bg-primary/5 border border-primary/20 text-primary font-playfair font-black italic uppercase tracking-[0.1em] text-sm md:text-lg rounded-full overflow-hidden transition-colors duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(244,12,63,0.3)] flex items-center justify-center gap-4"
                    >
                        <span className="relative z-10 transition-colors duration-500 group-hover:text-background flex items-center gap-3">
                            Download Resume
                            <svg className="w-5 h-5 text-primary group-hover:text-background transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </span>
                        {/* Swipe Effect Layer */}
                        <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    </motion.a>
                </motion.div>

                <div className="mt-16 flex flex-col items-center gap-2">
                    <p className="font-outfit text-[9px] uppercase tracking-[0.6em] text-foreground/5">
                        © 2026 JONVIKBOI · ALL RIGHTS RESERVED
                    </p>
                </div>

            </div>
        </footer>
    );
}
