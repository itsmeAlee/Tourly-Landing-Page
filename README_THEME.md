# Tourly Theme Guide

This document outlines the standardized design tokens and CSS classes for the Tourly project. Follow this guide when creating new pages or components to maintain visual consistency.

## Color System (OKLCH)

All colors use the OKLCH color space for perceptual uniformity.

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `oklch(0.98 0.01 225.66)` | `oklch(0.18 0.02 271.27)` | Page background |
| `--foreground` | `oklch(0.15 0.02 269.18)` | `oklch(0.92 0.01 238.47)` | Primary text |
| `--primary` | `oklch(0.71 0.15 239.15)` | Same | Brand blue, CTAs |
| `--primary-foreground` | `oklch(1 0 0)` | Same | Text on primary |
| `--secondary` | `oklch(0.94 0.02 229.20)` | `oklch(0.30 0.03 270.91)` | Secondary surfaces |
| `--muted` | `oklch(0.92 0.02 225.69)` | `oklch(0.25 0.03 270.91)` | Disabled/muted elements |
| `--muted-foreground` | `oklch(0.40 0.03 231.55)` | `oklch(0.65 0.03 269.46)` | Secondary text |
| `--card` | `oklch(0.99 0.005 228.79)` | `oklch(0.23 0.02 271.67)` | Card backgrounds |

## Shadow System (Dimensional 2D)

No borders - depth via shadows only.

| Token | Use Case |
|-------|----------|
| `--shadow-floating-sm` | Low elevation: cards at rest |
| `--shadow-floating-md` | Medium elevation: search bar, sticky header |
| `--shadow-floating-lg` | High elevation: modals, active sliders |
| `--shadow-tactile` | Buttons: bevel + thickness + drop |
| `--shadow-recessed` | Inputs: inset depth effect |
| `--shadow-separator` | Subtle dividers (replaces border-bottom) |

## Border Radius

| Token | Value | Use Case |
|-------|-------|----------|
| `--radius-sm` | `0.5rem` | Small elements, badges |
| `--radius-md` | `0.75rem` | Buttons, inputs |
| `--radius-lg` | `1rem` | Cards |
| `--radius-xl` | `1.5rem` | Sliders, large containers |
| `--radius-full` | `9999px` | Pills, avatars |

## Transitions

| Token | Duration | Easing | Use Case |
|-------|----------|--------|----------|
| `--transition-fast` | `150ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | Hovers, color changes |
| `--transition-base` | `250ms` | Same | General transitions |
| `--transition-bounce` | `400ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions |
| `--transition-instant` | `100ms` | `cubic-bezier(0.33, 1, 0.68, 1)` | Click feedback |

## Reusable Components

Located in `src/components/ui/`:

```tsx
import { SectionTitle, FeatureCard, TestimonialCard, SocialLink, ThemeToggle } from '@/components/ui';

// Section heading
<SectionTitle>My Section</SectionTitle>

// Feature card
<FeatureCard icon={<Icon />} title="Title" description="Description" />

// Testimonial
<TestimonialCard text="Quote" name="Name" initials="AB" />

// Social link
<SocialLink href="url" label="Platform"><Icon /></SocialLink>

// Theme toggle (self-contained)
<ThemeToggle />
```

## CSS Classes Reference

### Layout
- `.container` - Max 1200px centered with padding
- `.header` / `.footer` - Site-wide sticky elements

### Typography
- `.section-title` - Large centered headings (h2)
- `.hero-subtitle` - Muted paragraph under headings
- `.text-primary` - Primary blue color utility

### Cards
- `.feature-card` - Icon + title + description card
- `.testimonial-card` - Quote + avatar card
- `.slider-container` - Animated border container

### Buttons
- `.btn` - Base button styles
- `.btn-primary` - Solid primary with shimmer
- `.btn-action` - Hero action buttons

### Interactive
- `.nav-link` - Navigation text links
- `.social-link` - Icon link with hover effect
- `.theme-toggle` - Dark mode toggle button

## Animation Effects

1. **glossSweep** - Diagonal light sweep on buttons (every 5s)
2. **kenBurns** - Subtle zoom on slider images
3. **spin-border** - Rotating gradient border on cards

## Mobile Interaction Rules

> **CRITICAL**: ALL interactive elements MUST use `:focus-visible` for focus states to prevent sticky tap effects on mobile. Avoid using the `:hover` state for mobile-specific styles, as it persists after a touch event.

### Required Properties for All Interactive Elements

| Property | Value | Purpose |
|----------|-------|---------|
| `-webkit-tap-highlight-color` | `transparent` | Removes default tap highlight |
| `touch-action` | `manipulation` | Prevents browser hover simulation on touch |

### Focus State Guidelines

| Selector | Use Case | Notes |
|----------|----------|-------|
| `:focus` | ❌ NEVER use | Causes sticky tap on mobile |
| `:focus-visible` | ✅ Keyboard only | Shows ring for keyboard users only |
| `:active` | ✅ Tap feedback | Reverts immediately on touchend |
| `:hover` | ⚠️ Wrap in `@media (hover: hover)` | Only for true hover devices |

### Example: Correct Interactive Element

```css
.my-button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: color 0s; /* Immediate revert */
}

/* Hover only on true hover devices */
@media (hover: hover) {
    .my-button:hover {
        color: var(--primary);
        transition: color var(--transition-fast);
    }
}

/* Tap feedback - reverts immediately */
.my-button:active {
    filter: brightness(0.95);
}

/* Keyboard focus only - uses box-shadow for border-radius support */
.my-button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--primary);
}
```

### Zero Motion on Click

All buttons must have **NO scaling or shifting** when clicked:

```css
.button:active {
    transform: none !important; /* Static - no motion */
    filter: brightness(0.95); /* Subtle brightness change only */
}
```

### Rounded Clipping

For cards with `border-radius`, ensure tap highlights respect corners:

```css
.card {
    overflow: hidden;
    border-radius: inherit;
}
```
