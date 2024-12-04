<?php
session_start();

// Check if result exists
if (!isset($_SESSION['quiz_result'])) {
    header('Location: index.html');
    exit();
}

$result = $_SESSION['quiz_result'];

// Clear the result from session to prevent repeated viewing
unset($_SESSION['quiz_result']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hasil Quiz</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .result-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .result-table th, .result-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        .result-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <section class="parent">
        <header class="header">
            <a href="#" class="logo">Quiz Apalah</a>
        </header>
        <div class="container">
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2 class="quiz-title">Hasil Quiz</h2>
                </div>
                
                <table class="result-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>NIM</th>
                            <th>Nilai</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><?php echo htmlspecialchars($result['nama']); ?></td>
                            <td><?php echo htmlspecialchars($result['nim']); ?></td>
                            <td><?php echo number_format($result['percentage'], 2); ?>%</td>
                        </tr>
                    </tbody>
                </table>

                <div class="button-container">
                    <a href="index.php"><button class="restart-btn">Kembali ke Halaman Utama</button></a>
                </div>
            </div>
        </div>
        <footer class="footer">
            <p>Copyright &copy; 2024 Quiz Apalah | All rights reserved.</p>
        </footer>
    </section>
</body>
</html>