// Get modal elements
const modal = document.getElementById("myModal");
const startQuizBtn = document.querySelector(".btn");

// Add click event listener to the button
startQuizBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


function login() {
    const nama = document.getElementById("nama").value.trim();
    const nim = document.getElementById("nim").value.trim();

    // Periksa apakah input kosong
    if (!nama || !nim) {
        showPopup();
        return;
    }

    // Pastikan sessionStorage menyimpan data dengan benar
    sessionStorage.setItem("nama", nama);
    sessionStorage.setItem("nim", nim);
    console.log(`Nama disimpan: ${nama}, NIM disimpan: ${nim}`); // Debugging

    showLoginPopup();
}



function showPopup() {
    document.getElementById("popup").style.display = "flex"; // Show the validation popup
}

function closePopup() {
    document.getElementById("popup").style.display = "none"; // Close the validation popup
}

function showLoginPopup() {
    document.getElementById("loginPopup").style.display = "flex"; // Show login success popup
}

function startQuiz() {
    // You can redirect to the quiz page or load the quiz content
    alert("Lanjut ke Quiz Soal 1");
    // For example, you can redirect to another HTML page for the quiz
    // window.location.href = "quiz.html"; 
}


