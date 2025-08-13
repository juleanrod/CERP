// Form submission handling for Formspree
function submitForm(event) {
    // Formspree handles the submission automatically
    // We just need to show loading state and handle success
    
    // Show loading state
    const submitButton = event.target.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Formspree will handle the rest
    // The form will submit to Formspree and redirect to the thank you page
}

// Form validation
function validateForm(data) {
    const requiredFields = ['firstName', 'lastName', 'address', 'phone', 'email', 'utility', 'billAmount'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        showError('Please enter a valid phone number');
        return false;
    }
    
    return true;
}

// Send to CRM (replace with actual implementation)
function sendToCRM(data) {
    // This would typically be an API call to your CRM
    console.log('Sending to CRM:', data);
    
    // Example: Send to email (replace with actual CRM integration)
    const emailBody = `
        New CERP Lead:
        First Name: ${data.firstName}
        Last Name: ${data.lastName}
        Address: ${data.address}
        Phone: ${data.phone}
        Email: ${data.email}
        Utility: ${data.utility}
        Bill Amount: $${data.billAmount}
    `;
    
    // For now, just log it. In production, this would send to your CRM
    console.log('Email body:', emailBody);
}

// Show success message
function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    const form = document.querySelector('.eligibility-form');
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 5px; color: #155724;">
            <h3 style="color: #155724; margin-bottom: 1rem;">Thank You!</h3>
            <p>Your eligibility check is in progress. A program facilitator will reach out to review your savings report.</p>
        </div>
    `;
    
    form.style.display = 'none';
    formContainer.appendChild(successDiv);
    
    // Remove success message after 5 seconds and show form again
    setTimeout(() => {
        successDiv.remove();
        form.style.display = 'flex';
    }, 5000);
}

// Show error message
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const formContainer = document.querySelector('.form-container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="text-align: center; padding: 1rem; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; color: #721c24; margin-bottom: 1rem;">
            ${message}
        </div>
    `;
    
    formContainer.insertBefore(errorDiv, formContainer.firstChild);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Smooth scrolling to form
function scrollToForm() {
    const form = document.querySelector('.hero-form');
    form.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    document.querySelector('.mobile-menu-toggle').classList.remove('active');
                }
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll('.benefit-card, .program-card, .step-card, .testimonial');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#FFFFFF';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form field focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add loading animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
    }
}, 250));

// Add CSS for additional states
const additionalStyles = `
    .success-message {
        animation: slideIn 0.5s ease-out;
    }
    
    .error-message {
        animation: slideIn 0.5s ease-out;
    }
    
    .focused input,
    .focused select {
        border-color: var(--accent-gold);
        box-shadow: 0 0 0 3px rgba(207, 174, 89, 0.1);
    }
    
    .loading {
        position: relative;
        pointer-events: none;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .nav.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .nav.active .nav-list {
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 