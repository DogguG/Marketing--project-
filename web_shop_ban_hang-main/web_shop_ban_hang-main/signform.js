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