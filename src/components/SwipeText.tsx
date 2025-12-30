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

    // Find the longest word to set minimum width
    const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, '');

    return (
        <span className="swipe-word-wrapper">
            <span className="swipe-word-inner">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                        key={words[index]}
                        className="swipe-word"
                        initial={{ y: '100%', opacity: 0, filter: 'blur(5px)' }}
                        animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: '-100%', opacity: 0, filter: 'blur(5px)' }}
                        transition={{
                            y: { type: "spring", stiffness: 100, damping: 20 },
                            opacity: { duration: 0.2 },
                            filter: { duration: 0.2 }
                        }}
                    >
                        {words[index]}
                    </motion.span>
                </AnimatePresence>
                {/* Hidden span for width calculation */}
                <span className="swipe-word-sizer" aria-hidden="true">{longestWord}</span>
            </span>
        </span>
    );
}
