import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase yapılandırmanızı buraya yapıştırın
const firebaseConfig = {
  apiKey: "AIzaSy...", // Kendi API Key'inizi buraya yapıştırın
  authDomain: "your-project-id.firebaseapp.com", 
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com", 
  messagingSenderId: "your-messaging-sender-id", 
  appId: "1:your-app-id:web:your-web-app-id"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Authentication servisini al
const auth = getAuth(app);

// signin.html dosyasındaki form ve hata mesajı elementlerini al
const signinForm = document.getElementById('signin-form');
const errorMessage = document.getElementById('error-message');

// Form gönderildiğinde çalışacak Olay Dinleyicisini Ekle
signinForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Tarayıcının form gönderimi sonrası sayfayı yeniden yüklemesini engelle

  // Formdaki input alanlarından değerleri al
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Firebase Authentication ile kullanıcı girişi yap
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Giriş başarılı!
      const user = userCredential.user;
      console.log("Kullanıcı başarıyla giriş yaptı:", user); // Konsola bilgi yazdır

      // Kullanıcı başarılı bir şekilde giriş yaptıktan sonra yapılacak işlemler
      alert("Giriş başarılı! Hoş geldiniz.");
      window.location.href = "/anasayfa.html"; // Yönlendirme
    })
    .catch((error) => {
      // Hata durumunda yapılacak işlemler
      const errorCode = error.code;
      const errorMessageText = error.message;

      console.error("Giriş hatası:", errorCode, errorMessageText); // Konsola yazdır

      // Hata mesajlarını ekranda göstermek
      if (errorMessage) {
        switch (errorCode) {
          case 'auth/invalid-email':
            errorMessage.textContent = "Geçersiz e-posta adresi.";
            break;
          case 'auth/user-disabled':
            errorMessage.textContent = "Bu kullanıcı hesabı devre dışı bırakılmıştır.";
            break;
          case 'auth/user-not-found':
            errorMessage.textContent = "Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.";
            break;
          case 'auth/wrong-password':
            errorMessage.textContent = "Yanlış parola.";
            break;
          case 'auth/too-many-requests':
            errorMessage.textContent = "Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.";
            break;
          default:
            errorMessage.textContent = "Giriş sırasında bir hata oluştu: " + errorMessageText;
            break;
        }
      } else {
        // Eğer 'error-message' div'i yoksa, alert ile kullanıcıyı bilgilendirme
        alert("Giriş sırasında bir hata oluştu: " + errorMessageText);
      }
    });
});

