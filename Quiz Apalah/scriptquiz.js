// Quiz questions database
const questions = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: [
            "Hyper Type Multi Language",
            "Hyper Text Multiple Language",
            "Hyper Text Markup Language",
            "Home Text Multi Language"
        ],
        correctAnswer: "C"
    },
    {
        question: "CSS adalah singkatan dari?",
        options: [
            "Cascading Style Sheet",
            "Computer Style Sheet",
            "Creative Style System",
            "Color Style Sheet"
        ],
        correctAnswer: "A"
    },
    {
        question: "Apa fungsi utama JavaScript?",
        options: [
            "Styling halaman web",
            "Membuat struktur website",
            "Membuat website interaktif",
            "Membuat database"
        ],
        correctAnswer: "C"
    },
    {
        question: "Tag HTML untuk membuat heading terbesar adalah?",
        options: [
            "<heading>",
            "<h6>",
            "<head>",
            "<h1>"
        ],
        correctAnswer: "D"
    },
    {
        question: "Manakah yang bukan merupakan browser web?",
        options: [
            "Chrome",
            "Firefox",
            "Photoshop",
            "Safari"
        ],
        correctAnswer: "C"
    }
];

let currentQuestion = 0;
let score = 0;
let answeredQuestions = new Set();
let nama = sessionStorage.getItem("nama");
let nim = sessionStorage.getItem("nim");
let timer;
let timeRemaining = 30;

// Initialize the quiz
function initializeQuiz() {
    displayUserInfo(); // Display the user's name and NIM
    displayQuestion();
    updateQuestionCounter();
    updateNavigationButtons();
    startTimer();
}

// Start the timer for each question
function startTimer() {
    // Reset waktu ke 30 detik setiap soal baru
    timeRemaining = 30; 
    updateTimerDisplay(); // Update tampilan waktu
    updateCountdownBar(); // Update bar countdown

    // Mulai countdown dengan interval 1 detik
    timer = setInterval(function() {
        timeRemaining--;  // Kurangi waktu setiap detik
        updateTimerDisplay();  // Update timer di layar
        updateCountdownBar();  // Update countdown bar

        if (timeRemaining <= 0) {
            clearInterval(timer);  // Hentikan timer ketika waktu habis
            nextQuestion();  // Pindah ke soal berikutnya
        }
    }, 1000);  // Update tiap detik
}

// Update waktu yang tampil di layar
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Waktu: ${timeRemaining} detik`;
}

// Update lebar countdown bar sesuai dengan waktu yang tersisa
function updateCountdownBar() {
    const countdownBar = document.getElementById('countdown-bar');
    const percentage = (timeRemaining / 30) * 100;  // Hitung persentase waktu tersisa
    countdownBar.style.width = `${percentage}%`;  // Ubah lebar bar sesuai persentase
}


// Display the user's name and NIM
function displayUserInfo() {
    const nama = sessionStorage.getItem("nama");
    const nim = sessionStorage.getItem("nim");

    const namaElement = document.getElementById("nama");
    const nimElement = document.getElementById("nim");

    if (nama && nim && namaElement && nimElement) {
        namaElement.textContent = nama;
        nimElement.textContent = nim;
    } else {
        console.log("Element tidak ditemukan atau data tidak ada.");
    }
}





// Display current question
function displayQuestion() {
    const questionText = document.getElementById('question-text');
    const options = document.querySelectorAll('.option');
    const currentQ = questions[currentQuestion];

    questionText.textContent = `${currentQuestion + 1}. ${currentQ.question}`;
    
    options.forEach((option, index) => {
        option.textContent = `${String.fromCharCode(65 + index)}. ${currentQ.options[index]}`;
        option.classList.remove('selected', 'correct', 'wrong');
        
        if (answeredQuestions.has(currentQuestion)) {
            const correctAnswer = currentQ.correctAnswer;
            const optionLetter = String.fromCharCode(65 + index);
            
            if (optionLetter === correctAnswer) {
                option.classList.add('correct');
            } else if (option.classList.contains('selected')) {
                option.classList.add('wrong');
            }
        }
    });

    updateNavigationButtons();
}

// Handle answer selection
function selectAnswer(element, answer) {
    // Prevent selecting if already answered
    if (answeredQuestions.has(currentQuestion)) {
        return;
    }

    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    element.classList.add('selected');
    
    checkAnswer(element, answer);
    answeredQuestions.add(currentQuestion);
    
    updateNavigationButtons();
}

// Check if answer is correct
function checkAnswer(element, answer) {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    
    if (answer === correctAnswer) {
        element.classList.add('correct');
        if (!answeredQuestions.has(currentQuestion)) {
            score++;
            document.getElementById('score').textContent = score;
        }
    } else {
        element.classList.add('wrong');
        // Show correct answer
        document.querySelectorAll('.option').forEach(option => {
            if (option.getAttribute('data-answer') === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }
}

// Navigation functions
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateQuestionCounter();
        // startTimer();  // Restart the timer for the next question
        clearInterval(timer);  // Pastikan timer berhenti sebelum soal berikutnya dimulai

    // Reset countdown bar tanpa transisi
        const countdownBar = document.getElementById('countdown-bar');
        countdownBar.classList.add('no-transition');  // Nonaktifkan transisi
        countdownBar.style.width = '100%';  // Reset ke 100%

        // Setelah 0.2 detik, aktifkan kembali transisi dan mulai soal baru
        setTimeout(function() {
            countdownBar.classList.remove('no-transition');  // Aktifkan kembali transisi
            initializeQuiz();  // Reset soal dan timer untuk soal berikutnya
        }, 200);
    } else if (currentQuestion === questions.length - 1 && answeredQuestions.size === questions.length) {
        showFinalScore();
    }
}
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateQuestionCounter();
    }
}

// Update UI elements
function updateQuestionCounter() {
    const counter = document.getElementById('question-counter');
    counter.textContent = `${currentQuestion + 1} dari ${questions.length} Pertanyaan`;
}

function updateNavigationButtons() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    prevBtn.style.display = currentQuestion === 0 ? 'none' : 'block';
    
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = answeredQuestions.has(currentQuestion) ? 'Finish' : 'Next';
    } else {
        nextBtn.textContent = 'Next';
    }
    
    nextBtn.classList.toggle('disabled', !answeredQuestions.has(currentQuestion));
}

// Show final score
function showFinalScore() {
    const quizContainer = document.querySelector('.quiz-container');
    const percentage = (score / questions.length) * 100;
    
    quizContainer.innerHTML = `
        <div class="quiz-header">
            <h2 class="quiz-title">Quiz Selesai!</h2>
            <div class="score">Score: ${score} / ${questions.length}</div>
        </div>
        <div class="final-message">
            <p>Anda menjawab ${score} dari ${questions.length} pertanyaan dengan benar.</p>
            <p>Persentase keberhasilan: ${percentage}%</p>
            <p>${getFinalMessage(percentage)}</p>
        </div>
        <a href="index.html"><button class="restart-btn">Kembali ke Halaman Utama</button></a>
    `;
}

// Get message based on score
function getFinalMessage(percentage) {
    if (percentage === 100) return "Sempurna! Anda menguasai semua materi dengan sangat baik!";
    if (percentage >= 80) return "Sangat bagus! Anda memiliki pemahaman yang kuat!";
    if (percentage >= 60) return "Bagus! Terus tingkatkan pemahaman Anda.";
    if (percentage >= 40) return "Cukup baik. Mari belajar lebih giat lagi!";
    return "Jangan menyerah! Cobalah untuk belajar dan mencoba lagi.";
}

// Restart quiz



// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initializeQuiz);