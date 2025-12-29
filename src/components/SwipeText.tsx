'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SwipeTextProps {
    words: string[];
    interval?: number;
}

export default function SwipeText({ words, interval = 3000 }: SwipeTextProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span className="swipe-text-container inline-flex relative h-[1.2em] overflow-hidden align-middle ml-[0.3em]" style={{ width: '10ch' }}>
            <span className="relative w-full h-full flex items-center justify-start">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                        key={words[index]}
                        className="absolute left-0 text-primary font-bold"
                        initial={{ y: '100%', opacity: 0, filter: 'blur(5px)' }}
                        animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: '-100%', opacity: 0, filter: 'blur(5px)' }}
                        transition={{
                            y: { type: "spring", stiffness: 100, damping: 20 },
                            opacity: { duration: 0.2 },
                            filter: { duration: 0.2 }
                        }}
                        style={{
                            lineHeight: 1,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {words[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
        </span>
    );
}
