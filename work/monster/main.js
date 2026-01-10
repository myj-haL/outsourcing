// Fade Up Animation with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer 설정
    const observerOptions = {
        threshold: 0.1, // 요소의 10%가 보이면 트리거
        rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 들어오면 visible 클래스 추가
                entry.target.classList.add('visible');
                // 한 번 애니메이션이 실행되면 관찰 중지 (선택사항)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // fade-up 클래스를 가진 모든 요소 관찰
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(element => {
        observer.observe(element);
    });

    // 스무스 스크롤 (선택사항)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
