/**
 * Tourly - Premium Tourism Landing Page
 * JavaScript for Dark Mode Toggle & Cinematic Slider
 */

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
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('tourly-theme')) {
        htmlElement.classList.toggle('dark', e.matches);
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Search Placeholder Visibility
    const searchInput = document.querySelector('.search-input');
    const searchPlaceholder = document.querySelector('.search-placeholder');

    if (searchInput && searchPlaceholder) {
        // Hide placeholder when typing, show when empty
        searchInput.addEventListener('input', () => {
            searchPlaceholder.style.opacity = searchInput.value ? '0' : '1';
        });

        // Hide placeholder on focus
        searchInput.addEventListener('focus', () => {
            searchPlaceholder.style.opacity = '0';
        });

        // Show placeholder on blur if empty
        searchInput.addEventListener('blur', () => {
            if (!searchInput.value) {
                searchPlaceholder.style.opacity = '1';
            }
        });
    }
    // Close mobile menu when clicking a link
    const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
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
        init: function () {
            // Ensure first slide has the animation
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
                const img = activeSlide.querySelector('.slide-image');
                if (img) {
                    img.style.animation = 'kenBurns 8s ease-out forwards';
                }
            }
        },
        slideChangeTransitionStart: function () {
            // Reset animation on all slides
            this.slides.forEach(slide => {
                const img = slide.querySelector('.slide-image');
                if (img) {
                    img.style.animation = 'none';
                }
            });
        },
        slideChangeTransitionEnd: function () {
            // Apply Ken Burns to active slide
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
                const img = activeSlide.querySelector('.slide-image');
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Search Bar Enhancement
// ============================================
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            // Placeholder for search functionality
            console.log('Searching for:', query);
            // Could redirect to search results page or filter destinations
        } else {
            searchInput.focus();
        }
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}
