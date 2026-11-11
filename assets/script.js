document.addEventListener("DOMContentLoaded", () => {
  // Reveal sections gently as they enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Make the mobile menu close after a navigation choice.
  document.querySelectorAll("#mainNav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (nav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  // Favourite buttons.
  document.querySelectorAll(".wish-btn").forEach(button => {
    button.addEventListener("click", () => {
      const loved = button.classList.toggle("is-loved");
      const icon = button.querySelector("i");
      icon.className = loved ? "bi bi-heart-fill" : "bi bi-heart";
      button.setAttribute("aria-pressed", String(loved));
    });
  });

  // Small demo basket interaction for the three product cards.
  const toast = document.getElementById("cartToast");
  const toastText = document.getElementById("cartToastText");
  const closeToast = document.getElementById("closeToast");
  let toastTimer;
  document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
      toastText.textContent = `${button.dataset.product} added to your basket`;
      toast.classList.add("show");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
    });
  });
  closeToast.addEventListener("click", () => toast.classList.remove("show"));

  // Demo newsletter validation/confirmation (no backend submission).
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const formMessage = document.getElementById("formMessage");
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }
    formMessage.textContent = "You're on the list — thanks for growing with us! (Demo form)";
    formMessage.style.color = "#2f6d43";
    form.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});