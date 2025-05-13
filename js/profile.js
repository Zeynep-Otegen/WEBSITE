document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profileImage');
    const imageInput = document.getElementById('imageInput');
    const fullName = document.getElementById('fullName');
    const username = document.getElementById('username');
    const school = document.getElementById('school');
    const universityDepartment = document.getElementById('universityDepartment');
    const imageMenu = document.getElementById('imageMenu');
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const threeDotsBtn = document.querySelector('.three-dots-btn');
    const threeDotsContent = document.querySelector('.three-dots-content');

    // İlk harfleri büyük yapma fonksiyonu
    function capitalizeFirstLetter(string) {
        const words = string.trim().split(/\s+/);
        return words.map(word => {
            if (word.length === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

    // Sadece harf ve boşluk karakterlerine izin verme ve ilk harfleri büyük yapma
    fullName.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^A-Za-zÇçĞğİıÖöŞşÜü\s]/g, '');
        const words = value.split(' ');
        const lastWord = words[words.length - 1];

        if (lastWord) {
            words[words.length - 1] = lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
        }

        for (let i = 0; i < words.length - 1; i++) {
            if (words[i]) {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
            }
        }

        e.target.value = words.join(' ');
    });

    // Üniversite-Bölüm alanını büyük harfe çevirme
    universityDepartment.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });

    // Profil fotoğrafı yazısının görünürlüğünü ayarla
    function updateProfileImageTextVisibility() {
        const profileImageText = document.getElementById('profileImageText');
        if (profileImage.src.includes('default-avatar.png')) {
            profileImageText.style.display = 'flex';
        } else {
            profileImageText.style.display = 'none';
        }
    }

    // Menü seçeneklerini güncelleme fonksiyonu (DOM'u dinamik oluştur)
    function updateMenuOptions() {
        const hasImage = !profileImage.src.includes('default-avatar.png');
        imageMenu.innerHTML = '';
        if (!hasImage) {
            const addBtn = document.createElement('button');
            addBtn.className = 'menu-item';
            addBtn.id = 'addImageBtn';
            addBtn.textContent = 'Fotoğraf Ekle';
            addBtn.onclick = () => {
                imageInput.click();
                imageMenu.classList.remove('show');
            };
            imageMenu.appendChild(addBtn);
        } else {
            const changeBtn = document.createElement('button');
            changeBtn.className = 'menu-item';
            changeBtn.id = 'changeImageBtn';
            changeBtn.textContent = 'Fotoğrafı Değiştir';
            changeBtn.onclick = () => {
                imageInput.click();
                imageMenu.classList.remove('show');
            };
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'menu-item';
            deleteBtn.id = 'deleteImageBtn';
            deleteBtn.textContent = 'Fotoğrafı Sil';
            deleteBtn.onclick = deleteProfileImage;
            imageMenu.appendChild(changeBtn);
            imageMenu.appendChild(deleteBtn);
        }
    }

    // Profil fotoğrafı yükleme
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
                updateMenuOptions();
                updateProfileImageTextVisibility();
                saveProfile();
            };
            reader.readAsDataURL(file);
        }
    });

    // Profil fotoğrafı circle'ına tıklanınca menüyü göster/gizle
    const profileImageCircle = document.querySelector('.profile-image-circle');
    profileImageCircle.addEventListener('click', (e) => {
        e.stopPropagation();
        updateMenuOptions();
        imageMenu.classList.toggle('show');
    });

    // Üç nokta menüsünü aç/kapat
    threeDotsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        threeDotsContent.classList.toggle('show');
        imageMenu.classList.remove('show');
    });

    // Sayfa herhangi bir yerine tıklandığında menüleri kapat
    document.addEventListener('click', () => {
        imageMenu.classList.remove('show');
        threeDotsContent.classList.remove('show');
    });

    // Menü içeriğine tıklandığında event'in yukarı çıkmasını engelle
    imageMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Fotoğraf silindiğinde de yazıyı göster
    function deleteProfileImage() {
        profileImage.src = 'default-avatar.png';
        imageMenu.classList.remove('show');
        updateProfileImageTextVisibility();
        saveProfile();
    }

    // Değişiklikleri kaydet butonuna tıklama
    saveChangesBtn.addEventListener('click', () => {
        saveProfile();
    });

    // Profil bilgilerini kaydetme fonksiyonu
    function saveProfile() {
        const userProfile = {
            fullName: fullName.value.trim(),
            username: username.value.trim(),
            school: school.value.trim(),
            universityDepartment: universityDepartment.value.trim(),
            profileImage: profileImage.src
        };

        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        alert('Profil başarıyla kaydedildi!');
    }

    // Sayfa yüklendiğinde kaydedilmiş profil bilgilerini yükle
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const userProfile = JSON.parse(savedProfile);
        fullName.value = userProfile.fullName || '';
        username.value = userProfile.username || '';
        school.value = userProfile.school || '';
        universityDepartment.value = userProfile.universityDepartment || '';
        if (userProfile.profileImage) {
            profileImage.src = userProfile.profileImage;
        }
    }

    // Sayfa yüklendiğinde menü seçeneklerini ve yazı görünürlüğünü güncelle
    updateMenuOptions();
    updateProfileImageTextVisibility();
});
