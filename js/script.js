let currentSlide = 0;
const slidesContainer = document.getElementById("carousel-slides");
const totalSlides = slidesContainer.children.length;

document.getElementById("nextBtn").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

function updateCarousel() {
  const slideWidth = slidesContainer.children[0].offsetWidth;
  slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}
