import { BaseHelpers } from './helpers/base-helpers';

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();


const menuToggles = document.querySelectorAll('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
const backdrop = document.querySelector('.menu-backdrop');
const closeButtons = document.querySelectorAll('[data-menu-close]');

if (menuToggles.length && sideMenu && backdrop) {
    const menuLinks = sideMenu.querySelectorAll('a');

    function setMenuState(isOpen, shouldFocusToggle = false) {
        sideMenu.classList.toggle('is-open', isOpen);
        backdrop.classList.toggle('is-visible', isOpen);
        document.body.classList.toggle('menu-is-open', isOpen);

        sideMenu.setAttribute('aria-hidden', String(!isOpen));

        menuToggles.forEach((toggle) => {
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        if (!isOpen && shouldFocusToggle) {
            const activeToggle = document.activeElement;

            if (!activeToggle?.classList.contains('menu-toggle')) {
                menuToggles[0].focus();
            }
        }
    }

    function openMenu() {
        setMenuState(true);
    }

    function closeMenu(shouldFocusToggle = false) {
        setMenuState(false, shouldFocusToggle);
    }

    menuToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const isOpen = sideMenu.classList.contains('is-open');

            if (isOpen) {
                closeMenu(true);
            } else {
                openMenu();
            }
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            closeMenu(true);
        });
    });

    backdrop.addEventListener('click', () => {
        closeMenu(true);
    });

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu(false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sideMenu.classList.contains('is-open')) {
            closeMenu(true);
        }
    });
}