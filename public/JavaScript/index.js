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
                sessionStorage.setItem('token', data.data.token);

                window.location.href = '/docente';
            }
        })
        .catch(() => {
            mostrarMensajeFlash()
        });
});

function mostrarMensajeFlash() {
    // Mostrar el mensaje flash
    var flashMessage = document.getElementById('flash-message');
    flashMessage.style.display = 'block';

    // Agregar la clase 'show' para activar la animación de entrada de Bootstrap
    flashMessage.classList.add('show');

    // Ocultar el mensaje después de 5 segundos
    setTimeout(function() {
      // Quitar la clase 'show' para activar la animación de salida de Bootstrap
      flashMessage.classList.remove('show');

      // Ocultar el mensaje después de completar la animación de salida
      setTimeout(function() {
        flashMessage.style.display = 'none';
      }, 1000); // Duración de la animación de salida de Bootstrap (1.5 segundos)
    }, 3000); // Tiempo antes de comenzar la animación de salida (5 segundos)
  }