const docentesModulos = [];
const tokenDocente = localStorage.getItem("token");
let jefeDepartamento;


rellenarTabla();

async function cogerJefeDepartamento() {
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
}

async function cogerModulos() {
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

async function rellenarTabla() {
    cogerJefeDepartamento();

    cogerModulos();
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
                    docentesModulos.push(data); 
                }
            });

            crearUser(docente);

        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}

function crearUser(docente) {
    console.log("entra");

    console.log(docentesModulos)

    let user = document.createElement("tr");
    let nombreUser = document.createElement("td");
    let modulosUser = document.createElement("td");
    let distribucionHorasUser = document.createElement("td");

    nombreUser.textContent = docente.name;

    let horasInput = document.createElement("input");
    horasInput.type = "number";
    horasInput.className = "form-control";
    horasInput.disabled = true;
    horasInput.value = docente.horas_total;

    nombreUser.classList.add("col-sm-3", "col-md-3", "text-center");
    modulosUser.classList.add("col-sm-6", "col-md-6", "text-center");
    distribucionHorasUser.classList.add("col-sm-3", "col-md-3", "text-center");

    user.appendChild(nombreUser);

    docentesModulos.forEach(modulo => {
        let span = document.createElement("span");
        span.textContent = modulo.codigo;
        span.classList.add("badge", "badge-secondary", "p-2");
        modulosUser.appendChild(span);
    });

    user.appendChild(modulosUser);
    user.appendChild(distribucionHorasUser);

    document.querySelector("tbody").appendChild(user);

    console.log(user);
}