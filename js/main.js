const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbVideo = document.getElementById('lightbox-video');

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

function closeLightbox() {
  lightbox.classList.remove('open');
  lbImg.src = '';
  lbVideo.pause();
  lbVideo.src = '';
}

const closeBtn = document.querySelector('.lightbox-close');

closeBtn.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

const sortBtn = document.getElementById("sortBtn");
const experienceSection = document.getElementById("experience");

const modes = ["date", "role"];
let currentModeIndex = 0;

sortBtn.textContent = "Sort: Date";

sortBtn.addEventListener("click", () => {
  currentModeIndex = (currentModeIndex + 1) % modes.length;
  const mode = modes[currentModeIndex];

  sortBtn.textContent = "Sort: " + capitalize(mode);
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
      return getEndYear(b) - getEndYear(a);
    }

    if (mode === "role") {
      return getText(a, ".role").localeCompare(getText(b, ".role"));
    }

    return 0;
  });

  // rebuild section order:
  // pinned first (in original order), then sorted rest
  [...pinned, ...sorted].forEach(card => {
    experienceSection.appendChild(card);
  });
}

function getText(card, selector) {
  const el = card.querySelector(selector);
  return el ? el.textContent.trim().toLowerCase() : "";
}

function getEndYear(card) {
  const dateEl = card.querySelector(".date");
  if (!dateEl) return 0;

  const text = dateEl.textContent;
  const match = text.match(/(\d{4})(?!.*\d{4})/);

  return match ? parseInt(match[1], 10) : 0;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.querySelectorAll('.media-more').forEach(details => {
  const summary = details.querySelector('summary');

  const original = summary.textContent.trim();

  details.addEventListener('toggle', () => {
    summary.textContent = details.open ? 'Show less' : original;
  });
});

document.addEventListener("click", e => {
  const link = e.target.closest(".report-link");
  if (link) {
    e.stopPropagation();
  }
});

const expandAllBtn = document.getElementById("expandAllBtn");

let allExpanded = false;

expandAllBtn.addEventListener("click", () => {

  const cards = experienceSection.querySelectorAll("details.card");

  allExpanded = !allExpanded;

  cards.forEach(card => {
    card.open = allExpanded;
  });

  expandAllBtn.textContent = allExpanded ? "Collapse all" : "Expand all";
});