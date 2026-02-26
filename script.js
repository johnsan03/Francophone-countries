// Language Toggle Functionality
let currentLanguage = 'fr'; // Default language is French

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    updateLanguage(currentLanguage);
    
    // Add click event to language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
        lastScroll = currentScroll;
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe country cards
    const countryCards = document.querySelectorAll('.country-card');
    countryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Toggle between French and English
function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    updateLanguage(currentLanguage);
    updateLanguageButton();
}

// Update all text content based on selected language
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-fr][data-en]');
    
    elements.forEach(element => {
        if (lang === 'fr') {
            element.textContent = element.getAttribute('data-fr');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title
    const title = document.querySelector('title');
    if (title) {
        if (lang === 'fr') {
            title.textContent = title.getAttribute('data-fr') || 'Pays Francophones du Monde';
        } else {
            title.textContent = title.getAttribute('data-en') || 'Francophone Countries of the World';
        }
    }
}

// Update language toggle button appearance
function updateLanguageButton() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const activeSpan = langToggle.querySelector('.lang-active');
        const inactiveSpan = langToggle.querySelector('.lang-inactive');
        
        if (currentLanguage === 'fr') {
            activeSpan.textContent = 'FR';
            inactiveSpan.textContent = 'EN';
        } else {
            activeSpan.textContent = 'EN';
            inactiveSpan.textContent = 'FR';
        }
    }
}

// Add hover effects to country cards
document.addEventListener('DOMContentLoaded', function() {
    const countryCards = document.querySelectorAll('.country-card');
    
    countryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click animation to language toggle
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});
