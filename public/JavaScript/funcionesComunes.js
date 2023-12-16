let btn_logOut = document.querySelector(".btn-logOut");

btn_logOut.addEventListener("click", logOut);

function logOut() {
    sessionStorage.clear();

    fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .catch(() => {
            mostrarMensajeFlash()
        });

    window.location.href = "/";
}