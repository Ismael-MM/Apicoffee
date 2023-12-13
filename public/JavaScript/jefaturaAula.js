const tokenDocente = localStorage.getItem("token");
let aulas = [];

rellenarPagina();

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

async function cogerAulas() {
    try {
        const response = await fetch('/api/v1/aulas', {
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

        aulas = data.data;

        /*
        data.data.forEach(data => {
            data.aulas.forEach(aula => {
                aulas.push(aula);
            })
        })
        */
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function crearCardAulas() {
    let row1 = [3, 3, 4];
    let row2 = [4, 3, 3];

    let rowActual = 0;

    let container = document.querySelector(".container");

    let cont = 0;
    let currentRow;

    aulas.forEach(aula => {
        console.log(aula);

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

        if(cont == 3) {
            cont = 0;
            rowActual++;
        }
    });
}

async function rellenarPagina() {
    try {
        await cogerAulas();  // Esperar a que cogerDepartamentos termine
        crearCardAulas();    // Llamar a crearCardDepartamentos después de cogerDepartamentos
    } catch (error) {
        console.error("Error al rellenar la página:", error);
    }
}