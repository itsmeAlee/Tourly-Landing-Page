'use client';

import { ReactNode } from 'react';

interface SocialLinkProps {
    href: string;
    label: string;
    children: ReactNode;
}

/**
 * Reusable social link component for footer icons.
 * Applies consistent styling and accessibility attributes.
 * 
 * @example
 * <SocialLink href="https://instagram.com" label="Instagram">
 *   <InstagramIcon />
 * </SocialLink>
 */
export default function SocialLink({ href, label, children }: SocialLinkProps) {
    return (
        <a href={href} className="social-link" aria-label={label}>
            {children}
        </a>
    );
}
