import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

/**
 * SEO Metadata Configuration
 * Using Next.js Metadata API for comprehensive SEO
 */
export const metadata: Metadata = {
    // Core Metadata
    title: {
        default: 'Tourly - Discover Gilgit-Baltistan | Travel & Adventure',
        template: '%s | Tourly',
    },
    description:
        'Plan, book, and explore Gilgit-Baltistan with AI-powered travel tools. Find hotels, homestays, local guides, and get live road status updates for Hunza, Skardu, and beyond.',
    keywords: [
        'Gilgit-Baltistan tourism',
        'Hunza travel',
        'Skardu trips',
        'Pakistan travel',
        'adventure tourism',
        'Fairy Meadows',
        'Nanga Parbat',
        'Karakoram Highway',
        'local guides Pakistan',
        'AI trip planner',
    ],
    authors: [{ name: 'Tourly' }],
    creator: 'Tourly',
    publisher: 'Tourly',

    // Application Info
    applicationName: 'Tourly',
    generator: 'Next.js',

    // Robots & Indexing
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://tourly.pk',
        siteName: 'Tourly',
        title: 'Tourly - Discover Gilgit-Baltistan',
        description:
            'Your next adventure starts here. Plan, book, and explore Gilgit-Baltistan with AI-powered travel tools.',
        images: [
            {
                url: '/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Tourly - Discover the beauty of Gilgit-Baltistan',
            },
        ],
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: 'Tourly - Discover Gilgit-Baltistan',
        description:
            'Your next adventure starts here. Plan, book, and explore Gilgit-Baltistan with AI-powered travel tools.',
        images: ['/images/og-image.png'],
        creator: '@tourly_pk',
    },

    // Icons & Manifest
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },

    // Verification (add your IDs when available)
    // verification: {
    //     google: 'your-google-verification-id',
    //     yandex: 'your-yandex-verification-id',
    // },

    // Category
    category: 'travel',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body>{children}</body>
        </html>
    );
}
