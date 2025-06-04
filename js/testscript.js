const questions = [
    { text: "İnsan sağlığıyla ilgili konular ilgimi çeker.", category: "Sağlık ve Doğa Bilimleri" },
    { text: "İnsanlara fiziksel olarak yardım etmeyi isterim.", category: "Sağlık ve Doğa Bilimleri" },
    { text: "Biyoloji derslerinde başarılıyımdır.", category: "Sağlık ve Doğa Bilimleri" },
    { text: "Başkalarının sorunlarını dinlemeyi severim.", category: "Sosyal Alan" },
    { text: "Matematikle uğraşmaktan keyif alırım.", category: "Teknik/Sayısal Alan" },
    { text: "Sanatla ilgili kariyerleri ilgi çekici bulurum.", category: "Sanatsal Alan" },
    { text: "Ekonomi, işletme gibi konulara ilgim var.", category: "Yönetim/Girişimcilik" },
    { text: "Problemleri analiz edip çözüm üretmeyi severim.", category: "Teknik/Sayısal Alan" },
    { text: "Rekabet ortamlarında kendimi gösterebilirim.", category: "Yönetim/Girişimcilik" },
    { text: "Kendi işimi kurmak isterim.", category: "Yönetim/Girişimcilik" },
    { text: "Mühendislik ya da teknolojiyle ilgili konular ilgimi çeker.", category: "Teknik/Sayısal Alan" },
    { text: "Özgün fikirler üretmeyi severim.", category: "Sanatsal Alan" },
    { text: "Hayal gücüm kuvvetlidir.", category: "Sanatsal Alan" },
    { text: "Planlama ve organizasyon becerilerim güçlüdür.", category: "Yönetim/Girişimcilik" },
    { text: "Görsel estetiğe önem veririm.", category: "Sanatsal Alan" },
    { text: "Takım çalışmasını bireysel çalışmalara tercih ederim.", category: "Sosyal Alan" },
    { text: "Liderlik yapmayı severim.", category: "Yönetim/Girişimcilik" },
    { text: "Canlılar dünyasını merak ederim.", category: "Sağlık ve Doğa Bilimleri" },
    { text: "Sayısal derslerde başarılıyımdır.", category: "Teknik/Sayısal Alan" },
    { text: "Topluluk önünde konuşmak hoşuma gider.", category: "Sosyal Alan" }
];

// Soruları sayfaya ekle
function createQuestions() {
    const container = document.getElementById('questions');

    questions.forEach((q, i) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionText = document.createElement('p');
        questionText.textContent = `${i + 1}. ${q.text}`;

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        for (let val = 1; val <= 5; val++) {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${i}`;
            radio.value = val;
            radio.required = true;

            const label = document.createElement('label');
            label.textContent = val;

            optionDiv.append(radio, label);
            optionsDiv.appendChild(optionDiv);
        }

        questionDiv.append(questionText, optionsDiv);
        container.appendChild(questionDiv);
    });
}

// Sonuçları hesapla
function calculateResults() {
    const scores = {
        "Sağlık ve Doğa Bilimleri": 0,
        "Sosyal Alan": 0,
        "Teknik/Sayısal Alan": 0,
        "Sanatsal Alan": 0,
        "Yönetim/Girişimcilik": 0
    };

    questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="question${i}"]:checked`);
        if (selected) scores[q.category] += parseInt(selected.value);
    });

    return scores;
}

// Sonuçları göster
function showResults(scores) {
    const resultContainer = document.getElementById('result');
    const scoresDiv = document.getElementById('scores');
    const recommendationDiv = document.getElementById('recommendation');

    scoresDiv.innerHTML = '';
    recommendationDiv.innerHTML = '';

    const careerSuggestions = {
        "Sağlık ve Doğa Bilimleri": ["Biyomedikal Mühendisliği", "Genetik Uzmanı", "Biyokimyager", "Tıbbi Laboratuar Uzmanı"],
        "Sosyal Alan": ["Psikolog", "Öğretmen", "Halkla İlişkiler Uzmanı", "Kişisel Gelişim Uzmanı"],
        "Teknik/Sayısal Alan": ["Mühendislik", "Ekonomist", "Tekniker", "Siber Güvenlik Uzmanı"],
        "Sanatsal Alan": ["Oyuncu", "Mimar", "Editör", "Tasarımcı (Moda, Oyun, Web)"],
        "Yönetim/Girişimcilik": ["Girişimci", "İşletme Yöneticisi", "Lojistik Uzmanı", "CEO"]
    };

    let maxScore = 0;
    let maxCategories = [];

    // Puanları göster ve en yüksekleri bul
    Object.entries(scores).forEach(([category, score]) => {
        const item = document.createElement('div');
        item.className = 'score-item';
        item.textContent = `${category}: ${score} puan`;
        scoresDiv.appendChild(item);

        if (score > maxScore) {
            maxScore = score;
            maxCategories = [category];
        } else if (score === maxScore) {
            maxCategories.push(category);
        }
    });

    const recommendation = document.createElement('div');
    recommendation.className = 'recommendation';

    if (maxCategories.length === 1) {
        const careers = careerSuggestions[maxCategories[0]];
        recommendation.innerHTML = `
            <p>En yüksek puanınız <strong>${maxCategories[0]}</strong> alanında. Bu alanda kendinizi geliştirmenizi ve bu alandaki mesleklere yönelmenizi öneririz.</p>
            <p>Bu alanda örnek meslekler:</p>
            <ul>${careers.map(c => `<li>${c}</li>`).join('')}</ul>
        `;
    } else {
        recommendation.innerHTML = `
            <p>En yüksek puanınız ${maxCategories.join(' ve ')} alanlarında eşit olarak çıktı. Bu alanlarda kendinizi geliştirmenizi ve bu alanlardaki mesleklere yönelmenizi öneririz.</p>
        `;

        maxCategories.forEach(category => {
            const careers = careerSuggestions[category];
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
                <p><strong>${category} alanında örnek meslekler:</strong></p>
                <ul>${careers.map(c => `<li>${c}</li>`).join('')}</ul>
            `;
            recommendation.appendChild(categoryDiv);
        });
    }

    recommendationDiv.appendChild(recommendation);
    resultContainer.style.display = 'block';
}

// Sayfa yüklendiğinde soruları ekle ve temel kontrolleri yap
document.addEventListener('DOMContentLoaded', () => {
    // Gerekli HTML elemanlarının varlığını kontrol et
    const requiredIds = ['testForm', 'questions', 'result', 'scores', 'recommendation'];
    let missing = [];
    requiredIds.forEach(id => {
        if (!document.getElementById(id)) missing.push(id);
    });
    if (missing.length > 0) {
        // Sadece uyarı ver, body'yi değiştirme
        const warning = document.createElement('div');
        warning.style.color = 'red';
        warning.style.fontSize = '20px';
        warning.style.margin = '20px';
        warning.textContent = `Eksik HTML elemanları: ${missing.join(', ')}. Lütfen HTML dosyanızda bu id'lere sahip elemanları ekleyin.`;
        document.body.prepend(warning);
        return;
    }
    createQuestions();

    // Form submit işlemini güvenli hale getir
    const form = document.getElementById('testForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const scores = calculateResults();
            showResults(scores);
        });
    }
});
