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

    const observer = new IntersectionObserver(
        (entries) => {
            let isAnyVisible = false;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isAnyVisible = true;
                }
            });

            if (isAnyVisible) {
                sidebar.classList.add("is-visible");
            } else {
                sidebar.classList.remove("is-visible");
            }
        },
        {
            threshold: 0, // Срабатывает при касании секции краем экрана
        }
    );

    sidevisible.forEach((section) => observer.observe(section));

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
        { threshold: 0 }
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