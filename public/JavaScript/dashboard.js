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