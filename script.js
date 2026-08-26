const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

function closeMenu() {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
});


/* Close menu when a navigation link is clicked */

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});


/* Close menu when clicking outside */

document.addEventListener("click", event => {

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);

    if (
        navMenu.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedToggle
    ) {
        closeMenu();
    }
});


/* Close mobile navigation after resizing */

window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {
        closeMenu();
    }

});



const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});



document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

const currentYear = new Date().getFullYear();

document.getElementById("copyright").innerHTML =
    `© ${currentYear} Αντιρατσιστικό Φεστιβάλ Αγίου Νικολάου. All rights reserved.`;
});