const bodyOverlay = document.getElementById('body-overlay');
const navBtn = document.getElementById('nav-btn');
const navIcon = navBtn.querySelector('i');
const navbar = document.getElementById('navbar');
const navMenu = document.querySelectorAll('#navbar ul li');
const body = document.getElementsByTagName('body')[0];

let flag = false;

navBtn.addEventListener('click', () => {

    if (!flag) {
        bodyOverlay.style.display = 'block';
        navbar.style.display = 'flex';
        body.style.overflowY = 'hidden';
        navIcon.classList.remove('fa-bars');
        navIcon.classList.add('fa-times');
        setTimeout(() => {
            navbar.style.left = '0%';
            bodyOverlay.style.opacity = '0.7';
        }, 1);
    }
    else {
        closeNavMenu();
    }

    flag = !flag;

});

navMenu.forEach(element => {
    element.addEventListener('click', () => {
        closeNavMenu();
        flag = !flag;
    });
});

bodyOverlay.addEventListener('click', ()=> {
    closeNavMenu();
    flag = !flag;
});

function closeNavMenu() {
    bodyOverlay.style.opacity = '0';
    navbar.style.left = '-100%';
    body.style.overflowY = 'initial';
    navIcon.classList.remove('fa-times');
    navIcon.classList.add('fa-bars');
    setTimeout(() => {
        navbar.style.display = 'none';
        bodyOverlay.style.display = 'none';
    }, 500);
}