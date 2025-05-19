// Firebase ile gerekli işlevleri içeren script
const firebaseConfig = {
  apiKey: "AIzaSyATMAiIlVvZ49lFp8hcJc60AXPFQujxUzw",
  authDomain: "yksgirissistemi.firebaseapp.com",
  projectId: "yksgirissistemi",
  storageBucket: "yksgirissistemi.appspot.com",
  messagingSenderId: "718115875246",
  appId: "1:718115875246:web:1565c90a88647f7ffbc03f",
  measurementId: "G-9PTPZBZNEE"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Firebase 8 namespace API kullanımı
const provider = new firebase.auth.GoogleAuthProvider(); // Firebase 8 namespace API kullanımı

function googleSignIn() {
  auth.signInWithPopup(provider) // Firebase 8 namespace API kullanımı
    .then((result) => {
      // Kullanıcı başarıyla giriş yaptıysa
      const user = result.user;
      console.log("Giriş Başarılı! Kullanıcı: " + user.displayName);

      // Kullanıcı bilgilerini al ve sayfada göster (Eğer sayfanızda bu elementler varsa)
      const userNameElement = document.getElementById("user-name");
      const userEmailElement = document.getElementById("user-email");
      const userInfoElement = document.getElementById("user-info");
      const googleSignInBtnElement = document.getElementById("googleSignInBtn");
      const extraInfoFormElement = document.getElementById("extra-info-form");


      if (userNameElement) userNameElement.textContent = user.displayName;
      if (userEmailElement) userEmailElement.textContent = user.email;

      // Kullanıcı bilgilerini göster (Eğer sayfanızda bu elementler varsa)
      if (userInfoElement) userInfoElement.style.display = "block";

      // Google ile giriş butonunu gizle (Eğer sayfanızda bu element varsa)
      if (googleSignInBtnElement) googleSignInBtnElement.style.display = "none";

      // Ekstra bilgi formunu göster (Eğer sayfanızda bu element varsa)
      if (extraInfoFormElement) extraInfoFormElement.style.display = "block";

      // İsteğe bağlı: Google ile giriş yaptıktan sonra kullanıcıyı başka bir sayfaya yönlendirebilirsiniz.
      // window.location.href = "/ana-icerik-sayfasi.html";

    })
    .catch((error) => {
      console.error("Hata:", error.code, error.message);
      alert("Google ile giriş hatası oluştu: " + error.message); // Daha açıklayıcı bir mesaj
    });
}

// Sadece "Google ile Devam Et" butonu için click olayı dinleniyor - Bu doğru
document.getElementById("googleSignInBtn").addEventListener("click", googleSignIn);

// Ekstra form gönderildiğinde işlemi gerçekleştir - Bu da doğru ve yerinde
const extraForm = document.getElementById("form"); // Form elementini al
if (extraForm) { // Eğer form elementi varsa dinleyici ekle
    extraForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Formun sayfayı yenilemesini engelle

      const phoneInput = document.getElementById("phone");
      const addressInput = document.getElementById("address");

      const phone = phoneInput ? phoneInput.value : 'Telefon alanı bulunamadı'; // Alan varsa değerini al
      const address = addressInput ? addressInput.value : 'Adres alanı bulunamadı'; // Alan varsa değerini al


      // Kullanıcıdan alınan ek bilgileri konsola yazdır
      console.log("Telefon Numarası: " + phone);
      console.log("Adres: " + address);

      // Burada bilgileri bir veritabanına kaydedebilir veya başka bir işlem yapabilirsiniz
      // Örneğin Firebase Firestore'a kaydetme kodu buraya gelebilir.

      // Formu sıfırlama (Eğer form elementi varsa)
      if (extraForm) extraForm.reset();
      alert("Ek Bilgileriniz kaydedildi!"); // Daha açıklayıcı bir mesaj
    });
} else {
    console.log("'form' id'li element bulunamadı."); // Eğer form yoksa konsola bilgi ver
}

// **** ÖNEMLİ NOT ****
// Kullanıcı oturum durumu değiştiğinde (giriş/çıkış) ne olacağını takip etmek için
// genellike onAuthStateChanged listener'ını kullanmanız önerilir.
// Bu kodu buraya ekleyebilirsiniz:
/*
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Kullanıcı oturum açmış
    console.log("Oturum durumu değişti: Kullanıcı oturum açtı.", user);
    // Bu noktada kullanıcı oturum açmışsa anasayfaya yönlendirme yapabilirsiniz.
    // window.location.href = "/anasayfa.html";

  } else {
    // Kullanıcı oturum açmamış veya oturumu kapatmış
     console.log("Oturum durumu değişti: Kullanıcı oturum açmadı.");
     // Bu noktada kullanıcı giriş/kayıt ekranına geri yönlendirme yapabilirsiniz.
     // window.location.href = "/index.html"; // veya sizin giriş/kayıt sayfanız
  }
});
*/




