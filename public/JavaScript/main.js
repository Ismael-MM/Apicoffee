const ampliarModulos = document.querySelector(".btn-modulo");
const añadirObservacion = document.querySelector(".btn-observacion");
const tokenDocente = sessionStorage.getItem("token");
let docenteSesion;
let modulosDocente;

ampliarModulos.addEventListener("click", añadirModulo);
añadirObservacion.addEventListener("click", añadirObservacionDocente);

mostrarModulos();

async function mostrarModulos() {
    try {
        await datosDocente();
    } catch (error) {
        console.error('Error al obtener datos del docente:', error);
    }
}

async function datosDocente() {
    let nombre_docente = document.querySelector(".nombre_docente");
    let departamento_docente = document.querySelector(".departamento_docente");
    let curso_docente = document.querySelector(".curso_docente");
    let especialidad_docente = document.querySelector(".especialidad_docente");

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

            docenteSesion = data;

            let fechaActual = new Date();
            let mesActual = fechaActual.getMonth() + 1;
            let añoAcademico;

            if (mesActual >= 9) {
                añoAcademico = fechaActual.getFullYear();
            } else {
                añoAcademico = fechaActual.getFullYear() - 1;
            }

            var siguienteAñoAcademico = añoAcademico + 1;

            var fechaCurso = añoAcademico + '/' + (siguienteAñoAcademico.toString().slice(-2));

            curso_docente.textContent = fechaCurso;

            const Docente = {
                nombre: data.name,
                observaciones: "",
                modulos: [],
            }

            localStorage.setItem("Docente", JSON.stringify(Docente));

            cogerDatosModulos();

            console.log("DATOS DOCENTE" + modulosDocente)


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

            console.log(data.data);

            data.data.forEach(docente => {
                console.log(docente);
                if (docenteSesion.id == docente.id) {
                    console.log("entra");
                    nombre_docente.textContent = docente.name;
                    especialidad_docente.textContent = docente.especialidad.nombre;
                    departamento_docente.textContent = docente.departamento.nombre;
                }
            })

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function añadirObservacionDocente() {
    $('#modal').modal('show');
}

function cerrarModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

function guardarObservacion() {
    let observacion = document.getElementById("observacion").value;

    let Docente = JSON.parse(localStorage.getItem("Docente"));

    Docente.observaciones = observacion;

    localStorage.setItem("Docente", JSON.stringify(Docente));

    $('#modal').modal('hide');
}

function añadirModulo() {
    const modulos = document.querySelectorAll(".pricing-column-wrapper");
    let numModulos = modulos.length;

    if (numModulos < 6) {
        let ultModulo = modulos[numModulos - 1];

        let numModulo = numModulos + 1;

        const moduloDiv = document.createElement("div");

        moduloDiv.classList.add("col-sm-3");
        moduloDiv.classList.add("col-md-2");
        moduloDiv.classList.add("pricing-column-wrapper");

        const moduloHTML =
            `
        <div class="pricing-column">
            <div class="pricing-price-row">
                <div class="pricing-price-wrapper">
                    <div class="pricing-price">
                        <div class="pricing-cost">${numModulo}º</div>
                        <div class="time">Modulo</div>
                    </div>
                </div>
            </div>
            <div class="pricing-row-title">
                <div class="pricing_row_title">___</div>
            </div>
            <form action="" class="form">
                <div class="form-group">
                    <input type="text" disabled class="form-control pricing-row turno_docente" placeholder="Elige el turno M/T">
                </div>
                        
                <div class="form-group">
                    <input type="text" disabled class="form-control pricing-row curso_docente" placeholder="Elige el Curso y el Ciclo">
                </div>
                        
                <div class="form-group">
                    <select class="form-control pricing-row select-modulo">
                        <option value="">Seleccione un Modulo</option>
                    </select>
                </div>
                        
                <div class="form-group">
                    <input type="number" disabled class="form-control pricing-row horas_sem" placeholder="Horas Semanales">
                </div>
                        
                <div class="form-group">
                    <select class="form-control pricing-row select-distribucion">
                        <option value="">Seleccione la distribucion</option>
                    </select>
                </div>
    
                <div class="form-group">
                    <input type="text" disabled class="form-control pricing-row aula-modulo"
                    placeholder="Elige el Aula">
                </div>
                        
                <div class="pricing-footer">
                    <div class="gem-button-container gem-button-position-center">
                        <button type="button" class="gem-button gem-green btn-modulo">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
        `;

        moduloDiv.innerHTML = moduloHTML;

        ultModulo.insertAdjacentElement('afterend', moduloDiv);

        console.log(moduloDiv.querySelector(".select-modulo"));

        console.log(modulosDocente);

        rellenarFormulario(modulosDocente);
    }
}

async function cogerDatosModulos() {
    console.log(tokenDocente);

    console.log(docenteSesion);
    console.log(docenteSesion.especialidad_id);

    fetch(`/api/v1/modulos?especialidad=${docenteSesion.especialidad_id}`, {
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
            modulosDocente = data.data;

            rellenarFormulario(modulosDocente);

            comprobarBotonesPermisos();

            rellenarModulosEstablecidos();
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);

            if (error.response) {
                // La respuesta de la API está presente, manejar según sea necesario
                console.error('Respuesta de la API:', error.response);
            }
        });
}

function rellenarFormulario(datosModulos) {
    console.log(datosModulos);

    const modulos = document.querySelectorAll(".pricing-column-wrapper");

    modulos.forEach(moduloForm => {
        rellenarModulosFormulario(moduloForm, datosModulos);
    })

    modulos.forEach(moduloForm => {
        let select = moduloForm.querySelector(".select-modulo");
        let codigo = moduloForm.querySelector(".pricing_row_title");
        let horas_sem = moduloForm.querySelector(".horas_sem");
        let distribucion = moduloForm.querySelector(".select-distribucion");
        let curso = moduloForm.querySelector(".curso_docente");
        let aula = moduloForm.querySelector(".aula-modulo");
        let turno = moduloForm.querySelector(".turno_docente");

        const datosHTML = {
            select: select,
            codigo: codigo,
            horas_sem: horas_sem,
            distribucion: distribucion,
            aula: aula,
            turno: turno,
            curso: curso
        }

        select.addEventListener("change", () => actualizarDatos(datosHTML));
    })
}

function rellenarModulosFormulario(moduloForm, datosModulos) {
    let select = moduloForm.querySelector(".select-modulo");

    if (select.options.length === 1) {
        datosModulos.forEach(datos => {
            let option = document.createElement("option");

            option.value = datos.id;
            option.textContent = datos.materia;

            if (datos.user_id == 0) {
                option.disabled = true;
            }
            
            select.appendChild(option);
        });
    }
}

function actualizarDatos(datosHTML) {
    let materiaSeleccionada = datosHTML.select.value;

    fetch(`/api/v1/modulos/${materiaSeleccionada}`, {
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
            datosHTML.codigo.textContent = data.data.codigo;
            datosHTML.horas_sem.value = data.data.h_semanales;
            datosHTML.turno.value = data.data.curso.turno;
            datosHTML.curso.value = data.data.curso.nombre;

            let aulasModulo;

            data.data.aulas.forEach(aula => {
                aulasModulo = aula.nombre;
            })

            datosHTML.aula.value = aulasModulo;

            let horas_totales = document.querySelector(".horas_totales");

            horas_totales.textContent = sumarHorasTotales();

            let icon = document.querySelector(".icon");

            if (horas_totales.textContent >= 17 && horas_totales.textContent <= 20) {
                if (horas_totales.textContent == 17 || horas_totales.textContent == 20) {
                    icon.innerHTML = '<i class="exclamation bi bi-exclamation-circle-fill"></i>'
                } else {
                    icon.innerHTML = '<i class="check bi bi-check-circle-fill"></i>'
                }
            } else {
                icon.innerHTML = '<i class="bad bi bi-x-circle-fill"></i>'
            }

            while (datosHTML.distribucion.options.length > 1) {
                datosHTML.distribucion.remove(1);
            }

            distribucionHoras(data.data.h_semanales).forEach(e => {
                let option = document.createElement("option");

                option.value = e;
                option.textContent = e;

                datosHTML.distribucion.appendChild(option);
            });

            console.log(data.data);

        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });

}

async function actualizarDatosDocente() {

}

function distribucionHoras(horas_sem) {
    function separarNumeros(numero, actual = [], todasLasSumas = []) {
        if (actual.length === 5) {
            // Cuando ya tenemos tres números, verificamos si su suma es igual al número original
            const sumaActual = actual.reduce((a, b) => a + b, 0);
            if (sumaActual === numero && !existeCombinacion(todasLasSumas, actual)) {
                todasLasSumas.push([...actual]);
            }
            return;
        }

        for (let i = 0; i <= 3; i++) {
            // Llamada recursiva con la nueva opción
            separarNumeros(numero, [...actual, i], todasLasSumas);
        }
    }

    // Función auxiliar para verificar si una combinación ya existe en el array
    function existeCombinacion(array, combinacion) {
        const combinacionOrdenada = combinacion.slice().sort();
        return array.some(e => {
            const arrayOrdenado = e.slice().sort();
            return arrayOrdenado.join('') === combinacionOrdenada.join('');
        });
    }

    const todasLasSumas = [];
    separarNumeros(horas_sem, [], todasLasSumas);

    function limpiarArray(array) {
        const options = [];

        array.forEach(e => {
            let cadena = e.filter(el => el != 0).join(' + ');

            options.push(cadena);
        });

        return options;
    }

    return limpiarArray(todasLasSumas);
}

function sumarHorasTotales() {
    const modulos = document.querySelectorAll(".pricing-column-wrapper");
    let horasTotales = 0;

    modulos.forEach(moduloForm => {
        let horas = moduloForm.querySelector(".horas_sem");

        if (horas.value) {
            horasTotales += parseInt(horas.value);
        }

        console.log(horasTotales);
    });

    return horasTotales;
}

function guardarDatosModulos() {
    const modulos = document.querySelectorAll(".pricing-column-wrapper");

    modulos.forEach(modulo => {
        let btn = modulo.querySelector(".btn-modulo");

        btn.addEventListener("click", () => {
            let materia = modulo.querySelector(".select-modulo");
            let codigo = modulo.querySelector(".pricing_row_title");
            let horas_sem = modulo.querySelector(".horas_sem");
            let distribucion = modulo.querySelector(".select-distribucion");
            let turno = modulo.querySelector(".turno_docente");
            let curso = modulo.querySelector(".curso_docente");
            let aula = modulo.querySelector(".aula-modulo");

            const datosModulo = {
                materia: materia.options[materia.selectedIndex].textContent,
                codigo: codigo.textContent,
                horas_sem: horas_sem.value,
                distribucion: distribucion.options[distribucion.selectedIndex].textContent,
                turno: turno.value,
                curso: curso.value,
                aula: aula.options[aula.selectedIndex].textContent
            }

            let Docente = JSON.parse(localStorage.getItem("Docente"));

            let valido = true;

            Docente.modulos.forEach(modulo => {
                if (datosModulo.codigo == modulo.codigo) {
                    valido = false;
                }
            });

            if (valido) {
                Docente.modulos.push(datosModulo);

                localStorage.setItem("Docente", JSON.stringify(Docente));
            }

        });
    });
}

/* ENVIO DE DATOS AL BACK-END PARA LOS UPDATE */

enviarDatosFormulario();

async function enviarDatosFormulario() {
    const modulos = document.querySelectorAll(".pricing-column-wrapper");

    const btn_guardarTodo = document.querySelector(".btn-guardarTodo");

    btn_guardarTodo.addEventListener("click", () => {
        /* RECORRER CADA MODULO Y OBTENER SUS DATOS */
        modulos.forEach(modulo => {
            getDataModulo(modulo);
        })
    })
}

async function getDataModulo(modulo) {
    let select = modulo.querySelector(".select-modulo");

    const datosHTMLUser = {
        user_id: docenteSesion.id,
        update: 1
    }

    let moduloSeleccionado = await seleccionarModulo(select);

    const formData = new URLSearchParams();

    for (const key in datosHTMLUser) {
        formData.append(key, encodeURIComponent(datosHTMLUser[key]));
    }

    try {
        await fetch(`/api/v1/modulos/${moduloSeleccionado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${tokenDocente}`
            },
            body: formData,
        });

        console.log('Datos actualizados exitosamente');
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
}

cogerDatosParaEnviar();

async function cogerDatosParaEnviar() {
    const modulos = document.querySelectorAll(".pricing-column-wrapper");

    let btn_modulos = document.querySelector(".btn-guardarTodo");

    btn_modulos.addEventListener("click", async () => {
        modulos.forEach(async (modulo) => {
            try {
                let select = modulo.querySelector(".select-modulo");

                const datosHTMLUser = {
                    user_id: docenteSesion.id,
                    update: 1
                }

                let moduloSeleccionado = await seleccionarModulo(select);

                console.log(moduloSeleccionado);

                const formData = new URLSearchParams();

                for (const key in datosHTMLUser) {
                    formData.append(key, encodeURIComponent(datosHTMLUser[key]));
                }

                try {
                    await fetch(`/api/v1/modulos/${moduloSeleccionado.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${tokenDocente}`
                        },
                        body: formData,
                    });

                    console.log('Datos actualizados exitosamente');
                } catch (error) {
                    console.error('Error en la solicitud:', error.message);
                }

            } catch (error) {
                console.error('Error:', error.message);
            }
        })
    });

    modulos.forEach(modulo => {
        let btn_modulo = modulo.querySelector(".btn-modulo");

        btn_modulo.addEventListener("click", async () => {
            try {
                let select = modulo.querySelector(".select-modulo");

                const datosHTMLUser = {
                    user_id: docenteSesion.id,
                    update: 1
                }

                let moduloSeleccionado = await seleccionarModulo(select);

                console.log(moduloSeleccionado);

                const formData = new URLSearchParams();

                for (const key in datosHTMLUser) {
                    formData.append(key, encodeURIComponent(datosHTMLUser[key]));
                }

                try {
                    await fetch(`/api/v1/modulos/${moduloSeleccionado.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${tokenDocente}`
                        },
                        body: formData,
                    });

                    console.log('Datos actualizados exitosamente');
                } catch (error) {
                    console.error('Error en la solicitud:', error.message);
                }

            } catch (error) {
                console.error('Error:', error.message);
            }
        });
    });
}

async function seleccionarModulo(select) {
    try {
        const response = await fetch(`/api/v1/modulos/${select.value}`, {
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
        console.log(data);

        // Utiliza find para encontrar el módulo deseado
        const moduloData = data.data;

        //console.log(moduloData);

        return moduloData;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function rellenarModulosEstablecidos() {
    let modulosUsuario;

    try {
        fetch(`/api/v1/modulos?usuario=${docenteSesion.id}`, {
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
                modulosUsuario = data.data;

                let modulos = document.querySelectorAll(".pricing-column-wrapper");
                let numModulos = modulosUsuario.length;
            
                console.log(numModulos);
            
                if(numModulos > 2) {
                    do {
                        console.log(modulos);

                        dibujarNewModulo(modulos, modulos.length);
                        rellenarFormularioModuloEstablecidos(modulos, modulosUsuario);

                        modulos = document.querySelectorAll(".pricing-column-wrapper");

                        console.log(modulos.length, numModulos)
                    } while (modulos.length != numModulos);
                }

                console.log(modulosUsuario);
            
                rellenarFormularioModuloEstablecidos(modulos, modulosUsuario);
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);

                if (error.response) {
                    console.error('Respuesta de la API:', error.response);
                }
            });
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
}

function rellenarFormularioModuloEstablecidos(modulos, modulosUsuario) {
    for (let i = 0; i < modulos.length; i++) {
        let codigo = modulos[i].querySelector(".pricing_row_title");

        codigo.textContent = modulosUsuario[i].codigo;
    }
}

function dibujarNewModulo(modulos, numModulos) {
    console.log(modulos);
    let ultModulo = modulos[numModulos - 1];

    let numModulo = numModulos + 1;

    const moduloDiv = document.createElement("div");

    moduloDiv.classList.add("col-sm-3");
    moduloDiv.classList.add("col-md-2");
    moduloDiv.classList.add("pricing-column-wrapper");

    const moduloHTML =
        `
    <div class="pricing-column">
        <div class="pricing-price-row">
            <div class="pricing-price-wrapper">
                <div class="pricing-price">
                    <div class="pricing-cost">${numModulo}º</div>
                    <div class="time">Modulo</div>
                </div>
            </div>
        </div>
        <div class="pricing-row-title">
            <div class="pricing_row_title">___</div>
        </div>
        <form action="" class="form">
            <div class="form-group">
                <input type="text" disabled class="form-control pricing-row turno_docente" placeholder="Elige el turno M/T">
            </div>
                    
            <div class="form-group">
                <input type="text" disabled class="form-control pricing-row curso_docente" placeholder="Elige el Curso y el Ciclo">
            </div>
                    
            <div class="form-group">
                <select class="form-control pricing-row select-modulo">
                    <option value="">Seleccione un Modulo</option>
                </select>
            </div>
                    
            <div class="form-group">
                <input type="number" disabled class="form-control pricing-row horas_sem" placeholder="Horas Semanales">
            </div>
                    
            <div class="form-group">
                <select class="form-control pricing-row select-distribucion">
                    <option value="">Seleccione la distribucion</option>
                </select>
            </div>

            <div class="form-group">
                <input type="text" disabled class="form-control pricing-row aula-modulo"
                placeholder="Elige el Aula">
            </div>
                    
            <div class="pricing-footer">
                <div class="gem-button-container gem-button-position-center">
                    <button type="button" class="gem-button gem-green btn-modulo">Guardar</button>
                </div>
            </div>
        </form>
    </div>
    `;

    moduloDiv.innerHTML = moduloHTML;

    console.log(ultModulo);
    console.log(moduloDiv);

    ultModulo.insertAdjacentElement('afterend', moduloDiv);

    console.log(modulosDocente);

    rellenarFormulario(modulosDocente);
}

function comprobarBotonesPermisos() {
    const cont_btn = document.querySelector(".cont-btn");

    cont_btn.innerHTML = '';

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
        if (docenteSesion.rol == "jefatura") {
            cont_btn.appendChild(btnJefatura);
            cont_btn.appendChild(btnDashboard);
        } else if (docenteSesion.rol == "jefedepartamento") {
            cont_btn.appendChild(btnDepartamento);
        }
    } else if (url[url.length - 1] == "aulas" || url[url.length - 1] == "departamentos") {
        cont_btn.appendChild(btnJefatura);
    }
}