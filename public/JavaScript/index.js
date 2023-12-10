document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password: password })
    })
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            if (data.data.token) {
                console.log('Token received:', data.data.token);
                localStorage.setItem('token', data.data.token);

                window.location.href = `/${data.data.user.rol}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});