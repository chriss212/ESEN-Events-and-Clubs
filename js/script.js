let currentSlide = 0;
const totalSlides = 4;
const track = document.getElementById('carouselTrack');
const dots = document.getElementById('carouselDots')?.children;

function updateCarousel() {
    if (!track) return;
    
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Actualizar dots
    if (dots) {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Auto-play (opcional)
if (track) {
    setInterval(nextSlide, 5000); // Cambia cada 5 segundos
}

// Soporte para gestos táctiles (opcional)
if (track) {
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
}


//  Mobile Navbar
const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
