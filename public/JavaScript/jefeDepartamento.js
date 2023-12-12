const tokenDocente = localStorage.getItem("token");
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

    let horasText = document.createElement("h5");
    horasText.classList.add("text-center", "text-white")

    horasText.textContent = horasDocentes.horas;

    let userText = document.createElement("h5");
    userText.classList.add("text-center", "text-white")
    userText.textContent = docente.name;

    nombreUser.classList.add("col-sm-3", "col-md-3", "text-center");
    modulosUser.classList.add("col-sm-7", "col-md-7", "text-center", "justify-content-center");
    distribucionHorasUser.classList.add("col-sm-2", "col-md-2", "text-center");

    docentesModulos.forEach(modulo => {
        let span = document.createElement("span");
        span.textContent = modulo.codigo.toUpperCase();
        span.classList.add("badge", "p-2", "pr-3", "pl-3", "mr-2", "ml-2");
        modulosUser.appendChild(span);
    });

    nombreUser.appendChild(userText);
    user.appendChild(nombreUser);
    user.appendChild(modulosUser);
    distribucionHorasUser.appendChild(horasText);
    user.appendChild(distribucionHorasUser);

    document.querySelector("tbody").appendChild(user);
}