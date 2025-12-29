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
        <div className="relative inline-flex items-center justify-start overflow-hidden h-[1.2em] w-[5.5ch] align-bottom">
            {/* 
        Width is set to 5.5ch based on the estimated average/max length. 
        You might want to adjustment 'w-[...]' or use a dynamic meausre 
        if words vary drastically in length, but user requested fixed width stability. 
        'expedition' is ~10 chars, 'adventure' ~9. 
        Let's try a bit wider or use a different strategy if needed.
        Actually, let's use a slightly wider fixed width or 'w-auto' with a min-width to avoid shifting.
        Better yet, let's allow it to be inline-block with a min-width suitable for the longest word.
        Current longest word is "expedition" (10 letters). 
        10ch might be a safer bet.
      */}
            <div className="relative w-[6.5ch] h-full">
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
                            display: 'inline-block',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {words[index]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}
