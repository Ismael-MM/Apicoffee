const login_btn = document.querySelector(".login-btn");

login_btn.addEventListener("click", login);

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username == "admin" && password == "1234") {
        window.location.href = "./public/main.html";
    }
}