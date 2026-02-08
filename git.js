// ============================================
// Git Boxx - Interactive JavaScript Functions
// ============================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    setupNavigation();
    setupButtons();
    setupSmoothScroll();
    setupIntersectionObserver();
    setupFormValidation();
    setupLogoInteraction();
    setupScrollAnimations();
    setupPageNavigation();
    console.log('Git Boxx initialized successfully!');
}

// ============================================
// PAGE NAVIGATION FUNCTIONS
// ============================================

function navigateToLogin() {
    console.log('Navigating to login page');
    window.location.href = 'login.html';
}

function navigateToDashboard() {
    const user = localStorage.getItem('gitBoxxUser');
    if (user) {
        window.location.href = 'dashboard.html';
    } else {
        console.log('User not authenticated, redirecting to login');
        navigateToLogin();
    }
}

function navigateToHome() {
    window.location.href = 'git.html';
}

function setupPageNavigation() {
    // Check if user is trying to access dashboard without login
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('dashboard.html')) {
        const user = localStorage.getItem('gitBoxxUser');
        if (!user) {
            console.log('Unauthorized dashboard access, redirecting to login');
            window.location.href = 'login.html';
        }
    }
}

// ============================================
// 1. NAVIGATION FUNCTIONS
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');

    if (navLinks.length > 0 && navbar) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href') || '';
                // Only intercept in-page anchor links (starting with '#').
                if (href.startsWith('#')) {
                    handleNavClick(e, link);
                } // otherwise allow normal navigation to other pages (e.g. login.html)
            });
        });

        // Change navbar style on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 30px rgba(0, 212, 255, 0.2)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
        });
    }
}

function handleNavClick(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightActiveLink(link);
    }
}

function highlightActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.style.color = '#f0f0f0');
    activeLink.style.color = '#00d4ff';
    activeLink.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
}

// ============================================
// 2. BUTTON FUNCTIONS
// ============================================

function setupButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    const planButtons = document.querySelectorAll('.plan-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if onclick is already set (from HTML)
            if (!this.hasAttribute('onclick')) {
                handleCTAClick(button);
            }
        });
        button.addEventListener('mouseover', () => addButtonGlow(button));
        button.addEventListener('mouseout', () => removeButtonGlow(button));
    });

    planButtons.forEach(button => {
        button.addEventListener('click', () => handlePlanSelection(button));
    });
}

function handleCTAClick(button) {
    const text = button.textContent;
    console.log(`CTA Button clicked: ${text}`);
    showNotification(`Ready to get started? ${text}`);
    
    // Add animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    // Navigate to login
    setTimeout(() => {
        navigateToLogin();
    }, 300);
}

function handlePlanSelection(button) {
    const planCard = button.closest('.pricing-card');
    const planName = planCard.querySelector('h4').textContent;
    
    console.log(`Plan selected: ${planName}`);
    showNotification(`${planName} plan selected! 🎉`);
    
    // Highlight selected plan
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.style.borderColor = 'transparent';
    });
    planCard.style.borderColor = '#00d4ff';
    planCard.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
}

function addButtonGlow(button) {
    button.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
}

function removeButtonGlow(button) {
    button.style.boxShadow = '0 4px 15px rgba(255, 0, 110, 0.3)';
}

// ============================================
// 3. SMOOTH SCROLL FUNCTIONS
// ============================================

function setupSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// 4. INTERSECTION OBSERVER - ANIMATIONS ON SCROLL
// ============================================

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .pricing-card, .testimonial-card, .benefit-item, .intro'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
}

function animateElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 50);
}

// ============================================
// 5. FORM VALIDATION
// ============================================

function setupFormValidation() {
    // Add form validation to any forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => validateForm(e, form));
    });
}

function validateForm(e, form) {
    e.preventDefault();
    console.log('Form submitted');
    showNotification('Thank you! We will contact you soon.');
    form.reset();
}

// ============================================
// 6. LOGO INTERACTION
// ============================================

function setupLogoInteraction() {
    const logoContainer = document.querySelector('.logo-container');
    
    if (logoContainer) {
        logoContainer.addEventListener('click', () => {
            scrollToTop();
            showNotification('Welcome to Git Boxx!');
        });
        
        logoContainer.addEventListener('mouseover', () => {
            logoContainer.style.cursor = 'pointer';
        });
    }
}

// ============================================
// 7. SCROLL ANIMATIONS
// ============================================

function setupScrollAnimations() {
    window.addEventListener('scroll', () => {
        updateParallaxEffect();
        updateScrollProgress();
    });
}

function updateParallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    if (hero && scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
}

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    
    // Update progress indicator if exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

// ============================================
// 8. NOTIFICATION SYSTEM
// ============================================

function showNotification(message, duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ============================================
// 9. FEATURE CARD INTERACTIONS
// ============================================

function setupFeatureCardInteractions() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            handleFeatureCardClick(card, index);
        });
    });
}

function handleFeatureCardClick(card, index) {
    const title = card.querySelector('h4').textContent;
    const description = card.querySelector('p').textContent;
    
    console.log(`Feature ${index + 1}: ${title}`);
    showNotification(`${title}: ${description.substring(0, 40)}...`);
}

// ============================================
// 10. THEME TOGGLE (Dark/Light Mode - Optional)
// ============================================

function setupThemeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        console.log('Dark mode preferred');
    } else {
        console.log('Light mode preferred');
    }
    
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            console.log('Switched to dark mode');
        } else {
            console.log('Switched to light mode');
        }
    });
}

// ============================================
// 11. KEYBOARD SHORTCUTS
// ============================================

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K - Focus search/navigate
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            console.log('Keyboard shortcut: Navigate');
        }
        
        // Escape - Close any modals
        if (e.key === 'Escape') {
            console.log('Escape pressed');
        }
    });
}

// ============================================
// 12. COUNTER/STATS ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const step = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// 13. UTILITY FUNCTIONS
// ============================================

function getWindowWidth() {
    return window.innerWidth;
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function logAppInfo() {
    console.log('%c🎮 Git Boxx - Virtual Reality Experience', 'color: #00d4ff; font-size: 18px; font-weight: bold;');
    console.log('%cVersion: 1.0.0', 'color: #00ff00; font-size: 12px;');
    console.log('%cBuilt with modern web technologies', 'color: #ff006e; font-size: 12px;');
}

// ============================================
// 14. PERFORMANCE MONITORING
// ============================================

function monitorPerformance() {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
        logAppInfo();
    });
}

// Call performance monitoring on load
monitorPerformance();

// Initialize keyboard shortcuts
setupKeyboardShortcuts();
setupFeatureCardInteractions();
setupThemeToggle();

// Export functions for global access if needed
window.gitBoxx = {
    scrollToTop,
    scrollToSection,
    showNotification,
    animateCounter,
    isMobileDevice,
    getWindowWidth
};

// Also expose common navigation helpers for inline handlers and legacy HTML
window.navigateToLogin = navigateToLogin;
window.navigateToDashboard = navigateToDashboard;
window.navigateToHome = navigateToHome;
window.showNotification = showNotification;
window.animateCounter = animateCounter;
