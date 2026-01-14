// ============================================
// OPENMILES - VISTO STYLE INTERACTIONS
// Smooth Page Transitions & Animations
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // SMOOTH PAGE TRANSITIONS (VISTO STYLE)
    // ============================================

    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);

    // Intercept all internal links
    document.querySelectorAll('a[href^="index.html"], a[href^="about.html"], a[href^="services.html"], a[href^="contact.html"], a[href^="blog.html"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');

            // Trigger transition
            transitionOverlay.classList.add('active');

            // Navigate after transition
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        });
    });

    // Fade in on page load
    window.addEventListener('load', function () {
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 100);
    });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                if (mobileToggle) mobileToggle.textContent = '☰';
            });
        });
    }

    // ============================================
    // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Observe numbered items
    document.querySelectorAll('.numbered-item').forEach(el => observer.observe(el));

    // ============================================
    // ENHANCED PARALLAX & SCROLL EFFECTS (VISTO STYLE)
    // ============================================
    const splitImages = document.querySelectorAll('.split-image img');
    const heroImage = document.querySelector('.hero-image');

    // Throttled scroll handler for better performance
    let scrollTicking = false;

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            window.requestAnimationFrame(function () {
                const scrollY = window.scrollY;

                // Enhanced parallax for split section images
                splitImages.forEach(img => {
                    const section = img.closest('.split-section');
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

                        if (scrollPercent > 0 && scrollPercent < 1) {
                            // More pronounced parallax movement
                            const translateY = (scrollPercent - 0.5) * 120;
                            img.style.transform = `translateY(${translateY}px) scale(1.2)`;
                        }
                    }
                });

                // Enhanced parallax for hero image
                if (heroImage && scrollY < window.innerHeight) {
                    const parallaxSpeed = 0.6;
                    heroImage.style.transform = `translateY(${scrollY * parallaxSpeed}px) scale(1.15)`;

                    // Add opacity fade effect
                    const opacity = 1 - (scrollY / window.innerHeight) * 0.5;
                    heroImage.style.opacity = Math.max(opacity, 0.5);
                }

                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // ============================================
    // STAGGER ANIMATION FOR NUMBERED ITEMS
    // ============================================
    const numberedItems = document.querySelectorAll('.numbered-item');

    const staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger by 100ms
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    numberedItems.forEach(item => staggerObserver.observe(item));

    // ============================================
    // SMOOTH REVEAL FOR SPLIT CONTENT
    // ============================================
    const splitContents = document.querySelectorAll('.split-content-inner');

    const splitObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                splitObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    splitContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(40px)';
        content.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        splitObserver.observe(content);
    });

    // ============================================
    // TITLE REVEAL ANIMATION (CHARACTER BY CHARACTER)
    // ============================================
    const fullwidthTitles = document.querySelectorAll('.fullwidth-title');

    fullwidthTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';

        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.opacity = '0';
            wordSpan.style.transform = 'translateY(20px)';
            wordSpan.textContent = word + ' ';
            title.appendChild(wordSpan);
        });

        const wordSpans = title.querySelectorAll('span');

        const titleObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wordSpans.forEach((span, index) => {
                        setTimeout(() => {
                            span.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                    titleObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        titleObserver.observe(title);
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // FORM VALIDATION (for contact page)
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 40px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#00FF00' : '#FF0000'};
            color: #000;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s cubic-bezier(0.76, 0, 0.24, 1)';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    // ============================================
    // CURSOR EFFECT (OPTIONAL ENHANCEMENT)
    // ============================================
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
        transition: transform 0.2s;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 4 + 'px';
        cursor.style.top = e.clientY - 4 + 'px';
        cursor.style.display = 'block';
    });

    // Enlarge cursor on hover over interactive elements
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(3)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                // Scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c🚀 Openmiles', 'color: #fff; font-size: 24px; font-weight: bold; background: #000; padding: 10px;');
    console.log('%cVisto-inspired design with smooth transitions', 'color: #999; font-size: 12px;');
});

// ============================================
// ADD ANIMATION KEYFRAMES
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
