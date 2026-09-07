const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");


/* =========================
   MOBILE MENU
========================= */

function closeMenu() {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
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


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =========================
   SCROLL REVEAL
========================= */

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


/* =========================
   COPYRIGHT
========================= */

const currentYear = new Date().getFullYear();

const copyright =
    document.getElementById("copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${currentYear} Αντιρατσιστικό Φεστιβάλ Αγίου Νικολάου. All rights reserved.`;

}


/* =========================
   GALLERY / LIGHTBOX
========================= */

const galleryItems = [
    ...document.querySelectorAll(".photo")
];

const lightbox =
    document.querySelector("#lightbox");


if (galleryItems.length && lightbox) {

    const lightboxImage =
        lightbox.querySelector(".lightbox-image");

    const lightboxCaption =
        lightbox.querySelector(".lightbox-caption");

    const closeButton =
        lightbox.querySelector(".lightbox-close");

    const previousButton =
        lightbox.querySelector(".lightbox-prev");

    const nextButton =
        lightbox.querySelector(".lightbox-next");


    let currentIndex = 0;


    function showPhoto(index) {

        currentIndex =
            (index + galleryItems.length)
            % galleryItems.length;


        const selectedPhoto =
            galleryItems[currentIndex];


        const image =
            selectedPhoto.querySelector("img");


        lightboxImage.src =
            image.currentSrc || image.src;


        lightboxImage.alt =
            image.alt || "Gallery image";


        lightboxCaption.textContent =
            image.alt || "";


        lightbox.classList.add("open");

        document.body.classList.add(
            "lightbox-open"
        );


        closeButton.focus();

    }


    function closeLightbox() {

        lightbox.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

    }


    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                () => {

                    showPhoto(index);

                }
            );


            /* Keyboard support */

            item.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        showPhoto(index);

                    }

                }
            );

        }
    );


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    previousButton.addEventListener(
        "click",
        () => {

            showPhoto(
                currentIndex - 1
            );

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            showPhoto(
                currentIndex + 1
            );

        }
    );


    /* Click outside image to close */

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* Lightbox keyboard controls */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains("open")
            ) {
                return;
            }


            /* Escape */

            if (event.key === "Escape") {

                closeLightbox();

            }


            /* Previous */

            if (
                event.key === "ArrowLeft"
            ) {

                showPhoto(
                    currentIndex - 1
                );

            }


            /* Next */

            if (
                event.key === "ArrowRight"
            ) {

                showPhoto(
                    currentIndex + 1
                );

            }

        }
    );
    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains("open")
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (
                event.key === "ArrowLeft"
            ) {
                showPhoto(
                    currentIndex - 1
                );
            }

            if (
                event.key === "ArrowRight"
            ) {
                showPhoto(
                    currentIndex + 1
                );
            }

        }
    );

} /* END OF GALLERY / LIGHTBOX */


/* =========================
   BACK TO TOP
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const backToTop =
        document.getElementById("backToTop");

    if (!backToTop) {
        return;
    }

    function checkScroll() {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        checkScroll,
        { passive: true }
    );

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

    checkScroll();

});

