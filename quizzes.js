const QUIZ_DATA = {
  group_a: [
    { file: 'quiz_omada_a/1-Ζωτικά Σημεία & Βασική Φροντίδα Ασθενούς.json', icon: '❤️' },
    { file: 'quiz_omada_a/2-Νοσηλευτικές Παρεμβάσεις & Ειδικές Τεχνικές.json', icon: '🏥' },
    { file: 'quiz_omada_a/3-Χορήγηση Φαρμάκων & Φαρμακολογία.json', icon: '💊' },
    { file: 'quiz_omada_a/4-Πρώτες Βοήθειες & Επείγουσα Φροντίδα.json', icon: '🆘' },
    { file: 'quiz_omada_a/5-Λοιμώξεις, Αποστείρωση & Πρόληψη.json', icon: '🛡️' },
    { file: 'quiz_omada_a/6-Ανατομία, Φυσιολογία & Βιολογικές Λειτουργίες.json', icon: '🧬' },
    { file: 'quiz_omada_a/7-Παθολογική & Χειρουργική Νοσηλευτική.json', icon: '🔬' },
    { file: 'quiz_omada_a/8-Νευρολογία, Ψυχιατρική & Μητέρα-Παιδί.json', icon: '🧠' }
  ],
  group_b: [
    { file: 'quiz_omada_b/1-Αποστείρωση & Βασικές Αρχές.json', icon: '🧼' },
    { file: 'quiz_omada_b/2-Μετάγγιση Αίματος & Ομάδες Αίματος.json', icon: '🩸' },
    { file: 'quiz_omada_b/3-Αιμοδοσία & Διαδικασίες Ελέγχου.json', icon: '💉' },
    { file: 'quiz_omada_b/4-Επιπλοκές Μετάγγισης Αίματος.json', icon: '⚠️' },
    { file: 'quiz_omada_b/5-Ορθοπεδική - Παθήσεις & Τραυματισμοί Μαλακών Μορίων.json', icon: '🦴' },
    { file: 'quiz_omada_b/6-Κατάγματα - Τύποι, Κλινική Εικόνα & Επιπλοκές.json', icon: '🚑' },
    { file: 'quiz_omada_b/7-Οργάνωση ΤΕΠ & Διαλογή (Triage).json', icon: '📋' },
    { file: 'quiz_omada_b/8-Επείγουσα Αντιμετώπιση Παθήσεων & Τραυματισμών.json', icon: '🏨' }
  ]
};

async function loadQuizzes() {
  const quizList = document.getElementById('quizList');
  
  const groupASection = document.createElement('div');
  groupASection.className = 'quiz-group-section';
  groupASection.innerHTML = '<h2 class="group-title">Ομάδα Α</h2>';
  
  const groupBSection = document.createElement('div');
  groupBSection.className = 'quiz-group-section';
  groupBSection.innerHTML = '<h2 class="group-title">Ομάδα Β</h2>';
  
  const groupACards = document.createElement('div');
  groupACards.className = 'quiz-cards';
  
  const groupBCards = document.createElement('div');
  groupBCards.className = 'quiz-cards';

  for (const quiz of QUIZ_DATA.group_a) {
    try {
      const response = await fetch(quiz.file);
      const data = await response.json();
      const card = createQuizCard(data, quiz.file, quiz.icon);
      groupACards.appendChild(card);
    } catch (error) {
      console.error(`Error loading ${quiz.file}:`, error);
    }
  }

  for (const quiz of QUIZ_DATA.group_b) {
    try {
      const response = await fetch(quiz.file);
      const data = await response.json();
      const card = createQuizCard(data, quiz.file, quiz.icon);
      groupBCards.appendChild(card);
    } catch (error) {
      console.error(`Error loading ${quiz.file}:`, error);
    }
  }

  groupASection.appendChild(groupACards);
  groupBSection.appendChild(groupBCards);
  
  quizList.appendChild(groupASection);
  quizList.appendChild(groupBSection);
}

function createQuizCard(quizData, filePath, icon) {
  const card = document.createElement('div');
  card.className = 'quiz-card';
  
  const title = quizData.title || 'Κουίζ χωρίς τίτλο';
  const questions = quizData.totalQuestions || quizData.questions?.length || 0;
  
  card.innerHTML = `
    <div class="quiz-card-icon">${icon}</div>
    <h3>${title}</h3>
    <p class="quiz-questions-count">${questions} ερωτήσεις</p>
    <button class="quiz-btn" onclick="startQuiz('${filePath}', '${title.replace(/'/g, "\\'")}')">Έναρξη</button>
  `;
  
  return card;
}

function startQuiz(filePath, title) {
  sessionStorage.setItem('quizFile', filePath);
  sessionStorage.setItem('quizTitle', title);
  window.location.href = 'quiz.html';
}

document.addEventListener('DOMContentLoaded', loadQuizzes);
