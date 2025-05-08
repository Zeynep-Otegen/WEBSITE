// home.js
// Buraya JavaScript kodlarınızı ekleyebilirsiniz.

// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Sayfa yüklendi!');
        
        // CTA butonu için event listener
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', function() {
                alert('Daha fazla bilgi için tıkladınız!');
            });
        }

        // Form için event listener
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log('Form gönderildi!');
                
                try {
                    const formData = new FormData(this);
                    for (let pair of formData.entries()) {
                        console.log(pair[0] + ': ' + pair[1]);
                    }
                } catch (error) {
                    console.error('Form verileri işlenirken hata oluştu:', error);
                }
            });
        }
    } catch (error) {
        console.error('Sayfa yüklenirken bir hata oluştu:', error);
    }
}); 
