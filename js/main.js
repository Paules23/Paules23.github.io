document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------
     EXPAND / COLLAPSE (Know more / Show less)
  -------------------------------------------------- */
  const cards = Array.from(document.querySelectorAll("#all-projects .project-card"));

  cards.forEach((card) => {
    const btn = card.querySelector(".know-more");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
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
      showMoreBtn.style.display = visibleCount >= cards.length ? "none" : "inline-flex";
    }
  }

  if (cards.length > 0) {
    visibleCount = Math.min(batchSize, cards.length);
    updateProjectsVisibility();
  }

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      visibleCount = Math.min(visibleCount + batchSize, cards.length);
      updateProjectsVisibility();
    });
  }

  /* --------------------------------------------------
     LIGHTBOX for project thumbnails (+ arrows)
     - Click any #all-projects .project-card img
     - Optional: add data-gallery="img1,img2,img3" to img
     - NOW: loop infinite so arrows always work
  -------------------------------------------------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.querySelector(".lightbox-img");
  const lbPrev = document.querySelector(".lightbox-nav.prev");
  const lbNext = document.querySelector(".lightbox-nav.next");
  const lbCounter = document.querySelector(".lightbox-counter");

  if (!lightbox || !lbImg || !lbPrev || !lbNext || !lbCounter) {
    // If any element is missing, don't crash
    return;
  }

  let currentGallery = [];
  let currentIndex = 0;

  function parseGalleryFromImg(imgEl) {
    const raw = imgEl.getAttribute("data-gallery");
    if (!raw || raw.trim().length === 0) {
      return [imgEl.getAttribute("src")];
    }
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function renderLightbox() {
    if (!currentGallery.length) return;

    lbImg.src = currentGallery[currentIndex];

    // Counter
    lbCounter.textContent =
      currentGallery.length > 1 ? `${currentIndex + 1} / ${currentGallery.length}` : "";

    // Loop mode: buttons never disabled if more than 1 image
    const hasMany = currentGallery.length > 1;
    lbPrev.disabled = !hasMany;
    lbNext.disabled = !hasMany;
  }

  function openLightbox(gallery, startIndex = 0) {
    currentGallery = gallery;
    currentIndex = Math.max(0, Math.min(startIndex, currentGallery.length - 1));

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    renderLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function prevImage() {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    renderLightbox();
  }

  function nextImage() {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    renderLightbox();
  }

  // Click on thumbnails (delegation)
  const projectsGrid = document.querySelector("#all-projects .projects-grid");
  if (projectsGrid) {
    projectsGrid.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;

      const card = img.closest(".project-card");
      if (!card) return;

      const gallery = parseGalleryFromImg(img);
      openLightbox(gallery, 0);
    });
  }

  // Close on backdrop / close button
  lightbox.addEventListener("click", (e) => {
    const close = e.target.closest("[data-close='true']");
    if (close) closeLightbox();
  });

  // Nav buttons (stop propagation so they never trigger close)
  lbPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    prevImage();
  });

  lbNext.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
  });

  // Keyboard controls (Esc + arrows)
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });
});
