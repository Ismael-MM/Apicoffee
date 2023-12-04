const ampliarModulos = document.querySelector(".btn-modulo");
let modulosDocente;

ampliarModulos.addEventListener("click", añadirModulo);

cogerDatosModulos();

function guardarModulos(modulos) {
    modulosDocente = modulos;
}

function añadirModulo() {
    const modulos = document.querySelectorAll(".pricing-column-wrapper");
    let numModulos = modulos.length;

    if(numModulos < 5) {
        let ultModulo = modulos[numModulos-1];

        let numModulo = numModulos+1;
    
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
                    <input type="text" class="form-control pricing-row" placeholder="Elige el turno M/T">
                </div>
                        
                <div class="form-group">
                    <input type="text" class="form-control pricing-row" placeholder="Elige el Curso y el Ciclo">
                </div>
                        
                <div class="form-group">
                    <select class="form-control pricing-row select-modulo">
                        <option value="">Seleccione un Modulo</option>
                    </select>
                </div>
                        
                <div class="form-group">
                    <input type="number" class="form-control pricing-row" placeholder="Horas Semanales">
                </div>
                        
                <div class="form-group">
                    <select class="form-control pricing-row">
                        <option value="">Seleccione la distribucion</option>
                    </select>
                </div>
    
                <div class="form-group">
                    <select class="form-control pricing-row">
                        <option value="">Seleccione el Aula/Taller</option>
                    </select>
                </div>
                        
                <div class="pricing-footer">
                    <div class="gem-button-container gem-button-position-center">
                        <a href="#" class="gem-button gem-green">Order Now</a>
                    </div>
                </div>
            </form>
        </div>
        `;
    
        moduloDiv.innerHTML = moduloHTML;
    
        ultModulo.insertAdjacentElement('afterend', moduloDiv);

        console.log(moduloDiv.querySelector(".select-modulo"));

        console.log(modulosDocente);

        rellenarModulosFormulario(moduloDiv, modulosDocente);

    }
}

async function cogerDatosModulos() {
    const tokenDocente = localStorage.getItem("token");

    console.log(tokenDocente);

    fetch('http://apicoffee.test/api/v1/modulos', {
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
}

function rellenarModulosFormulario(moduloForm, datosModulos) {
    console.log(moduloForm);
    let select = moduloForm.querySelector(".select-modulo");

    datosModulos.forEach(datos => {
        let option = document.createElement("option");

        option.value = datos.materia;
        option.textContent = datos.materia;

        console.log(select, option);
        select.appendChild(option);

        console.log(option);
    })
}