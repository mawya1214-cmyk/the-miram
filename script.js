
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("loaded");
        }, 700);

    });


    /* =========================
       LANGUAGE
    ========================= */

    const langBtn = document.getElementById("langBtn");

    let currentLanguage = localStorage.getItem("miramLanguage") || "en";

    function updateLanguage() {

        document.documentElement.lang = currentLanguage;
        document.documentElement.dir =
            currentLanguage === "ar" ? "rtl" : "ltr";

        document.querySelectorAll("[data-en]").forEach(element => {

            const text =
                currentLanguage === "ar"
                    ? element.dataset.ar
                    : element.dataset.en;

            if (text) {
                element.textContent = text;
            }

        });

        langBtn.textContent =
            currentLanguage === "ar"
                ? "English"
                : "العربية";

        localStorage.setItem(
            "miramLanguage",
            currentLanguage
        );
    }

    langBtn.addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "en"
                ? "ar"
                : "en";

        updateLanguage();

    });

    updateLanguage();


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");

        menuBtn.textContent =
            nav.classList.contains("open")
                ? "×"
                : "☰";

    });


    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");
            menuBtn.textContent = "☰";

        });

    });


    /* =========================
       HEADER SCROLL
    ========================= */

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =========================
       SCROLL PROGRESS
    ========================= */

    const progress =
        document.getElementById("scrollProgress");

    function updateProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;

    }

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    /* =========================
       REVEAL ANIMATIONS
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* =========================
       ACTIVE NAV
    ========================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("nav a");

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {
                            link.classList.remove("active");
                        });

                        const activeLink =
                            document.querySelector(
                                `nav a[href="#${entry.target.id}"]`
                            );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =========================
       LIGHTBOX
    ========================= */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    document.querySelectorAll("[data-lightbox]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const image =
                    button.dataset.lightbox;

                lightboxImage.src = image;

                lightbox.classList.add("active");

                document.body.style.overflow =
                    "hidden";

            });

        });


    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

        setTimeout(() => {
            lightboxImage.src = "";
        }, 300);

    }

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeLightbox();
            }

        }
    );


    /* =========================
       BACK TO TOP
    ========================= */

    const backToTop =
        document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 700) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================
       CURRENT YEAR
    ========================= */

    document.getElementById("year").textContent =
        new Date().getFullYear();


    /* =========================
       CLOSE MENU ON ESC
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                nav.classList.remove("open");

                menuBtn.textContent = "☰";

            }

        }
    );

});
