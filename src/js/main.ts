// Header 

const burger = document.querySelector('.burger');
const linkClose = document.querySelectorAll('.link-close');
const overflow = document.querySelector('.overflow');

burger?.addEventListener('click', function () {
    document.body.classList.toggle('body_lock');
    document.body.classList.toggle('active');
});

overflow?.addEventListener('click', function () {
    document.body.classList.toggle('body_lock');
    document.body.classList.toggle('active');
});

for (let i = 0; i < linkClose.length; ++i) {
    linkClose[i].addEventListener('click', function () {
        document.body.classList.remove('body_lock');
        document.body.classList.remove('active');
    });
}

// Sidebar

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector<HTMLElement>(".side-bar");
    const links = document.querySelectorAll<HTMLAnchorElement>(".side-bar-link");
    const sidevisible = document.querySelectorAll<HTMLElement>(".sidevisible");
    const sections = document.querySelectorAll<HTMLElement>(
        ".personalized, .watchlist, .wowie"
    );

    if (!sidebar || sidevisible.length === 0) return;

    // --- Появление сайдбара ---
    const sidebarObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    sidebar.classList.add("is-visible");
                } else {
                    sidebar.classList.remove("is-visible");
                }
            });
        },
        {
            root: null,
            threshold: 0,
            rootMargin: "0px 0px -99% 0px",
            // когда верх секции достигает верхней границы вьюпорта
        }
    );

    sidevisible.forEach((section) => sidebarObserver.observe(section));

    const activeSectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const section = entry.target as HTMLElement;

                const sectionClass = ["personalized", "watchlist", "wowie"].find((cls) =>
                    section.classList.contains(cls)
                );

                if (!sectionClass) return;

                const matchingLink = document.querySelector<HTMLAnchorElement>(
                    `.side-bar-link[href="#${sectionClass}"]`
                );

                if (matchingLink) {
                    links.forEach((link) => link.classList.remove("active"));
                    matchingLink.classList.add("active");
                }
            });
        },
        {
            root: null,
            threshold: 0,
            rootMargin: "0px 0px -99% 0px",
            // когда верх секции достигает верхней границы вьюпорта
        }
    );

    sections.forEach((section) => activeSectionObserver.observe(section));
});

// for Swipers

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function destroySlidersOnResize(selector, width, obj, moreThan) {
    const init = {
        ...obj,
    };

    const win = window;
    const sliderSelector = document.querySelector(selector);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let swiper = new Swiper(selector, init);

    const toggleInit = () => {
        const neededWidth = moreThan
            ? win.innerWidth >= width
            : win.innerWidth <= width;
        if (neededWidth) {
            if (!sliderSelector?.classList.contains("swiper-initialized")) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                swiper = new Swiper(selector, init);
            }
        } else if (sliderSelector.classList.contains("swiper-initialized")) {
            swiper.destroy();
        }
    };

    ["load", "resize"].forEach((evt) =>
        win.addEventListener(evt, toggleInit, false)
    );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
destroySlidersOnResize(".hoursSlider", 99999, {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
        rotate: -40,
        stretch: 20,
        depth: 150,
        modifier: 1,
        slideShadows: false,
    },

    breakpoints: {
        0: {
            coverflowEffect: {
                stretch: -10,
            },
        },
        767: {
            coverflowEffect: {
                stretch: 20,
            },
        },
    },
});


// For popups

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector<HTMLElement>(".overlay");
    const closeButtons = document.querySelectorAll<HTMLElement>(".popup-close");
    const body = document.body;

    if (!overlay || !closeButtons.length) {
        console.warn("Popup system not initialized: required elements not found.");
        return;
    }

    const initPopup = (triggerClass: string, popupClass: string) => {
        const openButtons = document.querySelectorAll<HTMLElement>(`.${triggerClass}`);
        const modal = document.querySelector<HTMLElement>(`.${popupClass}`);

        if (!openButtons.length || !modal) return;

        const openModal = () => {
            modal.classList.add("open");
            overlay.classList.add("active");
            body.classList.add("body_lock");
        };

        const closeModal = () => {
            modal.classList.remove("open");
            overlay.classList.remove("active");
            body.classList.remove("body_lock");
        };

        openButtons.forEach((button) => button.addEventListener("click", openModal));
        closeButtons.forEach((btn) => btn.addEventListener("click", closeModal));
        overlay.addEventListener("click", closeModal);
    };

    initPopup("popup-contact-btn", "popup-contact");
    initPopup("popup-waitlist-btn", "popup-waitlist");
});

// For fixed-btn

document.addEventListener("DOMContentLoaded", () => {
    const fixedBtn = document.querySelector<HTMLElement>(".fixed-btn");
    const mainSection = document.querySelector<HTMLElement>(".main-section");

    if (!fixedBtn || !mainSection) return;

    const checkVisibility = () => {
        const sectionRect = mainSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Если нижняя часть экрана находится в пределах секции — скрываем кнопку
        if (sectionRect.bottom > windowHeight) {
            fixedBtn.style.opacity = "0";
            fixedBtn.style.pointerEvents = "none";
        } else {
            fixedBtn.style.opacity = "1";
            fixedBtn.style.pointerEvents = "auto";
        }
    };

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);
    checkVisibility(); // Проверяем сразу при загрузке
});

