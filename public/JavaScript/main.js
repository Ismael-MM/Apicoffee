const ampliarModulos = document.querySelector(".btn-modulo");

ampliarModulos.addEventListener("click", añadirModulo);

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
                    <select class="form-control pricing-row">
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

        const modulosF = document.querySelectorAll(".pricing-column-wrapper");

        modulosF.forEach(e => {
            modulosLocal.push(e);
        });

        console.log(modulosLocal);

        if (localStorage.getItem("Modulos")) {
            const modulosLocalStorage = JSON.parse(localStorage.getItem("Modulos"));

            modulosLocalStorage.push(modulos[numModulos-1]);
    
            localStorage.setItem("Modulos", JSON.stringify(modulosLocalStorage));
        } else {
            localStorage.setItem("Modulos", JSON.stringify(modulosLocal));
        }
    }
}
