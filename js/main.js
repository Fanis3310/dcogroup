// DCO Group - Main JavaScript
// Foundation for animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initAnimations();
    initSmoothScroll();
    initMobileMenu();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Mobile accordion submenus with smooth animation
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            // Get the dropdown content - it's a sibling of the parent div, not the button
            const parentDiv = this.closest('.mobile-dropdown');
            const content = parentDiv.querySelector('.mobile-dropdown-content');
            const arrow = this.querySelector('.material-symbols-outlined');

            // Close all other accordions
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    const otherParent = otherToggle.closest('.mobile-dropdown');
                    const otherContent = otherParent.querySelector('.mobile-dropdown-content');
                    const otherArrow = otherToggle.querySelector('.material-symbols-outlined');
                    if (otherContent) {
                        otherContent.classList.remove('overflow-visible');
                        otherContent.style.maxHeight = '0';
                        otherContent.style.opacity = '0';
                        setTimeout(() => {
                            if (otherToggle.getAttribute('aria-expanded') === 'false') {
                                otherContent.classList.add('hidden');
                                otherContent.style.maxHeight = '';
                                otherContent.style.opacity = '';
                            }
                        }, 300);
                    }
                    if (otherArrow) {
                        otherArrow.style.transform = 'rotate(0deg)';
                    }
                }
            });

            // Toggle current with smooth animation
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                content.classList.remove('overflow-visible');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
                setTimeout(() => {
                    if (this.getAttribute('aria-expanded') === 'false') {
                        content.classList.add('hidden');
                    }
                }, 300);
            } else {
                this.setAttribute('aria-expanded', 'true');
                content.classList.remove('hidden');
                content.classList.add('overflow-visible');
                // Force reflow
                content.offsetHeight;
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                if (arrow) {
                    arrow.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }

        lastScroll = currentScroll;
    });
}

// Intersection Observer for scroll animations
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Export utilities for external use
window.DCO = {
    // Add custom animation class to element
    animate: function(element, animationClass) {
        if (element && animationClass) {
            element.classList.add(animationClass);
        }
    },

    // Scroll to element
    scrollTo: function(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
