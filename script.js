// Raghav's portfolio JavaScript
const body = document.body;
const themeButton = document.getElementById("themeButton");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const progressBar = document.getElementById("progressBar");
const toast = document.getElementById("toast");
const copyEmail = document.getElementById("copyEmail");

// 1. Dark/light mode + localStorage
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
}
updateThemeIcon();

themeButton.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem("portfolio-theme", body.classList.contains("light-mode") ? "light" : "dark");
  updateThemeIcon();
  showToast(body.classList.contains("light-mode") ? "☀️ Light mode enabled" : "🌙 Dark mode enabled");
});

function updateThemeIcon() {
  themeButton.textContent = body.classList.contains("light-mode") ? "🌙" : "☀️";
}

// 2. Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.textContent = open ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// 3. Scroll progress + back-to-top
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : "0%";
  backToTop.classList.toggle("show", scrollTop > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 4. Reveal sections when they enter the screen
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

// 5. Skills filter
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".skills-list li").forEach(skill => {
      skill.classList.toggle("hidden-skill", filter !== "all" && skill.dataset.category !== filter);
    });
  });
});

// 6. Copy email
copyEmail.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("raghav8508@gmail.com");
    showToast("📋 Email copied!");
  } catch {
    showToast("Email: raghav8508@gmail.com");
  }
});

// 7. Placeholder project links
document.querySelectorAll(".project-link[data-message]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showToast(link.dataset.message);
  });
});

// 8. Dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();

// 9. Small reusable notification system
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}
