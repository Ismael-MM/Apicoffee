const tokenDocente = sessionStorage.getItem("token");
let aulas;
let links;
let meta;

irAPaginaPrimera();

/*
async function cogerAulas() {
    try {
        const response = await fetch('/api/v1/modulos?turno=tarde', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDocente}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.data);

        data.data.forEach(data => {
            data.aulas.forEach(aula => {
                aulas.push(aula);
            })
        })
        
    } catch (error) {
        console.error('Error:', error.message);
    }

    console.log(aulas);
}
*/

async function cogerAulas(page) {
    console.log(page);
    try {
        const response = await fetch(`/api/v1/aulas?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDocente}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.data);
        links = data.links;

        console.log(links);

        aulas = data.data;

        console.log(aulas);

        //aulas.sort((a, b) => parseInt(a.nombre) - parseInt(b.nombre));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function crearBarradeBotones() {
    const barraBotones = document.querySelector(".barraBotones");
    let btn_anterior = document.querySelector(".btn-anterior");
    let btn_siguiente = document.querySelector(".btn-siguiente");

    btn_anterior.removeEventListener("click", onBtnClick);
    btn_siguiente.removeEventListener("click", onBtnClick);

    barraBotones.innerHTML = '';

    let urlString = links.last;
    let urlParams = new URLSearchParams(new URL(urlString).search);

    const pageValue = urlParams.get("page");

    for(let i = 0; i < pageValue; i++) {
        let btn = document.createElement("button");
        btn.textContent = i+1;
        btn.classList.add("btn", "btn-primary", "mx-2");
        btn.type = 'button';
        btn.addEventListener("click", () => cargarPagina(i+1))

        barraBotones.appendChild(btn);
    }
}

function crearCardAulas() {
    let row1 = [3, 3, 4];
    let row2 = [4, 3, 3];

    let rowActual = 0;

    let container = document.querySelector(".container");

    container.innerHTML = '';

    let cont = 0;
    let currentRow;

    aulas.forEach(aula => {
        const aulaHTML =
            `
            <div class="col-md-${rowActual == 0 ? row1[cont] : row2[cont]} col-sm-${rowActual == 0 ? row1[cont] : row2[cont]}">
                <div class="card p-0 aula">
                    <div class="card-body">
                        <h5 class="card-title text-white">${aula.nombre}</h5>
                        <button type="button" class="btn btn-more">Ver aula</button>
                    </div>
                </div>
            </div>
        `;

        // Verificar si es necesario crear una nueva fila (ROW)
        if (cont % 3 === 0) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row", "mt-5", "mb-5", "justify-content-center");
            container.appendChild(currentRow);
        }

        // Crear un nuevo elemento de departamento y agregar al HTML
        currentRow.innerHTML += aulaHTML;

        cont++;

        if (cont == 3) {
            cont = 0;
            rowActual++;
        }
    });

    seleccionarAula();
}

async function rellenarPagina(currentPage) {
    try {
        await cogerAulas(currentPage);  // Esperar a que cogerAulas termine

        crearCardAulas(); // Llamar a crearCardAulas después de cogerAulas
        crearBarradeBotones();
        crearBotonesPaginacion(); 
        comprobarBotonesPermisos();
    } catch (error) {
        console.error("Error al rellenar la página:", error);
    }
}

function irAPaginaPrimera() {
    currentPage = 1;
    cargarPagina(currentPage);
}

function cargarPagina(page) {
    currentPage = page;
    rellenarPagina(currentPage);
}

function onBtnClick() {
    let btn_anterior = document.querySelector(".btn-anterior");
    let btn_siguiente = document.querySelector(".btn-siguiente");

    cargarPagina(currentPage + (this === btn_anterior ? -1 : 1));

    btn_anterior.removeEventListener("click", onBtnClick);
    btn_siguiente.removeEventListener("click", onBtnClick);
}

function crearBotonesPaginacion() {
    let btn_anterior = document.querySelector(".btn-anterior");
    let btn_siguiente = document.querySelector(".btn-siguiente");


    if (links.prev) {
        btn_anterior.disabled = false;
        btn_anterior.addEventListener("click", onBtnClick, { once: true });
    } else {
        btn_anterior.disabled = true;
    }

    if (links.next) {
        btn_siguiente.disabled = false;
        btn_siguiente.addEventListener("click", onBtnClick, { once: true });
    } else {
        btn_siguiente.disabled = true;
    }
}

let aulaMañana;
let aulaTarde;

function rellenarInformacionAula(aulaMañana, aulaTarde, nombreAula) {
    let nombre_aula = document.querySelector(".nombre_aula");
    nombre_aula.textContent = nombreAula;
    let modal_informacion = new bootstrap.Modal(document.getElementById('modalAula'));

    let tables = document.querySelectorAll(".table-body");

    tables[0].innerHTML = '';

    aulaMañana.forEach(modulo => {
        let newModulo = document.createElement("tr");
        let nombre_modulo = document.createElement("td");
        let docente_modulo = document.createElement("td");

        nombre_modulo.textContent = modulo.codigo;
        newModulo.appendChild(nombre_modulo);

        if(modulo.user) {
            docente_modulo.textContent = modulo.user.name;
            newModulo.appendChild(docente_modulo);
        }

        tables[0].appendChild(newModulo);
    })

    tables[1].innerHTML = '';

    aulaTarde.forEach(modulo => {
        let newModulo = document.createElement("tr");
        let nombre_modulo = document.createElement("td");
        let docente_modulo = document.createElement("td");

        nombre_modulo.textContent = modulo.codigo;
        newModulo.appendChild(nombre_modulo);
        
        if(modulo.user) {
            docente_modulo.textContent = modulo.user.name;
            newModulo.appendChild(docente_modulo);
        }

        tables[1].appendChild(newModulo);
    })

    let horas_mañana = document.querySelector(".horas_aula_mañana");
    let horas_tarde = document.querySelector(".horas_aula_tarde");
    
    aulaMañana.forEach(aula => {
        aula.aulas.forEach(horas => {
            horas_mañana.textContent = horas.horas_m;
        })
    })

    aulaTarde.forEach(aula => {
        aula.aulas.forEach(horas => {
            horas_tarde.textContent = horas.horas_t;
        })
    })

    console.log(horas_mañana.textContent)
    console.log(horas_tarde.textContent)

    console.log(aulaMañana);
    console.log(aulaTarde);

    modal_informacion.show();

    console.log("TERMINADO");
}

async function seleccionarAula() {
    // Obtener el elemento que se ha pulsado
    const aulas = document.querySelectorAll(".card-body");

    console.log(aulas);

    aulas.forEach(async (aula) => {
        let btn_aula = aula.querySelector(".btn-more");
        let nombre_aula = aula.querySelector(".card-title");

        btn_aula.addEventListener("click", async () => {

            console.log("entra");

            try {
                rellenarInformacionAula(
                    await cogerInformacionAulaMañana(nombre_aula.textContent),
                    await cogerInformacionAulaTarde(nombre_aula.textContent),
                    nombre_aula.textContent
                )
            } catch (error) {
                console.error("Error al rellenar la información del aula:", error);
            }
        })
    })
}

async function cogerInformacionAulaMañana(nombreAula) {
    console.log("COGIENDO AULA MAÑANA")
    const turno = "manana";

    try {
        const response = await fetch(`/api/v1/aulas?aulaId=${nombreAula}&turno=${turno}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDocente}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();

        aulaMañana = data;

        console.log(aulaMañana);

        return aulaMañana;

    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function cogerInformacionAulaTarde(nombreAula) {
    console.log("COGIENDO AULA TARDE")
    const turno = "tarde";

    try {
        const response = await fetch(`/api/v1/aulas?aulaId=${nombreAula}&turno=${turno}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDocente}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();

        aulaTarde = data;

        console.log(aulaTarde);

        return aulaTarde;

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function comprobarBotonesPermisos() {
    const cont_btn = document.querySelector(".cont-btn");

    let btn_anterior = document.querySelector(".btn-anterior");
    let btn_siguiente = document.querySelector(".btn-siguiente");

    function onBtnClick() {
        cargarPagina(currentPage + (this === btn_anterior ? -1 : 1));

        btn_anterior.removeEventListener("click", onBtnClick);
        btn_siguiente.removeEventListener("click", onBtnClick);
    }

    btn_anterior.removeEventListener("click", onBtnClick);
    btn_siguiente.removeEventListener("click", onBtnClick);

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