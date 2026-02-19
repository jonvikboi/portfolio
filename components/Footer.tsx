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

                <div className="mt-16 flex flex-col items-center gap-2">
                    <p className="font-outfit text-[9px] uppercase tracking-[0.6em] text-foreground/5">
                        © 2026 JONVIKBOI · ALL RIGHTS RESERVED
                    </p>
                </div>

            </div>
        </footer>
    );
}
