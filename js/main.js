const SCROLL_THRESHOLD = 300;
const NAV_OFFSET = 60;
const NOTIFICATION_TIMEOUT = 3000;

function setHamburgerIcon(isExpanded) {
    hamburger.innerHTML = '';
    const icon = document.createElement('i');
    icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
    hamburger.appendChild(icon);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.setAttribute('role', 'alert');
    notification.className = `fiori-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), NOTIFICATION_TIMEOUT);
}
// Hamburger Menu Toggle with Accessibility and Mobile Menu Close
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle hamburger menu
if (hamburger && navLinks) {    
    hamburger.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active', isExpanded);
        hamburger.setAttribute('aria-expanded', isExpanded); // Accessibility for screen readers
        setHamburgerIcon(isExpanded);
    });
}

// Close mobile menu after clicking a nav link (Simple and Delightful)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        setHamburgerIcon(false);
    });
});

// Smooth Scroll with Offset for Fixed Navbar (Coherent Navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = NAV_OFFSET;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
            if (targetElement.hasAttribute('tabindex') || targetElement.tagName === 'A') {
                targetElement.focus();
            }
        }
    });
});

// Contact Form Submission with Formspree
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value || 'User';
        const email = document.getElementById('email')?.value;
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Client-side email validation
        const emailInput = document.getElementById('email');

        if (!emailInput.checkValidity()) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Success notification
                showNotification(`Thank you, ${name}! Your message has been sent.`);
                contactForm.reset(); // Reset the form
            } else {
                // Error notification
                const errorData = await response.json().catch(() => ({}));
                const message = errorData.message || 'Oops, something went wrong. Please try again later.';
                showNotification(message, 'error');
            }
        } catch (error) {
            // Network error notification 
            console.error('Form submission error', error);
            showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Back to top Button Functionality
const backToTopButton = document.querySelector('.back-to-top');

if  (backToTopButton) {
    backToTopButton.setAttribute('aria-label', 'Scroll to top');
    // Show/hide button based on scroll position
    const handleScroll = () => {
        backToTopButton.classList.toggle('visible', window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll);
    // Smooth scroll to top on click
    backToTopButton.addEventListener( 'click', () => {
        window.scrollTo({ top: 0,  behavior: 'smooth' });
        document.querySelector('header')?.focus(); // Focus header for accessibility
    });
};