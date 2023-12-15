const tokenDocente = sessionStorage.getItem("token");
let jefeDepartamento;
let datosDocentesDepartamento = [];

datos();

async function cogerJefeDepartamento() {
    try {
        const response = await fetch(`/api/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenDocente}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error; // Propagar el error para que sea manejado en la función llamante si es necesario
    }
}

async function datos() {
    try {
        jefeDepartamento = await cogerJefeDepartamento();
        await cogerDatosDocentesDepartamento();
        comprobarBotonesPermisos()
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }

    datosDocentesDepartamento.forEach(docente => {
        cogerDatosModulosDocentes(docente);
    })
}

async function cogerDatosDocentesDepartamento() {
    try {
        console.log(jefeDepartamento);

        const response = await fetch(`/api/v1/usuarios?departamento=${jefeDepartamento.departamento_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenDocente}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        data.data.forEach(docenteDepartamento => {
            datosDocentesDepartamento.push(docenteDepartamento);
        });

    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

}

async function cogerDatosModulosDocentes(docente) {
    let docentesModulos = [];

    const horasDocentes = {
        horas: 0,
        name: docente.name,
        id: docente.id
    }

    fetch(`/api/v1/modulos?usuario=${docente.id}`, {
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
            data.data.forEach(data => {
                docentesModulos.push(data);

                horasDocentes.horas += data.h_semanales;

                console.log(horasDocentes);
            });

            horasDocentes.name = docente.name;
            horasDocentes.id = docente.id;

            crearUser(docente, docentesModulos, horasDocentes);

        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}

function crearUser(docente, docentesModulos, horasDocentes) {
    let user = document.createElement("tr");
    let nombreUser = document.createElement("td");
    let modulosUser = document.createElement("td");
    let distribucionHorasUser = document.createElement("td");
    let valido = document.createElement("td");

    let horasText = document.createElement("h5");
    horasText.classList.add("text-center", "text-white")

    horasText.textContent = horasDocentes.horas;

    let userText = document.createElement("h5");
    userText.classList.add("text-center", "text-white")
    userText.textContent = docente.name;

    nombreUser.classList.add("col-sm-3", "col-md-3", "text-center");
    modulosUser.classList.add("col-sm-5", "col-md-5", "text-center", "justify-content-center");
    distribucionHorasUser.classList.add("col-sm-3", "col-md-3", "text-center");
    valido.classList.add("col-sm-1", "col-md-1", "text-center");

    docentesModulos.forEach(modulo => {
        let span = document.createElement("span");
        span.textContent = modulo.codigo.toUpperCase();
        span.classList.add("badge", "p-2", "pr-3", "pl-3", "mr-2", "ml-2");
        modulosUser.appendChild(span);
    });

    if (horasText.textContent >= 17 && horasText.textContent <= 20) {
        if (horasText.textContent == 17 || horasText.textContent == 20) {
            valido.innerHTML = '<i class="exclamation bi bi-exclamation-circle-fill"></i>'
        } else {
            valido.innerHTML = '<i class="check bi bi-check-circle-fill"></i>'
        }
    } else {
        valido.innerHTML = '<i class="bad bi bi-x-circle-fill"></i>'
    }

    nombreUser.appendChild(userText);
    user.appendChild(nombreUser);
    user.appendChild(modulosUser);
    distribucionHorasUser.appendChild(horasText);
    user.appendChild(distribucionHorasUser);
    user.appendChild(valido);

    document.querySelector("tbody").appendChild(user);
}

function comprobarBotonesPermisos() {
    const cont_btn = document.querySelector(".cont-btn");

    cont_btn.innerHTML = '';
    /*
    <button class="btn btn-primary ml-4 mr-4" type="button">Ver Horario</button>
    <button class="btn btn-secondary" type="button">Ver Departamento</button>
    */
    let btnHorario = document.createElement("button");
    btnHorario.textContent = "Ver Horario";
    btnHorario.classList.add("ml-4", "mr-4", "btn");
    btnHorario.style.backgroundColor = "#2da7dc";
    btnHorario.type = 'button';
    btnHorario.addEventListener("click", () => window.location.href = "/docente");

    let btnJefatura = document.createElement("button");
    btnJefatura.textContent = "Ver Jefatura";
    btnJefatura.classList.add("ml-4", "mr-4", "btn");
    btnJefatura.style.backgroundColor = "#2da7dc";
    btnJefatura.type = 'button';
    btnJefatura.addEventListener("click", () => window.location.href = "/jefatura");

    let btnDepartamento = document.createElement("button");
    btnDepartamento.textContent = "Ver Departamento";
    btnDepartamento.classList.add("ml-4", "mr-4", "btn");
    btnDepartamento.style.backgroundColor = "#2da7dc";
    btnDepartamento.type = 'button';
    btnDepartamento.addEventListener("click", () => window.location.href = "/jefeDepartamento");

    let btnDashboard = document.createElement("button");
    btnDashboard.textContent = "Ver Dashboard";
    btnDashboard.classList.add("ml-4", "mr-4", "btn");
    btnDashboard.style.backgroundColor = "#2da7dc";
    btnDashboard.type = 'button';
    btnDashboard.addEventListener("click", () => window.location.href = "/dashboard");

    let url = window.location.pathname.split('/');

    cont_btn.appendChild(btnHorario);

    if (url[url.length - 1] == "docente") {
        if (jefeDepartamento.rol == "jefatura") {
            cont_btn.appendChild(btnJefatura);
            cont_btn.appendChild(btnDashboard);
        } else if (jefeDepartamento.rol == "jefedepartamento") {
            cont_btn.appendChild(btnDepartamento);
        }
    } else if (url[url.length - 1] == "aulas" || url[url.length - 1] == "departamentos") {
        cont_btn.appendChild(btnJefatura);
    }
}
