'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Theme toggle button component.
 * Handles dark/light mode switching with system preference detection.
 * Uses sun/moon icons to indicate current theme.
 */
export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);

    const toggleTheme = useCallback(() => {
        const htmlElement = document.documentElement;
        const isDark = htmlElement.classList.toggle('dark');
        localStorage.setItem('tourly-theme', isDark ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('tourly-theme');
        const htmlElement = document.documentElement;

        if (savedTheme) {
            htmlElement.classList.toggle('dark', savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            htmlElement.classList.toggle('dark', prefersDark);
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('tourly-theme')) {
                htmlElement.classList.toggle('dark', e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        // Mark as mounted after initial render (intentional for hydration safety)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    // Avoid hydration mismatch - show placeholder during SSR
    if (!mounted) {
        return (
            <button className="theme-toggle" aria-label="Toggle dark mode">
                <span style={{ width: 20, height: 20 }} />
            </button>
        );
    }

    return (
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <svg
                className="icon-sun"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg
                className="icon-moon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </button>
    );
}
