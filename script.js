const searchBox = document.querySelector('input[type="text"]');
// Get the menu button and the white page
const menuButton = document.getElementById('custom-menu-button');
const whitePage = document.getElementById('white-page');
const backButton = document.getElementById('back-button');
const menuItems = document.getElementById('menu-items');

let currentVideo = null; // Variable to store the currently playing video element

// Add an event listener to the menu button
menuButton.addEventListener('click', () => {
    whitePage.style.display = 'block';
    menuItems.style.display = 'block';
});

// Add event listeners to the menu items
document.getElementById('menu-item-1').addEventListener('click', () => {
    showMenuContent('menu-content-1');
    menuItems.style.display = 'none';
});

document.getElementById('menu-item-2').addEventListener('click', () => {
    showMenuContent('menu-content-2');
    menuItems.style.display = 'none';
});

document.getElementById('menu-item-3').addEventListener('click', () => {
    showMenuContent('menu-content-3');
    menuItems.style.display = 'none';
});

// Function to display the selected menu content and hide others
function showMenuContent(contentId) {
    const menuContents = document.querySelectorAll('.menu-content');
    menuContents.forEach((content) => {
        content.style.display = 'none';
    });
    document.getElementById(contentId).style.display = 'block';

    // Pause the current video if there is one
    if (currentVideo) {
        currentVideo.pause();
    }
}

// Add an event listener to the back button
backButton.addEventListener('click', () => {
    const menuContents = document.querySelectorAll('.menu-content');
    let contentVisible = false;

    menuContents.forEach((content) => {
        if (content.style.display === 'block') {
            content.style.display = 'none';
            contentVisible = true;
        }
    });

    if (contentVisible) {
        menuItems.style.display = 'block';
    } else {
        whitePage.style.display = 'none';
    }

    // Pause the current video if there is one
    if (currentVideo) {
        currentVideo.pause();
    }
});

// IntersectionObserver for videos
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                if (entry.isIntersecting && entry.target.paused) {
                    entry.target.play();
                }
            }, 200);
        } else {
            entry.target.pause();
        }
    });
}, observerOptions);

const videos = document.querySelectorAll('.video');
videos.forEach(video => {
    videoObserver.observe(video);

    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    video.addEventListener('ended', () => {
        const nextVideo = video.nextElementSibling;
        if (nextVideo && nextVideo.tagName === 'VIDEO') {
            nextVideo.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Handle pausing videos when leaving the page
window.addEventListener('beforeunload', () => {
    videos.forEach(video => {
        video.pause();
    });
});

// Handle changing videos when intersecting with another
videoObserver.observe(videos);
