let btn_logOut = document.querySelector(".btn-logOut");

btn_logOut.addEventListener("click", logOut);

function logOut() {
    sessionStorage.clear();

    window.location.href = "/";
}