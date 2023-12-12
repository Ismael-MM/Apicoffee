const docentesDepartamento = [];
const tokenDocente = localStorage.getItem("token");
let jefeDepartamento;

rellenarTabla();

async function rellenarTabla() {
    fetch(`/api/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenDocente}`
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Información del user:', data);

            jefeDepartamento = data;
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });

    fetch('/api/v1/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenDocente}`
        },
    })
        .then(response => response.json())
        .then(data => {
            data.data.forEach(docente => {
                console.log(jefeDepartamento);
                if (jefeDepartamento.departamento_id == docente.departamento.id) {
                    cogerDatosModulosDocentes(docente);
                }
            })

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function cogerDatosModulosDocentes(docente) {
    fetch(`/api/v1/modulos`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenDocente}`
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Modulos de un usuario", data.data);
            data.data.forEach(data => {
                if (data.user_id == docente.id) {
                    crearTr(data);
                }
            });

        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}

function crearTr(data) {
    let modulosUserTotal = [data.codigo];

    // Crear elementos y agregarlos a la tabla aquí
    let user = document.createElement("tr");
    let nombreUser = document.createElement("td");
    let modulosUser = document.createElement("td");
    let distribucionHorasUser = document.createElement("td");

    // Configurar el contenido de los elementos
    nombreUser.textContent = docente.name; // Puedes cambiar esto según tus necesidades

    // Configurar el input disabled con la cantidad de horas
    let horasInput = document.createElement("input");
    horasInput.type = "number";
    horasInput.className = "form-control";
    horasInput.disabled = true;
    horasInput.value = docente.horas_total; // Puedes cambiar esto según tus necesidades

    // Agregar clases a los elementos
    nombreUser.classList.add("col-sm-3", "col-md-3", "text-center");
    modulosUser.classList.add("col-sm-6", "col-md-6", "text-center");
    distribucionHorasUser.classList.add("col-sm-3", "col-md-3", "text-center");

    // Agregar elementos al tr
    user.appendChild(nombreUser);

    // Agregar spans al td de módulos
    modulosUserTotal.forEach(modulo => {
        let span = document.createElement("span");
        span.textContent = modulo;
        span.classList.add("badge", "badge-secondary");
        modulosUser.appendChild(span);
    });

    user.appendChild(modulosUser);
    user.appendChild(distribucionHorasUser);

    // Agregar el tr al tbody
    console.log(document.querySelector("tbody"))
    document.querySelector("tbody").appendChild(user);
}