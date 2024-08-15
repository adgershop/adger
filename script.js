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



function toggleCart() {
    var cartPage = document.getElementById('cartPage');
    if (cartPage.style.display === 'none' || cartPage.style.display === '') {
        cartPage.style.display = 'block';
        document.body.style.overflow = 'hidden'; // منع التمرير في الصفحة الرئيسية
    } else {
        cartPage.style.display = 'none';
        document.body.style.overflow = ''; // إعادة تفعيل التمرير في الصفحة الرئيسية
    }
}



// دالة لإدخال الكلمة المحددة في حقل البحث
function insertSearchTerm(term) {
    var searchInput = document.getElementById('searchInput');
    searchInput.value = term;
    searchProducts(); // لتشغيل وظيفة البحث بعد إدخال الكلمة
    toggleClearButton(searchInput); // لتبديل زر المسح بناءً على المحتوى الجديد
}

// دالة لإغلاق الـ Modal2
function closeModal2() {
    // أضف هنا الكود لإغلاق الـ Modal2
}

// دالة للبحث عن المنتجات
function searchProducts() {
    var searchInput = document.getElementById('searchInput');
    var searchLinks = document.querySelector('.search-links');
    if (searchInput.value.trim() !== '') {
        searchLinks.style.display = 'none'; // إخفاء الروابط عند البحث
    } else {
        searchLinks.style.display = 'flex'; // عرض الروابط عندما لا يكون هناك نص
    }
}

// دالة لتبديل زر مسح البحث
function toggleClearButton(input) {
    var clearButton = document.getElementById('clearButton');
    if (input.value.trim() !== '') {
        clearButton.style.display = 'inline'; // عرض زر المسح
    } else {
        clearButton.style.display = 'none'; // إخفاء زر المسح
    }
}

// دالة للتعامل مع نقر زر المسح
function handleClearClick() {
    var searchInput = document.getElementById('searchInput');
    searchInput.value = ''; // مسح النص في حقل البحث
    searchProducts(); // إعادة تشغيل البحث بعد مسح النص
    toggleClearButton(searchInput); // تحديث حالة زر المسح
}


















