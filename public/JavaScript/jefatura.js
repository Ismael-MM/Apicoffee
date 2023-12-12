const tokenDocente = localStorage.getItem("token");

const btn_departamento = document.querySelector(".btn-departamento");
const btn_aula = document.querySelector(".btn-aula");

btn_departamento.addEventListener("click", redirectDepartamento);
btn_aula.addEventListener("click", redirectAula);

function redirectDepartamento() {
    window.location.href = '/jefatura/departamentos';
}

function redirectAula() {
    window.location.href = '/jefatura/aulas';
}