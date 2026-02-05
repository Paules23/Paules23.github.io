document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".arrow.left");
    const nextButton = document.querySelector(".arrow.right");

    let currentIndex = 0;
    const loop = false; // Cambia a true si quieres loop infinito

    function updateSlider() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (!loop) {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === slides.length - 1;
        }
    }

    // Flecha derecha
    nextButton.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlider();
        } else if (loop) {
            currentIndex = 0;
            updateSlider();
        }
    });

    // Flecha izquierda
    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        } else if (loop) {
            currentIndex = slides.length - 1;
            updateSlider();
        }
    });

    // Inicializa
    updateSlider();
});
