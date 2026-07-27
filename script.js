document.addEventListener('DOMContentLoaded', () => {
    // Start Screen Logic
    const startScreen = document.getElementById('startScreen');
    const startBtn = document.getElementById('startBtn');
    
    // Disable scrolling initially
    document.body.classList.add('no-scroll');

    // Scroll reveal animation (declared here so we can call it later)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                if (!reveal.classList.contains('active')) {
                    reveal.classList.add('active');
                    
                    // Trigger stat bars animation if this is the stats section
                    if (reveal.id === 'stats') {
                        const statBars = reveal.querySelectorAll('.stat-bar');
                        statBars.forEach(bar => {
                            const targetWidth = bar.getAttribute('data-width');
                            anime({
                                targets: bar,
                                width: [0, targetWidth],
                                duration: 1500,
                                easing: 'easeOutElastic(1, .8)',
                                delay: anime.stagger(200)
                            });
                        });
                    }
                }
            }
        });
    };

    if (startBtn && startScreen) {
        startBtn.addEventListener('click', () => {
            // Anime.js start screen exit
            anime({
                targets: startScreen,
                translateY: '-100vh',
                opacity: 0,
                duration: 1200,
                easing: 'easeInOutExpo',
                complete: function() {
                    startScreen.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                    
                    // Staggered entrance for hero elements
                    anime({
                        targets: '.hero-content > *, .floating-element',
                        translateY: [50, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150),
                        duration: 1000,
                        easing: 'easeOutSpring(1, 80, 10, 0)'
                    });

                    // Start floating animations for floating elements
                    animateFloatingElements();

                    revealOnScroll();
                }
            });
            
            // Animate the button being clicked
            anime({
                targets: startBtn,
                scale: [1, 0.9, 1.5],
                opacity: [1, 0],
                duration: 600,
                easing: 'easeOutQuad'
            });
        });
    } else {
        // Fallback if no start screen
        document.body.classList.remove('no-scroll');
        revealOnScroll();
        animateFloatingElements();
    }
    
    function animateFloatingElements() {
        // Random continuous movement for floating elements using Anime.js
        const floaters = document.querySelectorAll('.floating-element');
        floaters.forEach(el => {
            function randomFloat() {
                anime({
                    targets: el,
                    translateX: anime.random(-30, 30),
                    translateY: anime.random(-30, 30),
                    rotate: anime.random(-15, 15),
                    duration: anime.random(2000, 4000),
                    easing: 'easeInOutSine',
                    complete: randomFloat
                });
            }
            randomFloat();
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Custom cursor glow
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }
    // Copy to clipboard functionality
    const copyBtn = document.getElementById('copyBtn');
    const accNumber = document.getElementById('accNumber');

    copyBtn.addEventListener('click', () => {
        const textToCopy = accNumber.innerText.replace(/\s+/g, ''); // Remove spaces
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = '✅ Đã Copy!';
            copyBtn.style.background = '#10b981';
            copyBtn.style.color = '#fff';
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = '';
                copyBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Lỗi copy: ', err);
        });
    });

    // Image Zoom Modal functionality
    const modal = document.getElementById('imageModal');
    const zoomableImgs = document.querySelectorAll('.zoomable');
    const modalImg = document.getElementById('zoomedImg');
    const closeBtn = document.querySelector('.close-modal');

    if (zoomableImgs.length > 0 && modal && modalImg) {
        zoomableImgs.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                // Prevent body scrolling
                document.body.style.overflow = "hidden";
            });
        });

        // Close on X click
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target !== modalImg) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
});
