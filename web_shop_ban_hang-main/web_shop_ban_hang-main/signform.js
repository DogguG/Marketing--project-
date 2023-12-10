const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});

document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.querySelector('input[type="password"]');
    const eyeIcon = document.querySelector('.input-field .fa-eye');
    const eyeSlashIcon = document.querySelector('.input-field .fa-eye-slash');

    eyeIcon.addEventListener('click', function () {
        passwordInput.type = 'text';
        eyeIcon.style.display = 'none';
        eyeSlashIcon.style.display = 'block';
        passwordInput.parentElement.classList.add('password-visible');
    });

    eyeSlashIcon.addEventListener('click', function () {
        passwordInput.type = 'password';
        eyeIcon.style.display = 'block';
        eyeSlashIcon.style.display = 'none';
        passwordInput.parentElement.classList.remove('password-visible');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const toggleConfirmPasswordIcons = document.querySelectorAll('.toggle-confirm-password');

    function togglePasswordVisibility(passwordInput, eyeIcon, eyeSlashIcon) {
        const inputType = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = inputType;
        eyeIcon.style.display = inputType === 'password' ? 'block' : 'none';
        eyeSlashIcon.style.display = inputType === 'password' ? 'none' : 'block';
        passwordInput.parentElement.classList.toggle('password-visible');
    }

    togglePasswordIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            const passwordInput = icon.parentElement.querySelector('.password-input');
            const eyeIcon = icon.parentElement.querySelector('.fa-eye');
            const eyeSlashIcon = icon.parentElement.querySelector('.fa-eye-slash');
            togglePasswordVisibility(passwordInput, eyeIcon, eyeSlashIcon);
        });
    });

    toggleConfirmPasswordIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            const confirmPasswordInput = icon.parentElement.querySelector('.confirm-password-input');
            const eyeIcon = icon.parentElement.querySelector('.fa-eye');
            const eyeSlashIcon = icon.parentElement.querySelector('.fa-eye-slash');
            togglePasswordVisibility(confirmPasswordInput, eyeIcon, eyeSlashIcon);
        });
    });
});


// document.addEventListener('DOMContentLoaded', function () {

//     // Function to show SweetAlert error message
//     function showError(message) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: message,
//         });
//     }

//     // Function to show SweetAlert success message
//     function showSuccess(message) {
//         Swal.fire({
//             icon: 'success',
//             title: 'Success!',
//             text: message,
//         });
//     }

//     // Function to validate signup form data
//     function validateSignupData(username, email, password, confirmPassword) {
//         if (!username || !email || !password || !confirmPassword) {
//             showError('Please fill in all fields');
//             return false;
//         }

//         if (password !== confirmPassword) {
//             showError('Passwords do not match');
//             return false;
//         }

//         // Add additional validation if needed

//         return true;
//     }

//     // Function to handle signup form submission
//     function handleSignup() {
//         const username = document.querySelector('.sign-up-form .input-field:nth-child(1) input').value;
//         const email = document.querySelector('.sign-up-form .input-field:nth-child(2) input').value;
//         const password = document.querySelector('.sign-up-form .input-field:nth-child(3) input').value;
//         const confirmPassword = document.querySelector('.sign-up-form .input-field:nth-child(4) input').value;

//         if (validateSignupData(username, email, password, confirmPassword)) {
//             // Save user data to local storage
//             const userData = { username, email, password };
//             localStorage.setItem('userData', JSON.stringify(userData));

//             // Show success message
//             showSuccess('Signup successful!');

//             // Clear the form
//             document.querySelector('.sign-up-form').reset();
//         }
//     }

//     // Function to validate login form data
//     function validateLoginData(username, password) {
//         if (!username || !password) {
//             showError('Please fill in all fields');
//             return false;
//         }

//         // Add additional validation if needed

//         return true;
//     }

//     // Function to handle login form submission
//     function handleLogin() {
//         const username = document.querySelector('.sign-in-form .input-field:nth-child(1) input').value;
//         const password = document.querySelector('.sign-in-form .input-field:nth-child(2) input').value;

//         if (validateLoginData(username, password)) {
//             // Retrieve user data from local storage
//             const storedUserData = localStorage.getItem('userData');

//             if (storedUserData) {
//                 const userData = JSON.parse(storedUserData);

//                 // Check if the entered username and password match the stored data
//                 if (username === userData.username && password === userData.password) {
//                     // Show success message
//                     showSuccess('Login successful!');

//                     // Clear the form
//                     document.querySelector('.sign-in-form').reset();
//                 } else {
//                     // Show error message
//                     showError('Invalid username or password');
//                 }
//             } else {
//                 // Show error message
//                 showError('User does not exist');
//             }
//         }
//     }

//     // Event listeners for signup and login form submissions
//     document.querySelector('.sign-up-form').addEventListener('submit', function (e) {
//         e.preventDefault();
//         handleSignup();
//     });

//     document.querySelector('.sign-in-form').addEventListener('submit', function (e) {
//         e.preventDefault();
//         handleLogin();
//     });

// });