let header = document.querySelector('.header');

function toggleHeaderBackground() {
    if (window.scrollY > 0) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
}

window.addEventListener('scroll', toggleHeaderBackground);
