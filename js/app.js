const page = document.querySelector('body');
const topButton = document.querySelector('footer .top');

const menuToggle = document.querySelector('.menu-toggle');
const topBar = document.querySelector('.top-bar');
const menuLinks = document.querySelectorAll('.menu a');
menuToggle.addEventListener('click', function () {
    page.classList.toggle('m-nav-open');
});
menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        page.classList.remove('m-nav-open');
    });
});

function updateScroll() {
    if (window.scrollY > 100) {
        page.classList.add('page-scrolled');
    } else {
        page.classList.remove('page-scrolled');
    }
}

page.classList.add('js-enabled');
window.addEventListener('scroll', updateScroll);
updateScroll();

topButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const tabs = document.querySelectorAll('.guide-tabs li');
const contents = document.querySelectorAll('.guide-content li');
init(0);
function init(num) {
    tabs[num].classList.add('on');
    contents[num].classList.add('on');
}
function reset() {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('on');
        contents[i].classList.remove('on');
    }
}
tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
        reset();
        init(i);
    });
});
contents.forEach(function (content, i) {
    content.addEventListener('click', function () {
        reset();
        init(i);
    });
});
