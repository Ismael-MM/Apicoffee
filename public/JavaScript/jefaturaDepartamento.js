const tokenDocente = localStorage.getItem("token");
const departamentos = [];

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

        departamentos.push(data.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}


function crearCardDepartamentos() {
    let row1 = [3, 3, 4];
    let row2 = [4, 3, 3];

    departamentos.forEach(departamento => {

        const departamentoHTML =
        `
        <div class="col-md-3 col-sm-3">
            <div class="card p-0 departamento">
                <div class="card-body">
                    <h5 class="card-title text-white">Departamento 1</h5>
                    <button type="button" class="btn btn-more">Ver departamento</button>
                </div>
            </div>
        </div>
        `


        let div1 = document.createElement("div");
        div1.classList.add("col-md-3", "col-sm-3");
        let div2 = document.createElement("div");
        div2.classList.add("card", "p-0", "departamento");
        let div3 = document.createElement("div");
        div3.classList.add("card-body");

        let h5 = document.createElement("h5");
        h5.classList.add("card-title text-white");
        h5.textContent = departamento.nombre;

        let button = document.createElement("button");
        button.classList.add("btn btn-more");
        button.type = "button";
        button.textContent = "Ver departamento";
    })
}

function rellenarPagina() {
    cogerDepartamentos();
    crearCardDepartamentos();
}

