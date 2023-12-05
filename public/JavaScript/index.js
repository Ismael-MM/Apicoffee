//const login_btn = document.querySelector(".login-btn");

//login_btn.addEventListener("click", login);

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username == "admin" && password == "1234") {
        window.location.href = "./html/main.html";
    }
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera convencional

    // Obtener los valores de los campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Realizar la solicitud a la API utilizando fetch
    fetch('/api/login', {
        method: 'POST', // O el método que esté configurado en tu API
        headers: {
            'Content-Type': 'application/json'
            // Puedes agregar más encabezados según las necesidades de tu API
        },
        body: JSON.stringify({ email: username, password: password })
    })
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            // Por ejemplo, si hay un campo 'token' en la respuesta, puedes almacenarlo en localStorage
            if (data.data.token) {
                console.log('Token received:', data.data.token);
                localStorage.setItem('token', data.data.token);

                window.location.href = '/docente';
            }


        })
        .catch(error => {
            // Manejar cualquier error que ocurra durante la solicitud
            console.error('Error:', error);
        });
});