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
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// DOM elemanlarını başta bir kere al
const userNameElement = document.getElementById("user-name");
const userEmailElement = document.getElementById("user-email");
const userInfoElement = document.getElementById("user-info");
const googleSignInBtnElement = document.getElementById("googleSignInBtn");
const extraInfoFormElement = document.getElementById("extra-info-form");
const formElement = document.getElementById("form");

// Google ile giriş işlemi
function googleSignIn() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log("Giriş Başarılı! Kullanıcı: " + user.displayName);

      if (userNameElement) userNameElement.textContent = user.displayName;
      if (userEmailElement) userEmailElement.textContent = user.email;
      if (userInfoElement) userInfoElement.style.display = "block";
      if (googleSignInBtnElement) googleSignInBtnElement.style.display = "none";
      if (extraInfoFormElement) extraInfoFormElement.style.display = "block";
    })
    .catch((error) => {
      console.error("Hata:", error.code, error.message);
      alert("Google ile giriş hatası oluştu: " + error.message);
    });
}

// Giriş butonuna tıklanıldığında
googleSignInBtnElement?.addEventListener("click", googleSignIn);

// Ek bilgi formu gönderildiğinde
formElement?.addEventListener("submit", (event) => {
  event.preventDefault();

  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");

  const phone = phoneInput?.value || 'Telefon alanı bulunamadı';
  const address = addressInput?.value || 'Adres alanı bulunamadı';

  console.log("Telefon Numarası:", phone);
  console.log("Adres:", address);

  formElement.reset(); // ID'si zaten alındıysa yeniden çağırmaya gerek yok

  alert("Ek Bilgileriniz kaydedildi!");
});

if (!formElement) {
  console.warn("'form' ID'li element bulunamadı.");
}




