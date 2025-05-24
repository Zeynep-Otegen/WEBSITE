// İletişim sayfası JavaScript kodları
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('İletişim sayfası yüklendi!');

        // Form gönderimi için event listener
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();

                // Form verilerini al
                const formData = new FormData(this);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });

                // Form doğrulama
                if (validateForm(formObject)) {
                    // Form gönderim animasyonu
                    const submitBtn = this.querySelector('.submit-btn');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
                    submitBtn.disabled = true;

                    // Form gönderim simülasyonu (gerçek uygulamada API'ye gönderilecek)
                    setTimeout(() => {
                        console.log('Form verileri:', formObject);
                        showNotification('Mesajınız başarıyla gönderildi!', 'success');
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                }
            });
        }

        // E-posta bağlantısı için tıklama efekti
        const emailLinks = document.querySelectorAll('.contact-card a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const email = this.getAttribute('href').replace('mailto:', '');
                if (confirm(`E-posta göndermek için varsayılan e-posta uygulamanız açılacak. Devam etmek istiyor musunuz?`)) {
                    window.location.href = `mailto:${email}`;
                }
            });
        });

        // Takım üyeleri için hover efektleri
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            // LinkedIn butonu için hover efekti
            const linkedinBtn = member.querySelector('.linkedin-btn');
            if (linkedinBtn) {
                linkedinBtn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                });

                linkedinBtn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            }

            // Profil kartı için tıklama efekti
            member.addEventListener('click', function(e) {
                if (!e.target.closest('.linkedin-btn')) {
                    const name = this.querySelector('h4').textContent;
                    const role = this.querySelector('p').textContent;
                    showNotification(`${name} - ${role}\n\nBu kişi hakkında daha fazla bilgi için LinkedIn profiline gidebilirsiniz.`, 'info');
                }
            });
        });

        // Sayfa yüklendiğinde animasyon efekti
        animateOnScroll();

    } catch (error) {
        console.error('Sayfa yüklenirken bir hata oluştu:', error);
    }
});

// Form doğrulama fonksiyonu
function validateForm(formData) {
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    // E-posta doğrulama
    if (!emailRegex.test(formData.email)) {
        showNotification('Lütfen geçerli bir e-posta adresi giriniz.', 'error');
        isValid = false;
    }

    // İsim doğrulama
    if (formData.name.length < 3) {
        showNotification('Lütfen geçerli bir isim giriniz.', 'error');
        isValid = false;
    }

    // Konu doğrulama
    if (!formData.subject) {
        showNotification('Lütfen bir konu seçiniz.', 'error');
        isValid = false;
    }

    // Mesaj doğrulama
    if (formData.message.length < 10) {
        showNotification('Mesajınız en az 10 karakter olmalıdır.', 'error');
        isValid = false;
    }

    return isValid;
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type = 'info') {
    // Mevcut bildirimleri temizle
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Bildirimi sayfaya ekle
    document.body.appendChild(notification);

    // Bildirim animasyonu
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Kapatma butonu için event listener
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Otomatik kapanma
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Bildirim ikonu seçme fonksiyonu
function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        default:
            return 'fa-info-circle';
    }
}

// Sayfa kaydırma animasyonu
function animateOnScroll() {
    const elements = document.querySelectorAll('.contact-card, .team-member, .contact-form-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
}

// CSS için bildirim stilleri
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        border-radius: 5px;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 1000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .notification.success {
        border-left: 4px solid #28a745;
    }

    .notification.error {
        border-left: 4px solid #dc3545;
    }

    .notification.warning {
        border-left: 4px solid #ffc107;
    }

    .notification.info {
        border-left: 4px solid #17a2b8;
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification.success i {
        color: #28a745;
    }

    .notification.error i {
        color: #dc3545;
    }

    .notification.warning i {
        color: #ffc107;
    }

    .notification.info i {
        color: #17a2b8;
    }

    .notification-close {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 0.2rem;
        transition: color 0.3s ease;
    }

    .notification-close:hover {
        color: #333;
    }

    .animate {
        animation: fadeInUp 0.5s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);