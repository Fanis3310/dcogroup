// DCO Group - Main JavaScript
// Foundation for animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initAnimations();
    initSmoothScroll();
    initMobileMenu();
});

// Keep the current page highlighted in the mobile menu
function initActiveMobileMenuLink() {
    const menuLinks = document.querySelectorAll('.mobile-menu .menu-item-link');
    if (!menuLinks.length) return;

    const currentPath = window.location.pathname || '';
    const currentFile = (currentPath.split('/').pop() || 'index.html').toLowerCase();

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;

        let targetFile = '';

        try {
            const targetPath = new URL(href, window.location.origin).pathname;
            targetFile = (targetPath.split('/').pop() || 'index.html').toLowerCase();
        } catch (e) {
            targetFile = (href.split('/').pop() || '').toLowerCase();
        }

        const isMatch = targetFile === currentFile;
        link.classList.toggle('active', isMatch);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('is-open');
        menuBtn.classList.toggle('is-active');
        if (isOpen) {
            mobileMenu.classList.remove('is-open');
            mobileMenu.classList.add('is-closed');
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.remove('is-closed');
            mobileMenu.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('is-active');
            mobileMenu.classList.remove('is-open');
            mobileMenu.classList.add('is-closed');
            document.body.style.overflow = '';
        });
    });

    // Mobile accordion submenus with smooth animation
    const dropdownHeaders = document.querySelectorAll('.mobile-dropdown-header');
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // If the user specifically clicked the link text, let it navigate
            if (e.target.closest('a')) {
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.mobile-dropdown');
            const content = parent.querySelector('.mobile-dropdown-content');
            const icon = this.querySelector('.expand-icon');
            const isOpen = content.classList.contains('is-open');

            // Close all other accordions with smooth animation
            dropdownHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    const otherParent = otherHeader.closest('.mobile-dropdown');
                    const otherContent = otherParent.querySelector('.mobile-dropdown-content');
                    const otherIcon = otherHeader.querySelector('.expand-icon');
                    if (otherContent.classList.contains('is-open')) {
                        otherContent.classList.remove('is-open');
                        otherContent.style.maxHeight = '0';
                        if (otherIcon) otherIcon.classList.remove('is-rotated');
                    }
                }
            });

            // Toggle current with smooth animation
            if (isOpen) {
                content.style.maxHeight = '0';
                content.classList.remove('is-open');
                if (icon) icon.classList.remove('is-rotated');
            } else {
                content.classList.add('is-open');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.classList.add('is-rotated');
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            menuBtn.classList.remove('is-active');
            mobileMenu.classList.remove('is-open');
            mobileMenu.classList.add('is-closed');
            document.body.style.overflow = '';
        }
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
