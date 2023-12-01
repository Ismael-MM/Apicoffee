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
separarNumeros(7, [], todasLasSumas);

function limpiarArray(array) {
    const options = [];

    array.forEach(e => {
        let cadena = e.filter(el => el != 0).join(' + ');

        options.push(cadena);
    });

    return options;
}

console.log(limpiarArray(todasLasSumas));
