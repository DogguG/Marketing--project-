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

function trangchu(){
    alert('Chao mung ban daden!!!');
    window.location.assign('index.html');
}
// document.addEventListener('DOMContentLoaded', function () {

    // Function to show SweetAlert error message
    function showError(Failed) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: Failed,
        });
    }

    // Function to show SweetAlert success message
    function showSuccess(Success) {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: Success,
        });
    }

    // Function to validate signup form data
    function validateSignupData(username, email, password, confirmPassword) {
        if (!username || !email || !password || !confirmPassword) {
            showError('Please fill in all fields');
            return false;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return false;
        }

        if(email.includes('@gmail.com') === false) {
            showError('Email address is not a valid email address');
            return false;
        }

        // Add additional validation if needed
        if(checkAccount(username,password)){
            showError('Account have existed already');
            return false;
        }

        if (username === adminInfo.username && password === adminInfo.pass){
            showError('Account have existed already');
            return false;
        }
        return true;
    }

    function checkAccount(username,password){
        var list = getUserData();
        for(item of list){
            if (username === item.username && password === item.password){
                return true;
            }
        }
        return false;
    }

    var adminInfo = {
        "username": "admin",
        "pass": "123"
    };
    // adminInfo = getListAdmin() || adminInfo;
    // adminInfo = getListAdmin();
    function getListAdmin() {
        return JSON.parse(window.localStorage.getItem('ListAdmin'));
    }
    
    // function setListAdmin(l) {
    //     window.localStorage.setItem('ListAdmin', JSON.stringify(l));
    // }

function getUserData() {
    var data = JSON.parse(window.localStorage.getItem('userData')) || []
    var l = [];
    for (var d of data) {
        l.push(d);
    }
    return l;
}

function setUserData(l) {
    window.localStorage.setItem('userData', JSON.stringify(l));
}

// function User(user, pass, email) {
// 	this.email = email || '';

// 	this.user = user;
// 	this.pass = pass;
// }
let userData = [];
    // Function to handle signup form submission
    function handleSignup(form_new) {
        const username = form_new.newUser.value;
        const email = form_new.email.value;
        const password = form_new.newPass.value;
        const confirmPassword = form_new.confirmPassword.value;
        const form = document.querySelector('.sign-up-form');

        if (validateSignupData(username, email, password, confirmPassword)) {
    //         var newUser = new User(username, pass, email);
    // // Lấy dữ liệu các khách hàng hiện có
    var userData = getUserData();

    // listUser.push(newUser);
    // setListUser(listUser);
            // Save user data to local storage
            const listUser = {
                username,
                email,
                password
            };
            userData.push(listUser);
            setUserData(userData);

            // Show success message
            showSuccess('Signup successful!');
            // trangchu();
            // Clear the form
            document.querySelector('.sign-up-form').reset();
        }
    }

    // Function to validate login form data
    function validateLoginData(username, password) {
        if (!username || !password) {
            showError('Please fill in all fields');
            return false;
        }

        // Add additional validation if needed

        return true;
    }

    // Function to handle login form submission
    function handleLogin(form) {
        const username = form.user.value;
        const password = form.pass.value;

        if (validateLoginData(username, password)) {
            // Retrieve user data from local storage
            const storedUserData = getUserData();
            // const adminInfo = getListAdmin();
            console.log(adminInfo);

            if (storedUserData) {
                // for(ad of adminInfo){
                    if (username === adminInfo.username && password === adminInfo.pass){
                        alert('Xin chào admin .. ');
                        window.localStorage.setItem('admin', true);
                        window.location.assign('admin-QuanLySanPham.html');
                        return false;
                    }
                // }

                // Check if the entered username and password match the stored data
                for(item of storedUserData){
                    if (username === item.username && password === item.password) {
                    // Show success message
                    showSuccess('Login successful!');
                    trangchu();
                    // Clear the form
                    document.querySelector('.sign-in-form').reset();
                    } else {
                        // Show error message
                        showError('Invalid username or password');
                    }
                }
                
            } else {
                // Show error message
                showError('User does not exist');
            }
        }
    }

    // Event listeners for signup and login form submissions
    const formEL = document.querySelector('.sign-up-form')
    formEL.addEventListener('submit', event => {
        event.preventDefault();

        if (handleSignup()) {
            const formData = new FormData(formEL);
            const data = Object.fromEntries(formData);
            console.log(data);
        }

    });
    // const formEL = document.querySelector('.sign-up-form')
    // let listUser = [];
    // function signUp(event) {
    //     event.preventDefault();
    //     var user = document.querySelector('#user-sign-up').value;
    //     var email = document.querySelector('#email-sign-up').value;
    //     var pass = document.querySelector('#user-sign-up').value;
    //     listUser = [{
    //         user,
    //         email,
    //         pass
    //     }];
    //     localStorage.setItem('user', JSON.stringify(listUser));
    //     console.log('listUser');
    // }

    document.querySelector('.sign-in-form').addEventListener('submit', function (e) {
        e.preventDefault();
        handleLogin();
    });

// });
