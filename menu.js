
function iniciarJuego() {
    let nombre = prompt("Ingrese su nombre de usuario:");
    if (!nombre) {
        alert("Debe ingresar un nombre válido");
        return;
    }

    // 2️⃣ Pedir cantidad a apostar
    let apuesta = prompt("¿Cuánto desea apostar?");
    apuesta = parseFloat(apuesta);
    if (isNaN(apuesta) || apuesta <= 0) {
        alert("Debe ingresar una cantidad válida");
        return;
    }

    // 3️⃣ Guardar los datos en sessionStorage para pasarlos al juego
    sessionStorage.setItem("nombreUsuario", nombre);
    sessionStorage.setItem("apuestaInicial", apuesta);

    // 4️⃣ Redirigir al juego
    window.location.href = urlJuego;
}

document.getElementById("Xilocgame").addEventListener("click", iniciarJuego);