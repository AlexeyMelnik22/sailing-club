import { BaseHelpers } from './helpers/base-helpers';

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();


const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
const backdrop = document.querySelector('.menu-backdrop');
const closeButtons = document.querySelectorAll('[data-menu-close]');
const menuLinks = sideMenu.querySelectorAll('a');

function openMenu() {
    sideMenu.classList.add('is-open');
    backdrop.classList.add('is-visible');
    document.body.classList.add('menu-is-open');

    menuToggle.setAttribute('aria-expanded', 'true');
    sideMenu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
    sideMenu.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    document.body.classList.remove('menu-is-open');

    menuToggle.setAttribute('aria-expanded', 'false');
    sideMenu.setAttribute('aria-hidden', 'true');

    menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

closeButtons.forEach((button) => {
    button.addEventListener('click', closeMenu);
});

menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});