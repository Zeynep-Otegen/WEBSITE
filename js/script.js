// Firebase yapılandırması
const firebaseConfig = { 
  apiKey: "AIzaSyATMAiIlVvZ49lFp8hcJc60AXPFQujxUzw",
  authDomain: "yksgirissistemi.firebaseapp.com",
  projectId: "yksgirissistemi",
  storageBucket: "yksgirissistemi.appspot.com",
  messagingSenderId: "718115875246",
  appId: "1:718115875246:web:1565c90a88647f7ffbc03f",
  measurementId: "G-9PTPZBZNEE"
};

// Firebase başlatma
firebase.initializeApp(firebaseConfig);

// Google ile giriş fonksiyonu
function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      alert("Giriş Başarılı! Kullanıcı: " + result.user.displayName);
    })
    .catch((error) => {
      console.error("Hata:", error);
      alert("Hata oluştu: " + error.message);
    });
}

// Butona tıklama olayını ekleme
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("googleSignInBtn").addEventListener("click", googleSignIn);
});




