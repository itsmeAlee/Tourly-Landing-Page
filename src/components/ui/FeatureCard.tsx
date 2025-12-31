'use client';

import { ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

/**
 * Reusable feature card component.
 * Displays an icon, title, and description in the feature grid.
 * 
 * @example
 * <FeatureCard
 *   icon={<Bed size={28} strokeWidth={1.5} />}
 *   title="Hotels & Homestays"
 *   description="Cozy retreats and luxury stays tailored to your budget."
 * />
 */
export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <a
            href="https://north-stars.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="feature-card"
            style={{ textDecoration: 'none' }}
        >
            <div className="feature-icon-box">{icon}</div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
        </a>
    );
}
