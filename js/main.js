(() => {
  "use strict";

  const CONTACT_EMAIL = "gustavoribeiromaia68@gmail.com";

  /* Header scroll state */
  const header = document.querySelector("[data-header]");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile nav */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (navToggle && mobileNav) {
    const closeNav = () => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menu");
      mobileNav.classList.remove("is-open");
    };
    const openNav = () => {
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Fechar menu");
      mobileNav.classList.add("is-open");
    };
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });
    mobileNav.querySelectorAll("[data-nav-link]").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  /* Scroll reveal */
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* Footer year */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Contact form -> mailto fallback (no backend attached yet) */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const note = form.querySelector("[data-form-note]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const nome = String(data.get("nome") || "").trim();
      const negocio = String(data.get("negocio") || "").trim();
      const contato = String(data.get("contato") || "").trim();
      const mensagem = String(data.get("mensagem") || "").trim();

      if (!nome || !contato || !mensagem) {
        if (note) {
          note.hidden = false;
          note.classList.add("is-error");
          note.textContent = "Preencha nome, contato e mensagem antes de enviar.";
        }
        return;
      }

      const subject = `Novo contato pelo site: ${nome}`;
      const bodyLines = [
        `Nome: ${nome}`,
        negocio ? `Negócio: ${negocio}` : null,
        `Contato: ${contato}`,
        "",
        mensagem,
      ].filter(Boolean);

      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
      window.location.href = mailto;

      if (note) {
        note.hidden = false;
        note.classList.remove("is-error");
        note.textContent = "Abrindo seu aplicativo de e-mail com a mensagem pronta para enviar.";
      }
    });
  }
})();
