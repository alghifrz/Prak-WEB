const form = document.getElementById('form');

function submitForm(id) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputElement = document.querySelectorAll('#' + id + ' input');
        const errorMessage = document.querySelector('#' + id);
        const existingError = errorMessage.querySelector('.error-message');

        if (existingError) {
            existingError.remove();
        }

        let isValid = true;
        if (inputElement[0].type === 'radio') {
            isValid = Array.from(inputElement).some(input => input.checked);
        } else {
            isValid = inputElement[0].value.trim() !== '';
        }

        if (!isValid) {
            const error = document.createElement('div');
            error.classList.add('error-message');
            error.innerHTML = id + ' tidak boleh kosong';
            errorMessage.appendChild(error);
            error.style.color = 'red';
        }
    });
}

submitForm('Nama_lengkap');
submitForm('Password')
submitForm('Gender');
submitForm('Alamat');
