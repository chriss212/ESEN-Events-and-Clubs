document.addEventListener('DOMContentLoaded', () => {
  // =======================
  // Carousel Functionality
  // =======================

  let currentSlide = 0;
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const dots = dotsContainer ? dotsContainer.children : [];
  const totalSlides = track ? track.children.length : 0;

  function updateCarousel() {
    if (!track) return;

    // Move slides by translateX (25% per slide since each slide is 25% wide)
    const translateX = -currentSlide * 25;
    track.style.transform = `translateX(${translateX}%)`;

    // Update dots active state
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('bg-blue-600');
      dots[i].classList.add('bg-gray-300');
      dots[i].classList.remove('active');
    }

    if (dots[currentSlide]) {
      dots[currentSlide].classList.remove('bg-gray-300');
      dots[currentSlide].classList.add('bg-blue-600');
      dots[currentSlide].classList.add('active');
    }
  }

  window.nextSlide = function () {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  };

  window.previousSlide = function () {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  };

  window.goToSlide = function (index) {
    if (index >= 0 && index < totalSlides) {
      currentSlide = index;
      updateCarousel();
    }
  };

  // Auto-play every 5 seconds
  if (track) {
    setInterval(() => {
      window.nextSlide();
    }, 5000);
  }

  // Swipe support (touch)
  if (track) {
    let startX = 0;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          window.nextSlide();
        } else {
          window.previousSlide();
        }
      }
    });
  }

  // =======================
  // Mobile Menu Toggle
  // =======================

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      const svg = menuToggle.querySelector('svg');
      if (svg) {
        if (mobileMenu.classList.contains('hidden')) {
          svg.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        } else {
          svg.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        }
      }
    });
  }

  // =======================
  // Smooth Scroll for Anchor Links
  // =======================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // =======================
  // Scroll-Based Animations
  // =======================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document
    .querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-scale-in')
    .forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

  // =======================
  // Page Load Animation
  // =======================

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  // =======================
  // Hover Effects for Buttons
  // =======================

  document.querySelectorAll('.group').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-8px)';
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)';
    });
  });

  // Initialize carousel on page load
  updateCarousel();
});