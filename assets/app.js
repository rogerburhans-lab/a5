document.documentElement.classList.add('js');

// Mobile Menu Toggle
const header = document.querySelector('.topbar');
const menuBtn = document.querySelector('.menu');

if (menuBtn && header) {
    menuBtn.addEventListener('click', () => {
        header.classList.toggle('nav-open');
        const isOpen = header.classList.contains('nav-open');
        menuBtn.setAttribute('aria-expanded', isOpen);
        menuBtn.innerHTML = isOpen ? '✕' : '☰';
    });
}

// AVONE DEMO 2: Lookbook Hotspot Click Toggle
const hotspots = document.querySelectorAll('.hotspot');
if (hotspots.length > 0) {
    hotspots.forEach(hotspot => {
        const pin = hotspot.querySelector('.hotspot-pin');
        if (pin) {
            pin.addEventListener('click', (e) => {
                e.stopPropagation();
                // Check if already active
                const wasActive = hotspot.classList.contains('active');
                
                // Deactivate all first
                hotspots.forEach(h => h.classList.remove('active'));
                
                // Toggle current
                if (!wasActive) {
                    hotspot.classList.add('active');
                }
            });
        }
    });

    // Clicking anywhere else closes active hotspots
    document.addEventListener('click', () => {
        hotspots.forEach(h => h.classList.remove('active'));
    });
}

// Dynamic Tabbed Showcase Filter (AVONE STYLE)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabCards = document.querySelectorAll('.tab-card');

if (tabButtons.length > 0 && tabCards.length > 0) {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Hide cards with a fade-out animation transition
            tabCards.forEach(card => {
                card.classList.add('tab-hiding');
            });
            
            setTimeout(() => {
                tabCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Trigger reflow
                        void card.offsetWidth;
                        card.classList.remove('tab-hiding');
                    } else {
                        card.style.display = 'none';
                    }
                });
            }, 300);
        });
    });
}

// Scroll Reveal with Intersection Observer
document.querySelectorAll('main > section, .dial-card, .tab-card, .metrics-table, .split-col, .lookbook-wrap, .image-text-block, .hero, .pagehero, .contact-form').forEach(el => {
    el.setAttribute('data-reveal', '');
});

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-seen');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -8% 0px'
    });
    
    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
    
    // Safety fallback
    setTimeout(() => {
        document.querySelectorAll('[data-reveal]').forEach(el => {
            el.classList.add('reveal-seen');
        });
    }, 2000);
} else {
    document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('reveal-seen');
    });
}

// Form Redirect Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const name = data.get('name');
        const email = data.get('email');
        const message = data.get('message');
        
        const subject = encodeURIComponent(`Study Orbit Guide Inquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n---\nReply to: ${email}`);
        
        window.location.href = `mailto:desk@studyorbitguide.com?subject=${subject}&body=${body}`;
    });
}
