'use client';

import { ReactNode } from 'react';

interface SectionTitleProps {
    children: ReactNode;
    className?: string;
}

/**
 * Reusable section title component.
 * Renders an h2 with the standardized section-title styling.
 * 
 * @example
 * <SectionTitle>Popular Destinations</SectionTitle>
 */
export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
    return (
        <h2 className={`section-title ${className}`.trim()}>
            {children}
        </h2>
    );
}
