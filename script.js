document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    const loader =
        document.getElementById("loader");

    window.addEventListener("load", () => {

        if (loader) {

            setTimeout(() => {

                loader.classList.add("loaded");

            }, 700);

        }

    });


    /* =========================
       LANGUAGE
    ========================= */

    const langBtn =
        document.getElementById("langBtn");

    let currentLanguage =
        localStorage.getItem("miramLanguage") || "en";


    function updateLanguage() {

        const html =
            document.documentElement;

        /* RTL / LTR */

        html.lang =
            currentLanguage;

        html.dir =
            currentLanguage === "ar"
                ? "rtl"
                : "ltr";


        /* Change text */

        document
            .querySelectorAll("[data-en]")
            .forEach(element => {

                const text =
                    currentLanguage === "ar"
                        ? element.dataset.ar
                        : element.dataset.en;

                if (
                    typeof text === "string" &&
                    text.length > 0
                ) {

                    element.textContent =
                        text;

                }

            });


        /* Language button */

        if (langBtn) {

            langBtn.textContent =
                currentLanguage === "ar"
                    ? "English"
                    : "العربية";

            langBtn.setAttribute(
                "aria-label",
                currentLanguage === "ar"
                    ? "Switch to English"
                    : "التبديل إلى العربية"
            );

        }


        /* Save */

        localStorage.setItem(
            "miramLanguage",
            currentLanguage
        );


        /* Update document direction */

        document.body.style.direction =
            currentLanguage === "ar"
                ? "rtl"
                : "ltr";
    }


    if (langBtn) {

        langBtn.addEventListener(
            "click",
            () => {

                currentLanguage =
                    currentLanguage === "en"
                        ? "ar"
                        : "en";

                updateLanguage();

            }
        );

    }

    updateLanguage();


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn =
        document.getElementById("menuBtn");

    const nav =
        document.getElementById("nav");


    if (menuBtn && nav) {

        menuBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    nav.classList.toggle("open");

                menuBtn.textContent =
                    isOpen
                        ? "×"
                        : "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

            }
        );


        document
            .querySelectorAll("nav a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "open"
                        );

                        menuBtn.textContent =
                            "☰";

                        menuBtn.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* =========================
       HEADER SCROLL
    ========================= */

    const header =
        document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================
       SCROLL PROGRESS
    ========================= */

    const progress =
        document.getElementById(
            "scrollProgress"
        );


    function updateProgress() {

        if (!progress) return;

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (
                    scrollTop /
                    documentHeight
                ) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();


    /* =========================
       REVEAL ANIMATIONS
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );

                                observer
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =========================
       ACTIVE NAV
    ========================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "nav a"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                navLinks.forEach(
                                    link => {

                                        link.classList
                                            .remove(
                                                "active"
                                            );

                                    }
                                );


                                const activeLink =
                                    document
                                        .querySelector(
                                            `nav a[href="#${entry.target.id}"]`
                                        );


                                if (
                                    activeLink
                                ) {

                                    activeLink
                                        .classList
                                        .add(
                                            "active"
                                        );

                                }

                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px"
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =========================
       LIGHTBOX
    ========================= */

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";


        setTimeout(() => {

            if (lightboxImage) {

                lightboxImage.src = "";

            }

        }, 300);

    }


    document
        .querySelectorAll(
            "[data-lightbox]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        !lightbox ||
                        !lightboxImage
                    ) return;


                    const image =
                        button.dataset
                            .lightbox;


                    if (!image) return;


                    lightboxImage.src =
                        image;


                    lightbox.classList.add(
                        "active"
                    );


                    document.body.style
                        .overflow =
                        "hidden";

                }
            );

        });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =========================
       ESCAPE
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();


                if (
                    nav &&
                    menuBtn
                ) {

                    nav.classList.remove(
                        "open"
                    );

                    menuBtn.textContent =
                        "☰";

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =========================
       BACK TO TOP
    ========================= */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 700) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =========================
       CURRENT YEAR
    ========================= */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =========================
       PREVENT ACCIDENTAL
       HORIZONTAL OVERFLOW
    ========================= */

    function checkOverflow() {

        document
            .querySelectorAll("*")
            .forEach(element => {

                if (
                    element.scrollWidth >
                    element.clientWidth + 2
                ) {

                    /*
                     * Do not forcibly hide legitimate
                     * horizontal content.
                     * The main protection is already
                     * provided by body/html overflow.
                     */

                }

            });

    }


    window.addEventListener(
        "resize",
        checkOverflow
    );

});
