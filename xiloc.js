var dado1 = 0;
var dado2 = 0;
var dado3 = 0;
var novalido = "Jugada no válida, vuelve a tirar";

// Función para tirar los dados con animación
function tirardados() {

    const d1 = document.getElementById("dado_1");
    const d2 = document.getElementById("dado_2");
    const d3 = document.getElementById("dado_3");
    const resultado = document.getElementById("resultado");
    const boton = document.getElementById("Tirar");

    // 🔹 [Inicio de animación]
    boton.disabled = true;
    resultado.innerHTML = "";
    d1.classList.add("girando");
    d2.classList.add("girando");
    d3.classList.add("girando");

    // Cambia el texto rápidamente durante 1 segundo
    const animacion = setInterval(() => {
        d1.innerHTML = ["Ngs", "Rjs", "J", "Q", "K", "A"][Math.floor(Math.random() * 6)];
        d2.innerHTML = ["Ngs", "Rjs", "J", "Q", "K", "A"][Math.floor(Math.random() * 6)];
        d3.innerHTML = ["Ngs", "Rjs", "J", "Q", "K", "A"][Math.floor(Math.random() * 6)];
    }, 100);

    // Después de 1 segundo, se detiene la animación y se calcula el resultado real
    setTimeout(() => {
        clearInterval(animacion);

        d1.classList.remove("girando");
        d2.classList.remove("girando");
        d3.classList.remove("girando");

        // 🔹 [Tu lógica original comienza aquí]
        dado1 = Math.floor(Math.random() * 6) + 1;
        dado2 = Math.floor(Math.random() * 6) + 1;
        dado3 = Math.floor(Math.random() * 6) + 1;

        switch (dado1) {
            case 1: dado1 = "Ngs"; break;
            case 2: dado1 = "Rjs"; break;
            case 3: dado1 = "J"; break;
            case 4: dado1 = "Q"; break;
            case 5: dado1 = "K"; break;
            case 6: dado1 = "A"; break;
        }
        switch (dado2) {
            case 1: dado2 = "Ngs"; break;
            case 2: dado2 = "Rjs"; break;
            case 3: dado2 = "J"; break;
            case 4: dado2 = "Q"; break;
            case 5: dado2 = "K"; break;
            case 6: dado2 = "A"; break;
        }
        switch (dado3) {
            case 1: dado3 = "Ngs"; break;
            case 2: dado3 = "Rjs"; break;
            case 3: dado3 = "J"; break;
            case 4: dado3 = "Q"; break;
            case 5: dado3 = "K"; break;
            case 6: dado3 = "A"; break;
        }

        d1.innerHTML = dado1;
        d2.innerHTML = dado2;
        d3.innerHTML = dado3;

        if (
            (dado1 == "K" && dado2 == "Q" && dado3 == "J") ||
            (dado1 == "K" && dado3 == "Q" && dado2 == "J") ||
            (dado2 == "K" && dado1 == "Q" && dado3 == "J") ||
            (dado2 == "K" && dado3 == "Q" && dado1 == "J") ||
            (dado3 == "K" && dado1 == "Q" && dado2 == "J") ||
            (dado3 == "K" && dado2 == "Q" && dado1 == "J")
        ) {
            resultado.innerHTML = 'Xiloc';
        } else if (dado1 == dado2) {
            resultado.innerHTML = dado3;
        } else if (dado1 == dado3) {
            resultado.innerHTML = dado2;
        } else if (dado2 == dado3) {
            resultado.innerHTML = dado1;
        } else if (
            (dado1 == "A" && dado2 == "Ngs" && dado3 == "Rjs") ||
            (dado1 == "A" && dado3 == "Ngs" && dado2 == "Rjs") ||
            (dado2 == "A" && dado1 == "Ngs" && dado3 == "Rjs") ||
            (dado2 == "A" && dado3 == "Ngs" && dado1 == "Rjs") ||
            (dado3 == "A" && dado1 == "Ngs" && dado2 == "Rjs") ||
            (dado3 == "A" && dado2 == "Ngs" && dado1 == "Rjs")
        ) {
            resultado.innerHTML = "CuLeBrItA";
        } else {
            resultado.innerHTML = novalido;
        }
        boton.disabled = false;
    }, 1000);
}

document.getElementById("Tirar").addEventListener("click", tirardados);