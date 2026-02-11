document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------
     EXPAND / COLLAPSE (Know more / Show less)
  -------------------------------------------------- */
  const cards = Array.from(document.querySelectorAll("#all-projects .project-card"));

  cards.forEach((card) => {
    const btn = card.querySelector(".know-more");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isExpanded = card.classList.toggle("expanded");
      btn.textContent = isExpanded ? "Show less" : "Know more";
    });
  });

  /* --------------------------------------------------
     SHOW MORE PROJECTS (4 at start, +4 per click)
  -------------------------------------------------- */
  const showMoreBtn = document.getElementById("showMoreProjects");
  const batchSize = 4;
  let visibleCount = 0;

  function updateProjectsVisibility() {
    cards.forEach((card, index) => {
      card.style.display = index < visibleCount ? "flex" : "none";
    });

    if (showMoreBtn) {
      showMoreBtn.style.display =
        visibleCount >= cards.length ? "none" : "inline-flex";
    }
  }

  // Initial state
  if (cards.length > 0) {
    visibleCount = Math.min(batchSize, cards.length);
    updateProjectsVisibility();
  }

  // Button click
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      visibleCount = Math.min(visibleCount + batchSize, cards.length);
      updateProjectsVisibility();
    });
  }
});
