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

if (savedTheme === "light" || savedTheme === "dark") {
  setTheme(savedTheme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  setTheme(nextTheme);
  updateThemeToggleLabel();
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

const languageToggle = document.querySelector("#languageToggle");
const languageLabel = document.querySelector("#languageLabel");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector("#menuToggle");
const mainNavigation = document.querySelector("#mainNavigation");
const supportedLanguages = ["da", "en"];
const savedLanguage = localStorage.getItem("portfolio-language");

let currentLanguage = supportedLanguages.includes(savedLanguage) ? savedLanguage : "da";

function t(key) {
  return (window.translations[currentLanguage]?.[key] ?? window.translations.da?.[key] ?? key);
}

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
    const key = element.getAttribute("data-i18n-aria-label");
    element.setAttribute("aria-label", t(key));
  });

  document.querySelectorAll("[data-i18n-alt]").forEach(element => {
    const key = element.getAttribute("data-i18n-alt");
    element.alt = t(key);
  });

  document.querySelectorAll("[data-i18n-content]").forEach(element => {
    const key = element.getAttribute("data-i18n-content");
    element.setAttribute("content", t(key));
  });
}

function updateThemeToggleLabel() {
  const currentTheme = document.documentElement.dataset.theme || "dark";
  const translationKey = currentTheme === "light" ? "theme.switchToDark" : "theme.switchToLight";

  themeToggle.setAttribute("aria-label", t(translationKey));
}

function updateLanguageToggle() {
  const isDanish = currentLanguage === "da";

  languageLabel.textContent = isDanish ? "EN" : "DA";
  languageToggle.setAttribute(
      "aria-label",
      isDanish ? t("language.switchToEnglish") : t("language.switchToDanish")
  );
}

function isMenuOpen() {
  return menuToggle.getAttribute("aria-expanded") === "true";
}

function updateMenuToggleLabel() {
  menuToggle.setAttribute(
      "aria-label",
      t(isMenuOpen() ? "nav.closeMenu" : "nav.openMenu")
  );
}

function setMenuOpen(shouldOpen) {
  siteHeader.classList.toggle("menu-open", shouldOpen);
  menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  updateMenuToggleLabel();
}

const copyEmailButton = document.querySelector("#copyEmail");
const copyStatus = document.querySelector("#copyStatus");
const email = "aal.jamour9@gmail.com";

let copyStatusKey = null;

copyEmailButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyStatusKey = "contact.copySuccess";
  } catch {
    copyStatusKey = "contact.copyError";
  }

  copyStatus.textContent = t(copyStatusKey);
});

document.querySelector("#printCv").addEventListener("click", () => {
  window.print();
});

function setLanguage(language) {
  currentLanguage = supportedLanguages.includes(language) ? language : "da";

  document.documentElement.lang = currentLanguage;

  translatePage();
  updateLanguageToggle();
  updateThemeToggleLabel();
  updateMenuToggleLabel();

  if (copyStatusKey) {
    copyStatus.textContent = t(copyStatusKey);
  }

  localStorage.setItem("portfolio-language", currentLanguage);
}

languageToggle.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "da" ? "en" : "da";
  setLanguage(nextLanguage);
});

menuToggle.addEventListener("click", () => {
  setMenuOpen(!isMenuOpen());
});

mainNavigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

document.addEventListener("pointerdown", event => {
  if (isMenuOpen() && !siteHeader.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && isMenuOpen()) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980 && isMenuOpen()) {
    setMenuOpen(false);
  }
});

setLanguage(currentLanguage);