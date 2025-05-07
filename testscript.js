const questions = [
    {
        text: "İnsan sağlığıyla ilgili konular ilgimi çeker.",
        category: "Sağlık ve Doğa Bilimleri"
    },
    {
        text: "İnsanlara fiziksel olarak yardım etmeyi isterim.",
        category: "Sağlık ve Doğa Bilimleri"
    },
    {
        text: "Biyoloji derslerinde başarılıyımdır.",
        category: "Sağlık ve Doğa Bilimleri"
    },
    {
        text: "Başkalarının sorunlarını dinlemeyi severim.",
        category: "Sosyal Alan"
    },
    {
        text: "Matematikle uğraşmaktan keyif alırım.",
        category: "Teknik/Sayısal Alan"
    },
    {
        text: "Sanatla ilgili kariyerleri ilgi çekici bulurum.",
        category: "Sanatsal Alan"
    },
    {
        text: "Ekonomi, işletme gibi konulara ilgim var.",
        category: "Yönetim/Girişimcilik"
    },
    {
        text: "Problemleri analiz edip çözüm üretmeyi severim.",
        category: "Teknik/Sayısal Alan"
    },
    {
        text: "Rekabet ortamlarında kendimi gösterebilirim.",
        category: "Yönetim/Girişimcilik"
    },
    {
        text: "Kendi işimi kurmak isterim.",
        category: "Yönetim/Girişimcilik"
    },
    {
        text: "Mühendislik ya da teknolojiyle ilgili konular ilgimi çeker.",
        category: "Teknik/Sayısal Alan"
    },
    {
        text: "Özgün fikirler üretmeyi severim.",
        category: "Sanatsal Alan"
    },
    {
        text: "Hayal gücüm kuvvetlidir.",
        category: "Sanatsal Alan"
    },
    {
        text: "Planlama ve organizasyon becerilerim güçlüdür.",
        category: "Yönetim/Girişimcilik"
    },
    {
        text: "Görsel estetiğe önem veririm.",
        category: "Sanatsal Alan"
    },
    {
        text: "Takım çalışmasını bireysel çalışmalara tercih ederim.",
        category: "Sosyal Alan"
    },
    {
        text: "Liderlik yapmayı severim.",
        category: "Yönetim/Girişimcilik"
    },
    {
        text: "Canlılar dünyasını merak ederim.",
        category: "Sağlık ve Doğa Bilimleri"
    },
    {
        text: "Sayısal derslerde başarılıyımdır.",
        category: "Teknik/Sayısal Alan"
    },
    {
        text: "Topluluk önünde konuşmak hoşuma gider.",
        category: "Sosyal Alan"
    }
];

// Soruları sayfaya ekle
function createQuestions() {
    const questionsContainer = document.getElementById('questions');
    
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${question.text}`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        for (let i = 1; i <= 5; i++) {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${index}`;
            radio.value = i;
            radio.required = true;
            
            const label = document.createElement('label');
            label.textContent = i;
            
            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        }
        
        questionDiv.appendChild(questionText);
        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
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
    
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            scores[question.category] += parseInt(selectedOption.value);
        }
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
    
    // En yüksek puanı bul
    let maxScore = 0;
    let maxCategories = [];
    
    // Alan bazlı meslek önerileri
    const careerSuggestions = {
        "Sağlık ve Doğa Bilimleri": [
            "Biyomedikal Mühendisliği",
            "Genetik Uzmanı",
            "Biyokimyager",
            "Tıbbi Laboratuar Uzmanı"
        ],
        "Sosyal Alan": [
            "Psikolog",
            "Öğretmen",
            "Halkla İlişkiler Uzmanı",
            "Kişisel Gelişim Uzmanı"
        ],
        "Teknik/Sayısal Alan": [
            "Mühendislik",
            "Ekonomist",
            "Tekniker",
            "Siber Güvenlik Uzmanı"
        ],
        "Sanatsal Alan": [
            "Oyuncu",
            "Mimar",
            "Editör",
            "Tasarımcı (Moda, Oyun, Web)"
        ],
        "Yönetim/Girişimcilik": [
            "Girişimci",
            "İşletme Yöneticisi",
            "Lojistik Uzmanı",
            "CEO"
        ]
    };
    
    for (const [category, score] of Object.entries(scores)) {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.textContent = `${category}: ${score} puan`;
        scoresDiv.appendChild(scoreItem);
        
        if (score > maxScore) {
            maxScore = score;
            maxCategories = [category];
        } else if (score === maxScore) {
            maxCategories.push(category);
        }
    }
    
    // Öneriyi göster
    const recommendation = document.createElement('div');
    recommendation.className = 'recommendation';
    
    if (maxCategories.length === 1) {
        // Tek en yüksek puanlı alan varsa
        const suggestedCareers = careerSuggestions[maxCategories[0]];
        recommendation.innerHTML = `
            <p>En yüksek puanınız ${maxCategories[0]} alanında. Bu alanda kendinizi geliştirmenizi ve bu alandaki mesleklere yönelmenizi öneririz.</p>
            <p>Bu alanda örnek meslekler:</p>
            <ul>
                ${suggestedCareers.map(career => `<li>${career}</li>`).join('')}
            </ul>
        `;
    } else {
        // Birden fazla en yüksek puanlı alan varsa
        recommendation.innerHTML = `
            <p>En yüksek puanınız ${maxCategories.join(' ve ')} alanlarında eşit olarak çıktı. Bu alanlarda kendinizi geliştirmenizi ve bu alanlardaki mesleklere yönelmenizi öneririz.</p>
        `;
        
        maxCategories.forEach(category => {
            const suggestedCareers = careerSuggestions[category];
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
                <p><strong>${category} alanında örnek meslekler:</strong></p>
                <ul>
                    ${suggestedCareers.map(career => `<li>${career}</li>`).join('')}
                </ul>
            `;
            recommendation.appendChild(categoryDiv);
        });
    }
    
    recommendationDiv.appendChild(recommendation);
    resultContainer.style.display = 'block';
}

// Form gönderildiğinde
document.getElementById('testForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const scores = calculateResults();
    showResults(scores);
});

// Sayfa yüklendiğinde soruları oluştur
document.addEventListener('DOMContentLoaded', createQuestions); 