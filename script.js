const glow = document.querySelector(".cursor-glow");
const revealItems = document.querySelectorAll(".reveal");
const magneticItems = document.querySelectorAll(".magnetic");

window.addEventListener("pointermove", (event) => {
  if (!glow) return;
  glow.style.opacity = "1";
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

window.addEventListener("pointerleave", () => {
  if (!glow) return;
  glow.style.opacity = "0";
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.18,
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

magneticItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.08}px, ${y * 0.16}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});
