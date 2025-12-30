'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Swiper from 'swiper';
import { Parallax, Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Bed, Compass, Sparkles, Activity, Smartphone, Monitor } from 'lucide-react';

import SwipeText from '../components/SwipeText';

// Words to cycle through in the swipe animation
const heroWords = ['adventure', 'expedition', 'discovery', 'escapade', 'journey'];

// Features Data
const featuresData = [
    {
        icon: <Bed size={28} strokeWidth={1.5} />,
        title: 'Hotels & Homestays',
        description: 'Cozy retreats and luxury stays tailored to your budget.',
    },
    {
        icon: <Compass size={28} strokeWidth={1.5} />,
        title: 'Tours & Local Guides',
        description: 'Explore hidden gems with experts who know the land best.',
    },
    {
        icon: <Sparkles size={28} strokeWidth={1.5} />,
        title: 'AI Trip Planner',
        description: 'Instant, personalized itineraries powered by smart AI.',
    },
    {
        icon: <Activity size={28} strokeWidth={1.5} />,
        title: 'Live Road Status',
        description: 'Real-time updates to keep your journey safe and smooth.',
    },
];

// Testimonials Data
const testimonialsData = [
    {
        name: 'Zeeshan Ahmed',
        initials: 'ZA',
        text: 'The Live Road Status saved our trip to Hunza! Truly a game changer.',
    },
    {
        name: 'Amna Khan',
        initials: 'AK',
        text: 'Finding a homestay in Skardu was never this easy. The AI planner is brilliant.',
    },
    {
        name: 'Bilal Shah',
        initials: 'BS',
        text: 'Highly recommend the local guides feature. We discovered hidden gems in Gilgit.',
    },
];

// Destination slides data
const destinations = [
    {
        image: '/images/Fairy-Meadows.png',
        title: 'Fairy Meadows',
        description: 'The base camp to Nanga Parbat, offering breathtaking alpine scenery',
    },
    {
        image: '/images/Khaplu-Fort.png',
        title: 'Khaplu Fort',
        description: 'A 19th-century royal palace showcasing Balti architecture',
    },
    {
        image: '/images/Skardu.png',
        title: 'Skardu',
        description: 'Gateway to some of the world\'s highest peaks and crystal lakes',
    },
    {
        image: '/images/Minimarg-Astore.png',
        title: 'Minimarg, Astore',
        description: 'Pakistan\'s hidden paradise with lush green meadows',
    },
    {
        image: '/images/Khaplu-Valley.png',
        title: 'Khaplu Valley',
        description: 'A serene valley known for ancient monasteries and orchards',
    },
    {
        image: '/images/Skardu-Panorama.png',
        title: 'Skardu Panorama',
        description: 'Where mountains meet the sky in perfect harmony',
    },
];

export default function LandingPage() {
    useEffect(() => {
        // ============================================
        // Dark Mode Toggle
        // ============================================
        const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;

        // Check for saved theme preference or system preference
        function initializeTheme() {
            const savedTheme = localStorage.getItem('tourly-theme');

            if (savedTheme) {
                htmlElement.classList.toggle('dark', savedTheme === 'dark');
            } else {
                // Check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                htmlElement.classList.toggle('dark', prefersDark);
            }
        }

        // Toggle theme and save preference
        function toggleTheme() {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('tourly-theme', isDark ? 'dark' : 'light');
        }

        // Initialize theme on page load
        initializeTheme();

        // Add event listener to theme toggle button
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('tourly-theme')) {
                htmlElement.classList.toggle('dark', e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        // ============================================
        // Mobile Menu Toggle
        // ============================================
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileNav = document.getElementById('mobileNav');

        const handleMobileMenuClick = () => {
            mobileMenuToggle?.classList.toggle('active');
            mobileNav?.classList.toggle('active');
        };

        if (mobileMenuToggle && mobileNav) {
            mobileMenuToggle.addEventListener('click', handleMobileMenuClick);

            // Close mobile menu when clicking a link
            const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
            mobileNavLinks.forEach((link) => {
                link.addEventListener('click', () => {
                    mobileMenuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                });
            });
        }

        // ============================================
        // Cinematic Parallax Slider - Swiper.js
        // ============================================
        const destinationSlider = new Swiper('.destination-slider', {
            modules: [Parallax, Pagination, Navigation, Autoplay, Keyboard],
            // Core settings
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,

            // Parallax effect for depth
            parallax: true,

            // Smooth, weighty transition
            speed: 800,
            effect: 'slide',

            // Easing for cinematic feel
            cssMode: false,

            // Autoplay (optional - creates immersive experience)
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // Pagination dots
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },

            // Keyboard navigation
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },

            // Touch/swipe gestures
            grabCursor: true,

            // Responsive breakpoints
            breakpoints: {
                320: {
                    speed: 600,
                },
                768: {
                    speed: 800,
                },
            },

            // Event handlers for Ken Burns effect
            on: {
                init: function (swiper) {
                    // Ensure first slide has the animation
                    const activeSlide = swiper.slides[swiper.activeIndex];
                    if (activeSlide) {
                        const img = activeSlide.querySelector('.slide-image') as HTMLElement;
                        if (img) {
                            img.style.animation = 'kenBurns 8s ease-out forwards';
                        }
                    }
                },
                slideChangeTransitionStart: function (swiper) {
                    // Reset animation on all slides
                    swiper.slides.forEach((slide: HTMLElement) => {
                        const img = slide.querySelector('.slide-image') as HTMLElement;
                        if (img) {
                            img.style.animation = 'none';
                        }
                    });
                },
                slideChangeTransitionEnd: function (swiper) {
                    // Apply Ken Burns to active slide
                    const activeSlide = swiper.slides[swiper.activeIndex];
                    if (activeSlide) {
                        const img = activeSlide.querySelector('.slide-image') as HTMLElement;
                        if (img) {
                            // Force reflow to restart animation
                            void img.offsetWidth;
                            img.style.animation = 'kenBurns 8s ease-out forwards';
                        }
                    }
                },
            },
        });

        // ============================================
        // Smooth Scroll Enhancement
        // ============================================
        const anchors = document.querySelectorAll('a[href^="#"]');
        const handleAnchorClick = function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            }
        };
        anchors.forEach((anchor) => {
            anchor.addEventListener('click', handleAnchorClick as EventListener);
        });

        // Cleanup
        return () => {
            if (themeToggle) {
                themeToggle.removeEventListener('click', toggleTheme);
            }
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
            if (mobileMenuToggle) {
                mobileMenuToggle.removeEventListener('click', handleMobileMenuClick);
            }
            anchors.forEach((anchor) => {
                anchor.removeEventListener('click', handleAnchorClick as EventListener);
            });
            destinationSlider.destroy();
        };
    }, []);

    return (
        <>
            {/* Navigation */}
            <header className="header">
                <div className="container header-container">
                    <a href="#" className="logo">
                        <Image
                            src="/images/logo.png"
                            alt="Tourly"
                            className="logo-img"
                            width={110}
                            height={55}
                            priority
                        />
                    </a>

                    <div className="header-actions">
                        <nav className="nav">
                            <a href="#destinations" className="nav-link">
                                Destinations
                            </a>
                            <a href="#features" className="nav-link">
                                Features
                            </a>
                            <a href="#testimonials" className="nav-link">
                                Testimonials
                            </a>
                            <a href="#footer" className="nav-link">
                                About us
                            </a>
                        </nav>
                        <button className="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
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
                        <button className="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>

                <nav className="mobile-nav" id="mobileNav">
                    <a href="#destinations" className="nav-link">
                        Destinations
                    </a>
                    <a href="#features" className="nav-link">
                        Features
                    </a>
                    <a href="#testimonials" className="nav-link">
                        Testimonials
                    </a>
                    <a href="#footer" className="nav-link">
                        About us
                    </a>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-wrapper">
                        <h1 className="main-heading">
                            <div className="line-1">
                                <span>Your next</span>
                                <div className="swipe-box">
                                    <SwipeText words={heroWords} />
                                </div>
                            </div>
                            <div className="line-2">starts right here</div>
                        </h1>
                    </div>
                    <p className="hero-subtitle">
                        Plan, book, and explore Gilgit-Baltistan—powered by smart travel tools.
                    </p>

                    {/* Hero Action Buttons */}
                    <div className="hero-actions">
                        <a href="#app" className="btn btn-action">
                            <Smartphone size={28} strokeWidth={2.5} color="white" />
                            <span>Start With App</span>
                        </a>
                        <a href="#web" className="btn btn-action">
                            <Monitor size={28} strokeWidth={2.5} color="white" />
                            <span>Start With Web</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="destinations" id="destinations">
                <div className="container">
                    <h2 className="section-title">Popular Destinations</h2>

                    {/* Cinematic Parallax Slider */}
                    <div className="slider-container">
                        <div className="swiper destination-slider">
                            <div className="swiper-wrapper">
                                {destinations.map((dest, index) => (
                                    <div className="swiper-slide" key={index}>
                                        <div className="slide-image-wrapper">
                                            <Image
                                                src={dest.image}
                                                alt={dest.title}
                                                className="slide-image"
                                                fill
                                                sizes="100vw"
                                                data-swiper-parallax="-300"
                                                priority={index === 0}
                                            />
                                        </div>
                                        <div className="slide-content" data-swiper-parallax="-100">
                                            <h3 className="slide-title">{dest.title}</h3>
                                            <p className="slide-description">{dest.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                            {/* Pagination */}
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Features Section */}
            <section className="features" id="features">
                <div className="container">
                    <h2 className="section-title">Why Choose Tourly?</h2>
                    <div className="features-grid">
                        {featuresData.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon-box">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="hero-subtitle" style={{ fontSize: '0.9375rem', marginBottom: 0, maxWidth: '100%' }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials" id="testimonials">
                <div className="container">
                    <h2 className="section-title">What Travelers Say</h2>
                    <SwiperReact
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        centeredSlides={true}
                        pagination={{ clickable: true }}
                        className="testimonials-slider"
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                centeredSlides: false,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                centeredSlides: false,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial-card">
                                    <p className="testimonial-text">"{testimonial.text}"</p>
                                    <div className="testimonial-author">
                                        <div className="author-avatar">{testimonial.initials}</div>
                                        <span className="author-name">{testimonial.name}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </SwiperReact>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" id="footer">
                <div className="container footer-container">
                    <div className="footer-left">
                        <p className="footer-copyright">&copy; 2025 Tourly. All rights reserved.</p>
                    </div>
                    <div className="footer-center">
                        <div className="footer-social">
                            {/* Instagram */}
                            <a href="#" className="social-link" aria-label="Instagram">
                                <svg
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
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            {/* Twitter/X */}
                            <a href="#" className="social-link" aria-label="Twitter">
                                <svg
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
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a href="#" className="social-link" aria-label="Facebook">
                                <svg
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
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="footer-right">
                        <a href="#privacy" className="footer-link">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
