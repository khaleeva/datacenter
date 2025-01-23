function toggleAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion__header");
  const burger = document.querySelector(".burger");
  const accordionBodies = document.querySelectorAll(".accordion__body");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const currentHeader = header;
      const currentPanel = currentHeader.nextElementSibling;

      if (burger.classList.contains("burger_open")) {
        if (currentPanel.classList.contains("accordion__body_open")) {
          currentPanel.classList.remove("accordion__body_open");
          currentHeader.classList.remove("active");
        } else {
          accordionBodies.forEach((body) => {
            body.classList.remove("accordion__body_open");
          });
          accordionHeaders.forEach((header) => {
            header.classList.remove("active");
          });
          currentPanel.classList.add("accordion__body_open");
          currentHeader.classList.add("active");
        }
      }
    });
  });
}
