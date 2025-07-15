//  Carousel
const slidesContainer = document.getElementById("carousel-slides");
if (slidesContainer) {
  let currentSlide = 0;
  const totalSlides = slidesContainer.children.length;

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  function updateCarousel() {
    const slideWidth = slidesContainer.children[0].offsetWidth;
    slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
  }

  nextBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  });

  prevBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, 5000);
}

//  Mobile Navbar
const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
