/* =========================================================
   LIGHTBOX ELEMENTS
========================================================= */

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbVideo = document.getElementById('lightbox-video');
const closeBtn = document.querySelector('.lightbox-close');


/* =========================================================
   LIGHTBOX OPEN (IMAGES & VIDEOS)
========================================================= */

document.addEventListener('click', e => {

  const img = e.target.closest('.media img, .media-more img');
  const video = e.target.closest('.media video, .media-more video');

  if (img) {
    lbVideo.pause();
    lbVideo.style.display = 'none';

    lbImg.src = img.src;
    lbImg.style.display = 'block';

    lightbox.classList.add('open');
  }

  if (video) {
    lbImg.style.display = 'none';

    lbVideo.src = video.currentSrc || video.src;
    lbVideo.style.display = 'block';

    lightbox.classList.add('open');
  }

  if (e.target.classList.contains('lightbox-backdrop')) {
    closeLightbox();
  }
});


/* =========================================================
   LIGHTBOX CLOSE
========================================================= */

function closeLightbox() {
  lightbox.classList.remove('open');
  lbImg.src = '';
  lbVideo.pause();
  lbVideo.src = '';
}

closeBtn.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});


/* =========================================================
   SORTING (EXPERIENCE – DATE / IMPORTANCE ONLY)
========================================================= */

const sortBtn = document.getElementById("sortBtn");
const experienceSection = document.getElementById("experience");

// only two modes now
const modes = ["date", "importance"];
let currentModeIndex = 0;

sortBtn.textContent = "Sorting by: Date";

sortBtn.addEventListener("click", () => {
  currentModeIndex = (currentModeIndex + 1) % modes.length;
  const mode = modes[currentModeIndex];

  sortBtn.textContent =
    "Sorting by: " + (mode === "date" ? "Date" : "Importance");

  sortCards(mode);
});


function sortCards(mode) {

  const allCards = Array.from(
    experienceSection.querySelectorAll("details.card")
  );

  const pinned = allCards.filter(card =>
    card.classList.contains("is-pinned")
  );

  const sortable = allCards.filter(card =>
    !card.classList.contains("is-pinned")
  );

  const sorted = sortable.sort((a, b) => {

    if (mode === "date") {
      return getCardDate(b) - getCardDate(a);
    }

    if (mode === "importance") {
      return getImportance(b) - getImportance(a);
    }

    return 0;
  });

  [...pinned, ...sorted].forEach(card => {
    experienceSection.appendChild(card);
  });

}


/* =========================================================
   SORT HELPERS
========================================================= */

function getCardDate(card) {
  const value = card.dataset.date;
  if (!value) return 0;

  return new Date(value).getTime();
}

function getImportance(card) {
  const value = card.dataset.importance;
  return value ? parseInt(value, 10) : 0;
}


/* =========================================================
   MEDIA DRAWER (SHOW MORE / SHOW LESS)
========================================================= */

document.querySelectorAll('.media-more').forEach(details => {

  const summary = details.querySelector('summary');
  const original = summary.textContent.trim();

  details.addEventListener('toggle', () => {
    summary.textContent = details.open ? 'Show less' : original;
  });

});


/* =========================================================
   PREVENT REPORT LINK FROM TOGGLING CARD
========================================================= */

document.addEventListener("click", e => {

  const link = e.target.closest(".report-link");

  if (link) {
    e.stopPropagation();
  }

});


/* =========================================================
   EXPAND / COLLAPSE ALL CARDS
========================================================= */

const expandAllBtn = document.getElementById("expandAllBtn");

let allExpanded = false;

expandAllBtn.addEventListener("click", () => {

  const cards = experienceSection.querySelectorAll("details.card");

  allExpanded = !allExpanded;

  cards.forEach(card => {
    card.open = allExpanded;
  });

  expandAllBtn.textContent = allExpanded
    ? "Collapse all"
    : "Expand all";

});