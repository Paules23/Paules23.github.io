document.addEventListener("DOMContentLoaded", () => {
  // --- All Projects: Show more (4 at start, +4 each click) ---
const projectCards = Array.from(document.querySelectorAll("#all-projects .project-card"));
const showMoreBtn = document.getElementById("showMoreProjects");
const batchSize = 4;

let visibleCount = 0;

function updateProjectsVisibility() {
  projectCards.forEach((card, index) => {
    card.style.display = index < visibleCount ? "flex" : "none";
  });

  if (showMoreBtn) {
    showMoreBtn.style.display = visibleCount >= projectCards.length ? "none" : "inline-flex";
  }
}

// init
if (projectCards.length > 0) {
  visibleCount = Math.min(batchSize, projectCards.length);
  updateProjectsVisibility();
}

// click
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    visibleCount = Math.min(visibleCount + batchSize, projectCards.length);
    updateProjectsVisibility();
  });
}

});
