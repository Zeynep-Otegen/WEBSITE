// home.js
// Buraya JavaScript kodlarınızı ekleyebilirsiniz.

// Örnek: Sayfa yüklendiğinde konsola mesaj yazdırma
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sayfa yüklendi!');
});

// Örnek: CTA butonuna tıklandığında alert gösterme
document.querySelector('.cta-button').addEventListener('click', function() {
    alert('Daha fazla bilgi için tıkladınız!');
});

// Örnek: Form gönderildiğinde konsola mesaj yazdırma
document.querySelector('.contact-form form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form gönderildi!');
    // Form verilerini almak için:
    const formData = new FormData(this);
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
}); 
