document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('thankYouModal');
    const btn = document.getElementById('btn');
    const closeBtn = modal.querySelector('.modal-close');

    function showModal() {
        modal.classList.add('show');
        // Предотвращаем скролл на заднем фоне
        document.body.style.overflow = 'hidden';
        
        // Анимация появления
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }

    function hideModal() {
        modal.querySelector('.modal-content').style.transform = 'scale(0.7)';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }, 300);
    }

    // Показываем модальное окно при нажатии на кнопку
    btn.addEventListener('click', showModal);

    // Закрываем модальное окно при нажатии на кнопку закрытия
    closeBtn.addEventListener('click', hideModal);

    // Закрываем модальное окно при клике вне его
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Закрываем модальное окно по нажатию Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });
});
