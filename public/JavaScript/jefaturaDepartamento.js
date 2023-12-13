const tokenDocente = localStorage.getItem("token");
let departamentos;

rellenarPagina();

async function cogerDepartamentos() {
    try {
        const response = await fetch('/api/v1/departamentos', {
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

        departamentos = data.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}


function crearCardDepartamentos() {
    let row1 = [3, 3, 4];
    let row2 = [4, 3, 3];

    let rowActual = 0;

    let container = document.querySelector(".container");

    let cont = 0;
    let currentRow;

    departamentos.forEach(departamento => {
        console.log(departamento);

        const departamentoHTML =
            `
            <div class="col-md-${rowActual == 0 ? row1[cont] : row2[cont]} col-sm-${rowActual == 0 ? row1[cont] : row2[cont]}">
                <div class="card p-0 departamento">
                    <div class="card-body">
                        <h5 class="card-title text-white">${departamento.nombre}</h5>
                        <button type="button" class="btn btn-more">Ver departamento</button>
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
        currentRow.innerHTML += departamentoHTML;

        cont++;

        if(cont == 3) {
            cont = 0;
            rowActual++;
        }
    });
}

async function rellenarPagina() {
    try {
        await cogerDepartamentos();  // Esperar a que cogerDepartamentos termine
        crearCardDepartamentos();    // Llamar a crearCardDepartamentos después de cogerDepartamentos
    } catch (error) {
        console.error("Error al rellenar la página:", error);
    }
}

