<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Apalah - Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <section class="parent">
        <header class="header">
            <a href="#" class="logo">Quiz Apalah</a>
        </header>
        <aside class="sidel"></aside>
        <main class="container">
            <div class="data">
                <h1>Masukkan Data</h1>
                <form id="loginForm" action="quiz.php" method="POST">
                    <div class="inputan">
                        <input type="text" name="nama" id="nama" placeholder="Masukkan Nama" required>
                        <input type="text" name="nim" id="nim" placeholder="Masukkan NIM" required>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>        
        </main>
        <aside class="sider"></aside>
        <footer class="footer">
            <p>Copyright &copy; 2024 Quiz Apalah | All rights reserved.</p>
        </footer>
    </section>

    <div id="popup" class="popup">
        <div class="popup-content">
            <p>Silakan isi semua kolom data.</p>
            <button onclick="closePopup()">OK</button>
        </div>
    </div>

    <script>
        function login(event) {
            // Mencegah form submit default
            event.preventDefault();

            // Ambil nilai input
            const nama = document.getElementById('nama').value;
            const nim = document.getElementById('nim').value;

            // Validasi input
            if (nama.trim() === '' || nim.trim() === '') {
                // Tampilkan popup jika data tidak lengkap
                document.getElementById('popup').style.display = 'flex';
                return;
            }

            // Submit form secara manual
            document.getElementById('loginForm').submit();
        }

        function closePopup() {
            // Tutup popup
            document.getElementById('popup').style.display = 'none';
        }

        // Tambahkan event listener untuk form submission
        document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            loginForm.addEventListener('submit', login);
        });
    </script>
</body>
</html>