<?php
session_start();

// Cek apakah form sudah disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validasi input
    if (!empty($_POST['nama']) && !empty($_POST['nim'])) {
        // Simpan ke session
        $_SESSION['nama'] = htmlspecialchars($_POST['nama']);
        $_SESSION['nim'] = htmlspecialchars($_POST['nim']);
    } else {
        // Redirect kembali ke halaman login jika data tidak lengkap
        header("Location: index.php");
        exit();
    }
} else {
    // Jika mencoba akses quiz.php tanpa login
    if (!isset($_SESSION['nama']) || !isset($_SESSION['nim'])) {
        header("Location: index.php");
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <section class="parent">
        <header class="header">
            <a href="#" class="logo">Quiz Apalah</a>
        </header>
        <div class="container">
            <div class="quiz-container">
                <div class="student-info">
                    <span class="student-name">Nama: <span id="nama"><?php echo $_SESSION['nama']; ?></span></span>
                    <span class="student-nim">NIM: <span id="nim"><?php echo $_SESSION['nim']; ?></span></span>
                </div>
                <div id="timer">Waktu: 30 detik</div>
                <div id="timer-bar" class="timer-bar">
                    <div id="countdown-bar" class="countdown-bar"></div>
                </div>
                <div class="quiz-header">
                    <h2 class="quiz-title">Quiz Programming</h2>
                    <div class="score">Score: <span id="score">0</span> / 5</div>
                </div>
                <div id="question-text" class="question">
                    <!-- Question will be inserted here -->
                </div>
                
                <div class="options">
                    <div class="option" onclick="selectAnswer(this, 'A')" data-answer="A"></div>
                    <div class="option" onclick="selectAnswer(this, 'B')" data-answer="B"></div>
                    <div class="option" onclick="selectAnswer(this, 'C')" data-answer="C"></div>
                    <div class="option" onclick="selectAnswer(this, 'D')" data-answer="D"></div>
                </div>

                <div class="quiz-footer">
                    <div id="question-counter">1 dari 5 Pertanyaan</div>
                    <div class="button-container">
                        <button id="prev-btn" onclick="prevQuestion()">Previous</button>
                        <button id="next-btn" onclick="nextQuestion()" class="disabled">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <p>Copyright &copy; 2024 Quiz Apalah | All rights reserved.</p>
        </footer>
    </section>
    <script src="scriptquiz.js"></script>
</body>
</html>