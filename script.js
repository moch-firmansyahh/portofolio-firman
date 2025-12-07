let lastScrollTop = 0;
const header = document.querySelector("header");
const timeText = document.querySelector(".time");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});

const now = new Date();
const jakartaTime = now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
const [date, time] = jakartaTime.split(", ");
timeText.textContent = `${time} GMT+7`;

const yearText = document.getElementById("year");
const year = new Date().getFullYear();

yearText.textContent = year;

function animateSkills() {
  const progressEls = document.querySelectorAll(".skills-grid .progress");
  if (!progressEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target =
          Number(el.dataset.percent || el.getAttribute("data-percent")) || 0;
        el.style.width = target + "%";
        // add shimmer animation class, remove after animation completes
        el.classList.add("animate");
        setTimeout(() => el.classList.remove("animate"), 1200);

        // set numeric label to target immediately (keeps label consistent)
        const percentLabel = el.closest(".skill").querySelector(".percent");
        if (percentLabel) {
          percentLabel.textContent = target + "%";
        }

        obs.unobserve(el);
      });
    },
    { threshold: 0.35 }
  );

  progressEls.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", animateSkills);

// Reveal learn-more cards when they enter viewport (fallback for AOS)
function revealLearnCards() {
  const cards = document.querySelectorAll(".learn-card");
  if (!cards.length) return;
  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          o.unobserve(e.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  cards.forEach((c) => obs.observe(c));
}

document.addEventListener("DOMContentLoaded", revealLearnCards);

// Mobile nav toggle behavior
const navToggle = document.querySelector(".nav-toggle");
const navEl = document.querySelector("header .container .content nav");
if (navToggle && navEl) {
  navToggle.addEventListener("click", () => {
    navEl.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  // close nav when link clicked (mobile)
  navEl.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navEl.classList.remove("open");
      navToggle.classList.remove("open");
    })
  );
}
