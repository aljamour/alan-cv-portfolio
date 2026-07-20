const canvas = document.querySelector("#matrixCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let columns;
let drops;

const characters = "01{}[]<>/ Java Spring Boot REST SQL Docker CI/CD Git Linux VM SSH Nginx HTTPS ";
function setupCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / 18);
  drops = Array.from({ length: columns }, () => Math.random() * height);
}

function drawMatrix() {
  ctx.fillStyle = "rgba(7, 19, 15, 0.08)";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim();

  ctx.font = "14px Consolas, monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * characters.length)];
    const x = i * 18;
    const y = drops[i] * 18;

    ctx.fillText(text, x, y);

    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

setupCanvas();
drawMatrix();

window.addEventListener("resize", setupCanvas);

const themeToggle = document.querySelector("#themeToggle");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  setTheme(savedTheme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  setTheme(currentTheme === "light" ? "dark" : "light");
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.14 }
);

revealElements.forEach(element => revealObserver.observe(element));

const copyEmailButton = document.querySelector("#copyEmail");
const copyStatus = document.querySelector("#copyStatus");
const email = "aal.jamour9@gmail.com";

copyEmailButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email kopieret";
  } catch {
    copyStatus.textContent = "Kunne ikke kopiere automatisk. Marker emailen manuelt.";
  }
});

document.querySelector("#printCv").addEventListener("click", () => {
  window.print();
});

const languageToggle = document.querySelector("#languageToggle");
const languageLabel = document.querySelector("#languageLabel");

let currentLanguage = localStorage.getItem("portfolio-language") || "da";

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;

  document
      .querySelectorAll("[data-da][data-en]")
      .forEach(element => {
        element.textContent = language === "da" ? element.dataset.da : element.dataset.en;
      });

  document
      .querySelectorAll("[data-aria-da][data-aria-en]")
      .forEach(element => {
        element.setAttribute("aria-label", language === "da" ? element.dataset.ariaDa : element.dataset.ariaEn);
      });

  document
      .querySelectorAll("[data-alt-da][data-alt-en]")
      .forEach(element => {
        element.alt = language === "da" ? element.dataset.altDa : element.dataset.altEn;});

  languageLabel.textContent = language === "da" ? "EN" : "DA";

  languageToggle.setAttribute("aria-label", language === "da" ? "Switch to English" : "Skift til dansk");

  localStorage.setItem("portfolio-language", language);
}

languageToggle.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "da" ? "en" : "da";

  setLanguage(nextLanguage);
});

setLanguage(currentLanguage);
