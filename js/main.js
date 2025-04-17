// Hamburger Menu Toggle with Accessibility and Mobile Menu Close
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isExpanded); // Accessibility for screen readers
        hamburger.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>'; // Toggle icon for delight
    });

    // Close mobile menu after clicking a nav link (Simple and Delightful)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Smooth Scroll with Offset for Fixed Navbar (Coherent Navigation)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = 60; // Adjust for fixed navbar height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
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
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { 
                const notification = document.createElement('div');
                notification.className = 'fiori-notification error';
                notification.innerHTML = `Please enter a valid email address.`;
                document.body.appendChild(notification);
                setTimeout(() => {
                    notification.remove();
                }, 3000);
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
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success notification
                    const notification = document.createElement('div');
                    notification.className = 'fiori-notification success';
                    notification.innerHTML = `Thank you, ${name}! Your message has been sent.`;
                    document.body.appendChild(notification);

                    // Remove notification after 3 seconds
                    setTimeout(() => {
                        notification.remove();
                    }, 3000);

                    contactForm.reset(); // Reset the form
                } else {
                    // Error notification
                    const notification = document.createElement('div');
                    notification.className = 'fiori-notification error';
                    notification.innerHTML = `Oops, something went wrong. Please try again later.`;
                    document.body.appendChild(notification);

                    setTimeout(() => {
                        notification.remove();
                    }, 3000);
                }
            } catch (error) {
                // Network error notification
                const notification = document.createElement('div');
                notification.className = 'fiori-notification error';
                notification.innerHTML = `Network error. Please check your connection and try again.`;
                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.remove();
                }, 3000);      
            } finally {
                // Reset button state
                submitButton.disable = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }

    // Smooth scroll to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});