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
    const wrapper = document.querySelector<HTMLElement>(".sidevisible");
    const sections = document.querySelectorAll<HTMLElement>(
        ".personalized, .watchlist, .wowie"
    );

    if (!sidebar || !wrapper || sections.length === 0) return;

    const sidebarObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                sidebar.classList.toggle("is-visible", entry.isIntersecting);
            });
        },
        { threshold: 0.1 }
    );

    sidebarObserver.observe(wrapper);

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
        { threshold: 0.4 }
    );

    sections.forEach((section) => activeSectionObserver.observe(section));
});

