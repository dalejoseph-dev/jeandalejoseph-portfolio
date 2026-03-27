/* ═══════════════════════════════════════════════
   SHARED.JS — Alex Rivera Portfolio
   All pages import this file
═══════════════════════════════════════════════ */
// WORK
function filterProjects(cat, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll("[data-cat]").forEach((card) => {
    const cats = card.dataset.cat.split(" ");
    const show = cat === "all" || cats.includes(cat);
    card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    if (show) {
      card.style.opacity = "1";
      card.style.transform = "";
      card.style.pointerEvents = "";
    } else {
      card.style.opacity = "0.2";
      card.style.transform = "scale(0.97)";
      card.style.pointerEvents = "none";
    }
  });
}

// EXPERIENCE
const EXP_DATA = [
  {
    company: "VERCEL",
    role: "Senior Frontend Engineer",
    period: "2022 — Present · San Francisco, CA",
    desc: "Leading frontend architecture for the Vercel dashboard and CLI tooling. Core contributor to the design system and owner of the deployment pipeline UI serving 1M+ developers monthly. Partner with design and product to define technical direction and UI standards.",
    items: [
      "Rebuilt core dashboard in Next.js App Router — reduced LCP by 40% across all routes",
      "Architected a shared component system used consistently across 8 product surfaces",
      "Mentored 4 junior engineers with bi-weekly 1:1s and structured code review",
      "Led a company-wide accessibility audit — achieved WCAG 2.1 AA compliance",
      "Introduced visual regression testing with Playwright, catching 30+ layout bugs pre-launch",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Radix UI",
      "Playwright",
      "Figma",
    ],
  },
  {
    company: "LINEAR",
    role: "Frontend Engineer II",
    period: "2020 — 2022 · San Francisco, CA",
    desc: "Owned the issue viewer, keyboard shortcuts system, and drag-and-drop project board. Key contributor to Linear's mobile-responsive redesign that increased mobile usage by 55%. Shipped critical perf improvements that pushed p95 render times under 50ms.",
    items: [
      "Built keyboard navigation system supporting 60+ application-wide shortcuts",
      "Implemented virtual list for issue boards handling 10k+ items at 60fps",
      "Led mobile redesign — mobile DAU grew 55% within the first quarter post-launch",
      "Reduced JavaScript bundle size by 32% via code-splitting and tree-shaking",
      "Shipped accessible drag-and-drop project board using keyboard-navigable DnD",
    ],
    tech: [
      "React",
      "TypeScript",
      "Jotai",
      "Framer Motion",
      "Vitest",
      "Storybook",
    ],
  },
  {
    company: "FIGMA",
    role: "UI Engineer",
    period: "2019 — 2020 · San Francisco, CA",
    desc: "Worked on Figma's community platform and developer integrations. Helped build the Plugin API documentation site and contributed to the React component library used across 6 product teams.",
    items: [
      "Built the Figma Community browse, search, and filtering experience from scratch",
      "Created interactive Plugin API documentation site with live code examples",
      "Contributed 20+ accessible components to the internal Figma design system",
      "Partnered with the design team on a11y improvements impacting all Figma products",
      "Implemented i18n support for 12 locales across the Community platform",
    ],
    tech: [
      "React",
      "JavaScript",
      "CSS Modules",
      "Jest",
      "GraphQL",
      "Figma Plugin API",
    ],
  },
  {
    company: "FREELANCE",
    role: "Junior Developer",
    period: "2017 — 2019 · Remote",
    desc: "Worked with a diverse range of clients — agencies, startups, and small businesses — building marketing sites, e-commerce stores, and custom web apps. Built strong communication and project management skills.",
    items: [
      "Delivered 15+ client projects across e-commerce, marketing, and SaaS verticals",
      "Specialized in WordPress, Shopify, and custom HTML/CSS/JS builds",
      "Learned Agile project workflows and client communication best practices",
      "Built first React app — a task manager with local storage sync and drag-and-drop",
      "Achieved a 5-star rating from all freelance clients on Upwork",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React", "WordPress", "Shopify"],
  },
];

const tabs = document.querySelectorAll(".exp-tab");
function setExp(idx, clickedTab) {
  tabs.forEach((t) => t.classList.remove("active"));
  clickedTab.classList.add("active");

  const inner = document.getElementById("expInner");
  inner.classList.add("fading");

  setTimeout(() => {
    const d = EXP_DATA[idx];
    document.getElementById("expCompany").textContent = d.company;
    document.getElementById("expRole").textContent = d.role;
    document.getElementById("expPeriod").textContent = d.period;
    document.getElementById("expDesc").textContent = d.desc;
    document.getElementById("expAchievements").innerHTML = d.items
      .map((i) => `<li>${i}</li>`)
      .join("");
    document.getElementById("expTech").innerHTML = d.tech
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
    inner.classList.remove("fading");
  }, 380);
}
// CONTACT
function handleSubmit() {
  const btn = document.getElementById("submitBtn");
  const text = document.getElementById("submitText");
  btn.classList.add("success");
  text.textContent = "✓ Message Sent!";
  btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove("success");
    text.textContent = "Send Message →";
    btn.disabled = false;
  }, 4000);
}

function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

(function () {
  "use strict";

  /* ── Detect touch / no hover ── */
  const isTouch = () => window.matchMedia("(hover: none)").matches;

  /* ── Custom Cursor ── */
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");

  if (cursor && ring && !isTouch()) {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    });
    document.addEventListener("mousedown", () =>
      document.body.classList.add("cursor-click"),
    );
    document.addEventListener("mouseup", () =>
      document.body.classList.remove("cursor-click"),
    );

    (function animRing() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animRing);
    })();

    function refreshHoverTargets() {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () =>
          document.body.classList.add("cursor-hover"),
        );
        el.addEventListener("mouseleave", () =>
          document.body.classList.remove("cursor-hover"),
        );
      });
    }
    refreshHoverTargets();
  } else if (cursor && ring) {
    cursor.style.display = "none";
    ring.style.display = "none";
    document.body.style.cursor = "auto";
  }

  /* ── Nav scroll shrink ── */
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      },
      { passive: true },
    );
  }

  /* ── Active nav link ── */
  (function setActiveNav() {
    const page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((a) => {
      const href = a.getAttribute("href").split("/").pop();
      a.classList.toggle("active", href === page);
    });
  })();

  /* ── Mobile menu ── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  function openMobile() {
    mobileMenu.classList.add("open");
    hamburger.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeMobile() {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (hamburger) hamburger.addEventListener("click", openMobile);
  if (mobileClose) mobileClose.addEventListener("click", closeMobile);

  /* ── Smooth page transitions ── */
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto") ||
      href.startsWith("http") ||
      href.startsWith("//") ||
      a.target === "_blank"
    )
      return;

    a.addEventListener("click", function (e) {
      e.preventDefault();
      closeMobile();
      document.body.classList.add("leaving");
      setTimeout(() => {
        window.location.href = href;
      }, 480);
    });
  });

  /* ── Scroll Reveal ── */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  /* ── Skill bar animation ── */
  const barObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".skill-fill").forEach((f, i) => {
            setTimeout(() => {
              f.style.width = f.dataset.w || "0%";
            }, i * 80);
          });
          barObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  document.querySelectorAll(".skills-grid").forEach((g) => barObs.observe(g));
})();