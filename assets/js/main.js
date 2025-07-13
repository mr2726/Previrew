// --- Horizontal page-like scroll (snap to section) ---
function getSections() {
    return Array.from(document.querySelectorAll('.horizontal-section'));
}

function scrollToSection(index) {
    const sections = getSections();
    if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
}

function getCurrentSectionIndex() {
    const container = document.querySelector('.horizontal-scroll-container');
    const sections = getSections();
    if (!container || !sections.length) return 0;
    const scrollLeft = container.scrollLeft;
    let minDiff = Infinity;
    let idx = 0;
    sections.forEach((sec, i) => {
        const diff = Math.abs(sec.offsetLeft - scrollLeft);
        if (diff < minDiff) {
            minDiff = diff;
            idx = i;
        }
    });
    return idx;
}

function setupPageLikeScroll() {
    const container = document.querySelector('.horizontal-scroll-container');
    if (!container) return;
    let isWheelScrolling = false;
    let wheelTimeout;
    container.addEventListener('wheel', function(e) {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; // только горизонтальные жесты
        e.preventDefault();
        if (isWheelScrolling) return;
        isWheelScrolling = true;
        const sections = getSections();
        let idx = getCurrentSectionIndex();
        if (e.deltaX > 0 && idx < sections.length - 1) {
            scrollToSection(idx + 1);
        } else if (e.deltaX < 0 && idx > 0) {
            scrollToSection(idx - 1);
        }
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => { isWheelScrolling = false; }, 500);
    }, { passive: false });

    // Touch swipe (mobile)
    let touchStartX = null;
    let touchStartY = null;
    container.addEventListener('touchstart', function(e) {
        if (e.touches && e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    });
    container.addEventListener('touchend', function(e) {
        if (touchStartX === null || touchStartY === null) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            let idx = getCurrentSectionIndex();
            if (dx < 0) {
                scrollToSection(idx + 1);
            } else {
                scrollToSection(idx - 1);
            }
        }
        touchStartX = null;
        touchStartY = null;
    });
}
// Horizontal scroll indicator logic
let scrollIndicatorShown = false;
let scrollIndicatorHidden = false;

function showScrollIndicator() {
    if (scrollIndicatorShown || scrollIndicatorHidden) return;
    const indicator = document.getElementById('scroll-indicator');
    if (indicator) {
        indicator.classList.remove('hide');
        scrollIndicatorShown = true;
    }
}

function hideScrollIndicator() {
    if (scrollIndicatorHidden) return;
    const indicator = document.getElementById('scroll-indicator');
    if (indicator && !indicator.classList.contains('hide')) {
        indicator.classList.add('hide');
        scrollIndicatorHidden = true;
    }
}

function setupScrollIndicator() {
    const indicator = document.getElementById('scroll-indicator');
    if (indicator) {
        indicator.classList.add('hide'); // Скрыть по умолчанию
    }
    // Показать через 5 секунд после исчезновения прелоадера
    setTimeout(() => {
        if (!scrollIndicatorHidden) showScrollIndicator();
    }, 5000);

    // Скрыть при первом горизонтальном скролле/свайпе
    const container = document.querySelector('.horizontal-scroll-container');
    if (container) {
        let scrolled = false;
        container.addEventListener('scroll', function(e) {
            if (!scrolled && Math.abs(container.scrollLeft) > 10) {
                scrolled = true;
                hideScrollIndicator();
            }
        });
        // Для мобильных свайпов (touch)
        let touchStartX = null;
        container.addEventListener('touchstart', function(e) {
            if (e.touches && e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
            }
        });
        container.addEventListener('touchmove', function(e) {
            if (touchStartX !== null && e.touches && e.touches.length === 1) {
                const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
                if (deltaX > 30) {
                    hideScrollIndicator();
                    touchStartX = null;
                }
            }
        });
        container.addEventListener('touchend', function() {
            touchStartX = null;
        });
    }
}
// Fix 100vh issue on mobile devices
function setFullHeight() {
    const vh = window.innerHeight;
    const sections = document.querySelectorAll('.horizontal-section');
    const container = document.querySelector('.horizontal-scroll-container');
    if (container) {
        container.style.height = vh + 'px';
    }
    sections.forEach(sec => {
        sec.style.height = vh + 'px';
    });
}

window.addEventListener('resize', setFullHeight);
window.addEventListener('orientationchange', setFullHeight);
document.addEventListener('DOMContentLoaded', setFullHeight);

// Preloader logic
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const indicator = document.getElementById('scroll-indicator');
    if (indicator) {
        indicator.classList.add('hide'); // Скрыть индикатор на экране загрузки
    }
    if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.remove();
            // После исчезновения прелоадера запускаем индикатор
            setupScrollIndicator();
            setupPageLikeScroll();
        }, 800); // match transition duration
    } else {
        // Если прелоадера нет, всё равно запускаем индикатор
        setupScrollIndicator();
        setupPageLikeScroll();
    }
});
