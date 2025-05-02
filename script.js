// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', () => {
    // Mobil menü için hamburger menü oluştur
    const nav = document.querySelector('nav');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    nav.appendChild(hamburger);

    // Mobil menü toggle fonksiyonu
    hamburger.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scroll için tüm linkleri seç
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Her link için smooth scroll özelliği ekle
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll olayını dinle ve header'ı güncelle
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = '#ffffff';
        }
    });

    // Hero bölümü için animasyon
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease';
        hero.style.opacity = '1';
    }, 100);

    // Feature kartları için animasyon
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});
