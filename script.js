// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('fade-out');
    }, 1000);
});

// Particle Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY *= -1;
        }
    }
    
    draw() {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect particles with lines
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

// Initialize and animate particles
initParticles();
animateParticles();

// Handle window resize for particles
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Skill Bars Animation on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-meter-fill');
            fills.forEach(fill => {
                fill.style.width = fill.getAttribute('data-width');
            });
        }
    });
}, observerOptions);

// Observe all skill boxes
document.querySelectorAll('.skill-box').forEach(box => {
    skillObserver.observe(box);
});



// Add smooth transition effect to cards on hover
document.querySelectorAll('.hobby-card, .skill-box, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

// Typing Effect for Hero Subtitle
const subtitle = document.querySelector('.hero .subtitle');
const originalText = subtitle.textContent;
subtitle.textContent = '';
let charIndex = 0;

function typeWriter() {
    if (charIndex < originalText.length) {
        subtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after a delay
setTimeout(typeWriter, 1500);

// Add fade-in animation to elements on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply fade-in effect to all major sections
document.querySelectorAll('.bio-container, .skills-container, .hobbies-grid, .contacts-container').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.8s ease';
    fadeObserver.observe(element);
});

// Add interactive cursor effect (optional enhancement)
let cursorDot = null;
let cursorOutline = null;

// Create custom cursor elements
function createCustomCursor() {
    cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #00ffff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
    `;
    
    cursorOutline = document.createElement('div');
    cursorOutline.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid #00ffff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: all 0.15s ease;
    `;
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
}

// Track mouse movement for custom cursor
document.addEventListener('mousemove', (e) => {
    if (cursorDot && cursorOutline) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorOutline.style.left = (e.clientX - 15) + 'px';
        cursorOutline.style.top = (e.clientY - 15) + 'px';
    }
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .hobby-card, .skill-box, .contact-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (cursorOutline) {
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.borderColor = '#ff00ff';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (cursorOutline) {
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.borderColor = '#00ffff';
        }
    });
});

// Initialize custom cursor on desktop only
if (window.innerWidth > 768) {
    createCustomCursor();
}

// Smooth reveal animation for profile card
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    const profileObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    }, { threshold: 0.3 });
    
    profileObserver.observe(profileCard);
}

// Add click effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console Easter Egg
console.log('%c👋 Привет, разработчик!', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cЕсли ты это читаешь, значит тебе интересен мой код 😊', 'color: #ff00ff; font-size: 14px;');
console.log('%cСвяжись со мной: clownMail@gmail.com', 'color: #00ffff; font-size: 14px;');