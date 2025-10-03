// ===== PORTFOLIO JAVASCRIPT =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    initializeLoadingScreen();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeBackToTop();
    initializeTypingEffect();
    initializeParallax();
}

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }

    // Close mobile menu when link is clicked
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Active section highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Smooth scrolling for navigation links
    function smoothScrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        closeMobileMenu();
    }

    // Event listeners
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', highlightActiveSection);
    navToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Trigger progress circle animation when about section is visible
                if (entry.target.id === 'about') {
                    animateProgressCircle();
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe individual elements for staggered animations
    const animatedElements = document.querySelectorAll('.skill-item, .tool-card, .timeline-item, .project-card, .expertise-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(element);
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Add CSS classes for animations when elements come into view
    const animatedElements = document.querySelectorAll('.skill-item, .tool-card, .timeline-item, .project-card, .expertise-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    // This will be triggered by intersection observer
}

function animateSkillBars() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    const progFill = document.querySelectorAll('.prog-fill');
    
    // Animate skill bars
    skillProgress.forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
    
    // Animate programming skill bars
    progFill.forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// ===== PROGRESS CIRCLE ANIMATION =====
function animateProgressCircle() {
    const circle = document.querySelector('.circle-progress');
    if (circle) {
        const percent = circle.dataset.percent || 95;
        circle.style.background = `conic-gradient(var(--primary-color) ${percent}%, var(--border-color) ${percent}%)`;
    }
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('i');
    
    // Change button state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.className = 'fas fa-spinner fa-spin';
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button state
        submitBtn.disabled = false;
        btnText.textContent = 'Message Sent!';
        btnIcon.className = 'fas fa-check';
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
        }, 3000);
    }, 2000);
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    function toggleBackToTopBtn() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    window.addEventListener('scroll', toggleBackToTopBtn);
    backToTopBtn.addEventListener('click', scrollToTop);
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const roleElement = document.querySelector('.role');
    if (!roleElement) return;
    
    const roles = [
        'QA Engineer',
        'Test Automation Expert',
        'Quality Assurance Lead',
        'Software Testing Specialist',
        'Test Strategy Consultant'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                setTimeout(typeEffect, 500);
                return;
            }
        } else {
            roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
        }
        
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 2000);
}

// ===== PARALLAX EFFECT =====
function initializeParallax() {
    const floatingElements = document.querySelectorAll('.float-item');
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${parallax * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', throttle(handleParallax, 16));
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--secondary-color)' : type === 'error' ? '#e53e3e' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 0.25rem;
            transition: background-color 0.2s ease;
        }
        
        .notification-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Manual close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    });
}

// ===== ADDITIONAL INTERACTIVE FEATURES =====

// Tool card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
});

// Enhanced form validation
function validateForm() {
    const form = document.getElementById('contact-form');
    if (!form) return true;
    
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    // Name validation
    if (name.length < 2) {
        showNotification('Please enter a valid name (at least 2 characters)', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Subject validation
    if (subject.length < 5) {
        showNotification('Subject must be at least 5 characters long', 'error');
        return false;
    }
    
    // Message validation
    if (message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return false;
    }
    
    return true;
}

// Update form submission with validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                handleFormSubmit(e);
            }
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images (if any are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    lazyLoadImages();
    preloadCriticalResources();
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Focus management for better accessibility
function enhanceAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('tabindex', '-1');
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// ===== CONSOLE SIGNATURE =====
console.log(`
🚀 QA Engineer Portfolio
👨‍💻 Developed by Karan Kumar
🔧 Built with: HTML5, CSS3, JavaScript ES6+
📱 Fully Responsive & Accessible
🎨 Modern UI/UX Design
⚡ Optimized Performance
`);

// Service Worker registration for PWA (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below lines if you create a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered: ', registration))
        //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}