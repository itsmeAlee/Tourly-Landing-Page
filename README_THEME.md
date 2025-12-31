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
