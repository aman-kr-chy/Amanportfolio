// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Toggle icon between bars and times
            const icon = navToggle.querySelector('i');
            if(navMenu.classList.contains('show-menu')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Header Background & Back to Top Button on Scroll ---
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Header shadow
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top
        if (window.scrollY >= 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // --- Scroll Progress Bar ---
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // --- Active Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if(!navLink) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', scrollActive);

    // --- Intersection Observer for Scroll Animations ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- GitHub Contribution Graph Placeholder Generation ---
    const graphContainer = document.querySelector('.squares');
    if(graphContainer) {
        // Generate random squares for the github illustration
        const numSquares = 140; // Approx 20 weeks * 7 days
        for(let i = 0; i < numSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            
            // Randomly assign activity level colors (slate to cyan)
            const random = Math.random();
            if(random > 0.8) {
                square.style.backgroundColor = '#0284c7'; // high
            } else if(random > 0.6) {
                square.style.backgroundColor = '#38bdf8'; // med
            } else if(random > 0.4) {
                square.style.backgroundColor = '#7dd3fc'; // low
            }
            
            graphContainer.appendChild(square);
        }
    }

    // --- Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const textArray = ["Frontend Developer", "Backend Developer", "MERN Stack Developer"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = textArray[textIndex];
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }
    
    // --- Contact Form Submission handling (AJAX to Formsubmit) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic animation/feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            // FormSubmit requires the /ajax/ endpoint for fetch requests
            let actionUrl = contactForm.action;
            if (!actionUrl.includes('/ajax/')) {
                actionUrl = actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');
            }
            
            // Collect form data
            const formData = new FormData(contactForm);
            
            // Send to FormSubmit via AJAX
            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                btn.style.backgroundColor = '#10b981'; // Green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 4000);
            })
            .catch(error => {
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error Sending';
                btn.style.backgroundColor = '#ef4444'; // Red
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 4000);
            });
        });
    }
});

// Activity toggle function for Coding Profiles
window.showActivity = function(platform) {
    const githubEl = document.getElementById('github-activity');
    const leetcodeEl = document.getElementById('leetcode-activity');
    const placeholderEl = document.getElementById('activity-placeholder');
    
    if (githubEl && leetcodeEl && placeholderEl) {
        // First hide everything
        githubEl.style.display = 'none';
        leetcodeEl.style.display = 'none';
        placeholderEl.style.display = 'none';
        
        // Then show the requested platform
        if (platform === 'github') {
            githubEl.style.display = 'block';
        } else if (platform === 'leetcode') {
            leetcodeEl.style.display = 'block';
        }
    }
};
