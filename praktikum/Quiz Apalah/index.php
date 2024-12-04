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
        <aside class="sidel"></aside>
        <main class="container">
            <h1>Quiz Apalah</h1>
            <p>Selamat Datang di Quiz Apalah. Silahkan klik tombol Mulai Kuis</p>
            <button class="btn">Mulai Kuis</button>
        </main>
        <aside class="sider"></aside>
        <footer class="footer">
            <p>Copyright &copy; 2024 Quiz Apalah by <b>ALGHIF&ZAKY</b> | All rights reserved.</p>
        </footer>
    </section>

    <div id="myModal" class="modal">
        <div class="modal-content">
            <h2>Aturan Quiz</h2>
            <ul>
                <li>Pastikan Anda menjawab setiap pertanyaan.</li>
                <li>Waktu untuk setiap pertanyaan adalah 30 detik.</li>
                <li>Anda dapat kembali ke pertanyaan sebelumnya.</li>
            </ul>
            <div class="buttonPopup">
                <button onclick="modal.style.display = 'none';">Keluar Kuis</button>
                <a href="input.php"><button>Gaskeun</button></a>
            </div>
        </div>
    </div>

    <script>
        const modal = document.getElementById("myModal");
        const startQuizBtn = document.querySelector(".btn");

        startQuizBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
        function showPopup() {
            document.getElementById("popup").style.display = "flex"; 
        }

        function closePopup() {
            document.getElementById("popup").style.display = "none"; 
        }

        function showLoginPopup() {
            document.getElementById("loginPopup").style.display = "flex"; 
        }

        function startQuiz() {
            alert("Lanjut ke Quiz Soal 1");
        }
        function login() {
            const nama = document.getElementById('nama').value;
            const nim = document.getElementById('nim').value;

            if (nama && nim) {
                // Use AJAX or form submission to send data to PHP
                fetch('login.php', {
                    method: 'POST',
                    body: JSON.stringify({nama: nama, nim: nim})
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = 'quiz.php';
                    }
                });
            } else {
                // Show popup for incomplete data
                document.getElementById('popup').style.display = 'block';
            }
        }
    </script>
</body>
</html>