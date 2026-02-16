// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_be7zk1s';
const EMAILJS_TEMPLATE_ID = 'template_sobp2kd';
const EMAILJS_PUBLIC_KEY = '4SmkEcIT_EWG6XPdC';

// Initialize EmailJS when ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure emailjs is available globally
    setTimeout(function() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('✅ EmailJS v4 initialized successfully');
        } else {
            console.error('❌ EmailJS still not available');
        }
    }, 300);
});

// Form submission handler with EmailJS
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formStatus = document.getElementById('formStatus');

    // Validation
    if (!name || !email || !message) {
        formStatus.textContent = '❌ Please fill in all fields.';
        formStatus.classList.add('error');
        return;
    }

    // Show loading state
    formStatus.textContent = '⏳ Sending your message...';
    formStatus.classList.remove('success', 'error');
    formStatus.classList.add('loading');

    // Prepare email parameters
    const emailParams = {
        to_email: 'info.kjb7@gmail.com', // Your email address
        from_name: name,
        from_email: email,
        message: message
    };

    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            
            // Show success message
            formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
            formStatus.classList.remove('error', 'loading');
            formStatus.classList.add('success');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('success');
            }, 5000);
        }, function(error) {
            console.error('Failed to send email:', error);
            
            // Show error message
            formStatus.textContent = '❌ Failed to send message. Please try again or contact via email.';
            formStatus.classList.remove('loading');
            formStatus.classList.add('error');
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('error');
            }, 5000);
        });
});

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--neon-green)';
            link.style.textShadow = '0 0 10px var(--glow-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
            link.style.textShadow = 'none';
        }
    });
});

// Cursor effect (optional)
document.addEventListener('mousemove', (e) => {
    // You can add additional cursor effects here if desired
});