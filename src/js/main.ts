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