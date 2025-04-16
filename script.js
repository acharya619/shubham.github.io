document.addEventListener('DOMContentLoaded', () => {
    // Add dark theme background particles
    createParticles();

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // Reveal animations for sections
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.querySelector('.skill-progress').style.width = percent;
        });
    }
    
    // Trigger skill bar animation when skills section becomes visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateSkillBars();
                observer.disconnect();
            }
        });
        observer.observe(skillsSection);
    }

    // Add glow effect to the project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('glow-effect');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('glow-effect');
        });
    });

    // Typewriter effect for the header
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        setTimeout(() => {
            // Add cursor element after animation completes
            const cursor = document.createElement('span');
            cursor.classList.add('cursor');
            cursor.innerHTML = '|';
            headerTitle.appendChild(cursor);
            
            // Cursor blinking animation
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }, 1000); // Delay to allow the fade-in animation to complete
    }

    // Progressive loading for section elements
    const sectionContainers = document.querySelectorAll('section .container');
    sectionContainers.forEach(container => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }
        }, { threshold: 0.1 });
        observer.observe(container);
    });

    // Add parallax effect to header
    document.addEventListener('mousemove', (e) => {
        const headerElement = document.querySelector('header');
        if (headerElement) {
            const headerHeight = headerElement.offsetHeight;
            const mouseY = e.clientY;
            if (mouseY < headerHeight) {
                const moveY = (mouseY / headerHeight) * 15;
                headerElement.style.backgroundPositionY = `-${moveY}px`;
            }
        }
    });

    // Add sequential fadeIn animation to tech logos
    const techLogos = document.querySelectorAll('.tech-logo');
    techLogos.forEach((logo, index) => {
        logo.style.animationDelay = `${index * 0.1}s`;
        
        // Add event listeners for shake animation
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('shake-animation');
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.classList.remove('shake-animation');
        });
    });
});

// Function to create background particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    
    // Random size between 2px and 5px
    const size = Math.random() * 3 + 2;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random opacity between 0.1 and 0.5
    const opacity = Math.random() * 0.4 + 0.1;
    
    // Random animation duration between 20s and 40s
    const duration = Math.random() * 20 + 20;
    
    // Generate a random teal/blue color
    const blueShades = [
        'rgba(0, 180, 216, ' + opacity + ')',
        'rgba(0, 119, 182, ' + opacity + ')',
        'rgba(72, 202, 228, ' + opacity + ')',
        'rgba(0, 150, 199, ' + opacity + ')'
    ];
    
    const randomBlueShade = blueShades[Math.floor(Math.random() * blueShades.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${randomBlueShade};
        box-shadow: 0 0 ${size * 2}px ${randomBlueShade};
        top: ${posY}%;
        left: ${posX}%;
        animation: float ${duration}s infinite linear;
    `;
    
    // Set a random animation delay
    particle.style.animationDelay = `${Math.random() * -20}s`;
    
    container.appendChild(particle);
}

// Add necessary CSS for the animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
        }
        33% {
            transform: translateY(-20px) translateX(10px) rotate(120deg);
        }
        66% {
            transform: translateY(20px) translateX(-10px) rotate(240deg);
        }
        100% {
            transform: translateY(0) translateX(0) rotate(360deg);
        }
    }
    
    .cursor {
        display: inline-block;
        animation: blink 1s infinite;
        margin-left: 5px;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    section .container {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    /* Shake animation class that's added via JavaScript */
    .shake-animation {
        animation: shake 0.5s ease infinite !important;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateY(-5px) rotate(0deg); }
        25% { transform: translateY(-5px) rotate(-5deg); }
        75% { transform: translateY(-5px) rotate(5deg); }
    }
`;
document.head.appendChild(style); 