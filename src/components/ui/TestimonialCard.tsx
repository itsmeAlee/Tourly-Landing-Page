'use client';

interface TestimonialCardProps {
    text: string;
    name: string;
    initials: string;
}

/**
 * Reusable testimonial card component.
 * Displays a quote, author avatar (initials), and author name.
 * 
 * @example
 * <TestimonialCard
 *   text="The Live Road Status saved our trip to Hunza!"
 *   name="Zeeshan Ahmed"
 *   initials="ZA"
 * />
 */
export default function TestimonialCard({ text, name, initials }: TestimonialCardProps) {
    return (
        <div className="testimonial-card">
            <p className="testimonial-text">&quot;{text}&quot;</p>
            <div className="testimonial-author">
                <div className="author-avatar">{initials}</div>
                <span className="author-name">{name}</span>
            </div>
        </div>
    );
}
