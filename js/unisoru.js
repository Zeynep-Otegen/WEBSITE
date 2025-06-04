// DOM Elementleri
const loginBtn = document.getElementById('loginBtn')
const registerBtn = document.getElementById('registerBtn')
const loginModal = document.getElementById('loginModal')
const closeLoginModal = document.getElementById('closeLoginModal')
const loginForm = document.getElementById('loginForm')
const quickQuestion = document.getElementById('quickQuestion')
const questionsContainer = document.getElementById('questions')

// Örnek Soru Verileri (Gerçek uygulamada API'den gelecek)
let questions = [
  {
    id: 1,
    title: 'İstanbul Üniversitesi Hukuk Fakültesi hakkında bilgi',
    content: 'İstanbul Üniversitesi Hukuk Fakültesi\'nin eğitim kalitesi ve kampüs olanakları nasıl?',
    university: 'istanbul',
    author: {
      name: 'YKS Öğrencisi',
      avatar: 'https://ui-avatars.com/api/?name=YKS+Öğrencisi&background=random'
    },
    date: '2024-03-20',
    likes: 24,
    answers: [
      {
        author: {
          name: 'Hukuk Öğrencisi',
          avatar: 'https://ui-avatars.com/api/?name=Hukuk+Öğrencisi&background=random'
        },
        content: 'Fakülte çok köklü ve kaliteli bir eğitim sunuyor. Kampüs merkezi konumda ve ulaşımı kolay.',
        date: '2024-03-20',
        likes: 12
      }
    ],
    tags: ['#Hukuk', '#İstanbulÜniversitesi', '#YKS2024']
  },
  {
    id: 2,
    title: 'Ankara Üniversitesi Tıp Fakültesi yurt imkanları',
    content: 'Ankara Üniversitesi Tıp Fakültesi\'ne yerleşmeyi düşünüyorum. Yurt imkanları ve kampüs çevresindeki konaklama seçenekleri hakkında bilgi verebilir misiniz?',
    university: 'ankara',
    author: {
      name: 'Tıp Adayı',
      avatar: 'https://ui-avatars.com/api/?name=Tıp+Adayı&background=random'
    },
    date: '2024-03-19',
    likes: 18,
    answers: [],
    tags: ['#Tıp', '#AnkaraÜniversitesi', '#Yurt']
  }
]

// Modal İşlemleri
function showModal(modal) {
  modal.classList.remove('hidden')
  modal.classList.add('flex')
  document.body.style.overflow = 'hidden'
}

function hideModal(modal) {
  modal.classList.add('hidden')
  modal.classList.remove('flex')
  document.body.style.overflow = 'auto'
}

// Tarih Formatı
function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Bugün'
  } else if (diffDays === 1) {
    return 'Dün'
  } else if (diffDays < 7) {
    return `${diffDays} gün önce`
  } else {
    return date.toLocaleDateString('tr-TR')
  }
}

// Soru Kartı Oluşturma
function createQuestionCard(question) {
  const card = document.createElement('div')
  card.className = 'bg-white rounded-lg shadow-sm p-6 question-card'
  card.innerHTML = `
    <div class="flex items-start space-x-4">
      <img src="${question.author.avatar}" alt="${question.author.name}" class="w-10 h-10 rounded-full">
      <div class="flex-1">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="text-lg font-semibold">${question.title}</h3>
            <p class="text-sm text-gray-500">${question.author.name} • ${formatDate(question.date)}</p>
          </div>
          <button class="text-gray-400 hover:text-pink-600">
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>
        <p class="text-gray-600 mb-4">${question.content}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${question.tags.map(tag => `
            <a href="#" class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-pink-100 hover:text-pink-600">
              ${tag}
            </a>
          `).join('')}
        </div>
        <div class="flex items-center space-x-6 text-gray-500 text-sm">
          <button class="flex items-center space-x-2 hover:text-pink-600">
            <i class="far fa-heart"></i>
            <span>${question.likes}</span>
          </button>
          <button class="flex items-center space-x-2 hover:text-pink-600">
            <i class="far fa-comment"></i>
            <span>${question.answers.length} cevap</span>
          </button>
          <button class="flex items-center space-x-2 hover:text-pink-600">
            <i class="far fa-share-square"></i>
            <span>Paylaş</span>
          </button>
        </div>
        ${question.answers.length > 0 ? `
          <div class="mt-4 border-t pt-4">
            <h4 class="font-medium mb-3">Cevaplar</h4>
            ${question.answers.map(answer => `
              <div class="bg-gray-50 rounded-lg p-4 mb-3">
                <div class="flex items-center space-x-3 mb-2">
                  <img src="${answer.author.avatar}" alt="${answer.author.name}" class="w-8 h-8 rounded-full">
                  <div>
                    <p class="font-medium text-sm">${answer.author.name}</p>
                    <p class="text-xs text-gray-500">${formatDate(answer.date)}</p>
                  </div>
                </div>
                <p class="text-gray-600 text-sm">${answer.content}</p>
                <div class="flex items-center space-x-4 mt-3 text-gray-500 text-sm">
                  <button class="flex items-center space-x-1 hover:text-pink-600">
                    <i class="far fa-heart"></i>
                    <span>${answer.likes}</span>
                  </button>
                  <button class="hover:text-pink-600">Yanıtla</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `
  return card
}

// Soruları Listeleme
function renderQuestions() {
  questionsContainer.innerHTML = ''
  questions.forEach(question => {
    questionsContainer.appendChild(createQuestionCard(question))
  })
}

// Hızlı Soru Sorma
quickQuestion.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && quickQuestion.value.trim()) {
    const newQuestion = {
      id: questions.length + 1,
      title: quickQuestion.value.trim(),
      content: quickQuestion.value.trim(),
      university: 'istanbul', // Varsayılan olarak
      author: {
        name: 'YKS Öğrencisi',
        avatar: 'https://ui-avatars.com/api/?name=YKS+Öğrencisi&background=random'
      },
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      answers: [],
      tags: ['#YKS2024']
    }

    questions.unshift(newQuestion)
    renderQuestions()
    quickQuestion.value = ''
  }
})

// Event Listeners
loginBtn.addEventListener('click', () => showModal(loginModal))
closeLoginModal.addEventListener('click', () => hideModal(loginModal))

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value
  const rememberMe = document.getElementById('rememberMe').checked

  // Burada gerçek bir API çağrısı yapılacak
  console.log('Giriş yapılıyor:', { email, password, rememberMe })
  hideModal(loginModal)
})

// Sayfa yüklendiğinde soruları listele
document.addEventListener('DOMContentLoaded', renderQuestions)

// Modal dışına tıklandığında kapatma
loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    hideModal(loginModal)
  }
})

// Scroll olayını dinle ve header'ı güncelle
let lastScroll = 0
window.addEventListener('scroll', () => {
  const header = document.querySelector('header')
  const currentScroll = window.pageYOffset

  if (currentScroll <= 0) {
    header.classList.remove('shadow-md')
    return
  }

  if (currentScroll > lastScroll) {
    // Aşağı scroll
    header.classList.add('shadow-md')
  } else {
    // Yukarı scroll
    header.classList.remove('shadow-md')
  }

  lastScroll = currentScroll
})