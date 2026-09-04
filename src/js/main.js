import { BaseHelpers } from './helpers/base-helpers';

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();


//menu sidebar
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


//video bg transition
const videoSources = [
    'static/videos/bg-video-1.mp4',
    'static/videos/bg-video-2.mp4',
    'static/videos/bg-video-3.mp4',
    'static/videos/bg-video-4.mp4'
];

const videos = [...document.querySelectorAll('.bg-video')];

const DISPLAY_TIME = 7000;
const FADE_DURATION = 1200;

let currentIndex = Math.floor(Math.random() * videoSources.length);
let activeVideoIndex = 0;
let isChanging = false;
let intervalId;

if (videos.length >= 2 && videoSources.length) {
    const [firstVideo] = videos;

    firstVideo.src = videoSources[currentIndex];
    firstVideo.load();

    firstVideo.addEventListener(
        'loadeddata',
        () => {
            firstVideo.play().catch(() => {});
            firstVideo.classList.add('bg-video--active');

            startVideoRotation();
        },
        { once: true }
    );

    function startVideoRotation() {
        clearInterval(intervalId);

        intervalId = setInterval(changeBackgroundVideo, DISPLAY_TIME);
    }

    function getRandomVideoIndex(currentIndex) {
        if (videoSources.length <= 1) {
            return 0;
        }

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * videoSources.length);
        } while (randomIndex === currentIndex);

        return randomIndex;
    }

    function changeBackgroundVideo() {
        if (isChanging) {
            return;
        }

        isChanging = true;

        const nextIndex = getRandomVideoIndex(currentIndex);
        const activeVideo = videos[activeVideoIndex];
        const nextVideoIndex = activeVideoIndex === 0 ? 1 : 0;
        const nextVideo = videos[nextVideoIndex];

        nextVideo.classList.remove('bg-video--active');
        nextVideo.src = videoSources[nextIndex];
        nextVideo.load();

        nextVideo.addEventListener(
            'loadeddata',
            () => {
                nextVideo.currentTime = 0;

                nextVideo.play()
                    .then(() => {
                        nextVideo.classList.add('bg-video--active');
                        activeVideo.classList.remove('bg-video--active');

                        setTimeout(() => {
                            activeVideo.pause();
                            activeVideo.removeAttribute('src');
                            activeVideo.load();

                            currentIndex = nextIndex;
                            activeVideoIndex = nextVideoIndex;
                            isChanging = false;
                        }, FADE_DURATION);
                    })
                    .catch(() => {
                        // Якщо autoplay заблокований браузером,
                        // повертаємо можливість повторити спробу пізніше.
                        isChanging = false;
                    });
            },
            { once: true }
        );
    }
}