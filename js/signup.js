import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// Firebase yapılandırmanızı buraya ekleyin
const firebaseConfig = {
  apiKey: "AIzaSy...", // Kendi API Key'inizi ekleyin
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "1:your-app-id:web:your-web-app-id"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

// Kontrol 1: Script yüklendi mi ve form elementi bulundu mu?
console.log("signup.js yüklendi.");
if (signupForm) {
    console.log("Form elementi bulundu:", signupForm);
} else {
    console.error("Hata: 'signup-form' id'li element bulunamadı!");
}

signupForm.addEventListener('submit', (event) => {
  // Kontrol 2: Form submit olayı tetiklendi mi?
  console.log("Form submit olayı tetiklendi.");
  
  event.preventDefault(); // Sayfanın yenilenmesini engelle
  
  // Kontrol 3: preventDefault çalıştı mı?
  console.log("event.preventDefault() çalıştı.");
  
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Kontrol 4: Form değerleri alındı mı?
  console.log("Form değerleri alındı:", { firstName, lastName, email, password });

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("createUserWithEmailAndPassword başarılı."); // Kontrol 5a
      const user = userCredential.user;

      updateProfile(user, {
        displayName: firstName + " " + lastName
      }).then(() => {
        console.log("updateProfile başarılı."); // Kontrol 6a
        alert("Kayıt başarılı! Hesabınız oluşturuldu.");
        
        // İsteğe bağlı yönlendirme kodu burada. Eğer yorum satırı değilse, o sayfa yükleneceği için sıfırlanma normaldir.
        // window.location.href = "/anasayfa.html"; // Yönlendirme işlemi için burayı açabilirsiniz.
      }).catch((profileUpdateError) => {
        console.error("updateProfile hatası:", profileUpdateError); // Kontrol 6b
        if (errorMessage) {
           errorMessage.textContent = "Profil güncellenirken bir hata oluştu: " + profileUpdateError.message;
        }
      });
    })
    .catch((signupError) => {
      console.error("createUserWithEmailAndPassword hatası:", signupError); // Kontrol 5b
      if (errorMessage) {
        switch (signupError.code) {
          case 'auth/email-already-in-use':
            errorMessage.textContent = "Bu e-posta adresi zaten kullanılıyor.";
            break;
          case 'auth/invalid-email':
            errorMessage.textContent = "Geçersiz e-posta adresi.";
            break;
          case 'auth/weak-password':
            errorMessage.textContent = "Parola en az 6 karakter uzunluğunda olmalıdır.";
            break;
          default:
            errorMessage.textContent = "Kayıt sırasında bir hata oluştu: " + signupError.message;
            break;
        }
      } else {
        alert("Kayıt sırasında bir hata oluştu: " + signupError.message);
      }
    });
});



