<?php
session_start();

// Check if session variables exist
if (!isset($_SESSION['nama']) || !isset($_SESSION['nim'])) {
    echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
    exit();
}

// Receive POST data
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;
$total = isset($_POST['total']) ? intval($_POST['total']) : 0;
$percentage = isset($_POST['percentage']) ? floatval($_POST['percentage']) : 0;

// Store results in session for result page
$_SESSION['quiz_result'] = [
    'nama' => $_SESSION['nama'],
    'nim' => $_SESSION['nim'],
    'score' => $score,
    'total' => $total,
    'percentage' => $percentage
];

echo json_encode(['success' => true]);
exit();
?>