// --- Datos iniciales ---
const nombresDados = ["Ngs","Rjs","J","Q","K","A"];
const valorDados = { "Ngs":1, "Rjs":2, "J":3, "Q":4, "K":5, "A":6 };
const valorJugadas = { 
    "Quintilla":10000000, 
    "Pokar":1000000, 
    "Full":100000, 
    "Tercia":10000, 
    "Dos pares":1000, 
    "Par":100, 
    "Pachuca":0 
};

let saldo = 100;
let apuesta = 0;

// --- Solicitar apuesta al iniciar ---
function iniciarJuego() {
    apuesta = parseFloat(prompt(`Ingrese su apuesta inicial (saldo disponible: $${saldo}):`));
    if (isNaN(apuesta) || apuesta <= 0 || apuesta > saldo) {
        alert("Apuesta inválida");
        return;
    }

    document.getElementById("saldoActual").textContent = saldo;
    document.getElementById("apuestaActual").textContent = apuesta;
    document.getElementById("Tirar").disabled = false;
}

// --- Tirar 5 dados ---
function tirar5Dados() {
    let dados = [];
    for (let i = 0; i < 5; i++) {
        dados.push(nombresDados[Math.floor(Math.random() * 6)]);
    }
    return dados;
}

// --- Calcular jugada ---
function calcularJugada(dados) {
    let frecuencia = {};
    for (let dado of dados) frecuencia[dado] = (frecuencia[dado] || 0) + 1;

    let valoresOrdenados = Object.entries(frecuencia).sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return valorDados[b[0]] - valorDados[a[0]];
    });

    let resultado = "";
    let puntaje = 0;

    if (valoresOrdenados[0][1] === 5) {
        resultado = "Quintilla de " + valoresOrdenados[0][0];
        puntaje = valorJugadas["Quintilla"] + valorDados[valoresOrdenados[0][0]];
    }
    else if (valoresOrdenados[0][1] === 4) {
        resultado = "Pokar de " + valoresOrdenados[0][0];
        puntaje = valorJugadas["Pokar"] + valorDados[valoresOrdenados[0][0]];
    }
    else if (valoresOrdenados[0][1] === 3 && valoresOrdenados[1] && valoresOrdenados[1][1] === 2) {
        resultado = "Full: Tercia de " + valoresOrdenados[0][0] + " y par de " + valoresOrdenados[1][0];
        puntaje = valorJugadas["Full"] + valorDados[valoresOrdenados[0][0]] * 10 + valorDados[valoresOrdenados[1][0]];
    }
    else if (valoresOrdenados[0][1] === 3) {
        resultado = "Tercia de " + valoresOrdenados[0][0];
        puntaje = valorJugadas["Tercia"] + valorDados[valoresOrdenados[0][0]];
    }
    else if (valoresOrdenados[0][1] === 2 && valoresOrdenados[1] && valoresOrdenados[1][1] === 2) {
        resultado = "Dos pares: " + valoresOrdenados[0][0] + " y " + valoresOrdenados[1][0];
        puntaje = valorJugadas["Dos pares"] + valorDados[valoresOrdenados[0][0]] * 10 + valorDados[valoresOrdenados[1][0]];
    }
    else if (valoresOrdenados[0][1] === 2) {
        resultado = "Par de " + valoresOrdenados[0][0];
        puntaje = valorJugadas["Par"] + valorDados[valoresOrdenados[0][0]];
    }
    else {
        resultado = "Pachuca";
        let maxDado = Math.max(...dados.map(d => valorDados[d]));
        puntaje = valorJugadas["Pachuca"] + maxDado;
    }

    return { nombre: resultado, puntaje: puntaje };
}

// --- Función principal con animación ---
function jugarContraMaquina() {
    const boton = document.getElementById("Tirar");

    if (apuesta <= 0) {
        alert("Debes hacer una apuesta antes de jugar.");
        return;
    }
    if (apuesta > saldo) {
        alert("No tienes suficiente saldo.");
        return;
    }

    saldo -= apuesta; // Descontar apuesta al inicio
    boton.disabled = true;

    const dJugador = [
        document.getElementById("dado_1"),
        document.getElementById("dado_2"),
        document.getElementById("dado_3"),
        document.getElementById("dado_4"),
        document.getElementById("dado_5")
    ];

    const dMaquina = [
        document.getElementById("mdado_1"),
        document.getElementById("mdado_2"),
        document.getElementById("mdado_3"),
        document.getElementById("mdado_4"),
        document.getElementById("mdado_5")
    ];

    const resultado = document.getElementById("resultado");

    // 🔹 Limpia mensaje anterior
    resultado.innerHTML = "Tirando los dados... 🎲";

    // 🔹 Animación rápida de cambio de caras
    const animJugador = setInterval(() => {
        dJugador.forEach(dado => {
            dado.textContent = nombresDados[Math.floor(Math.random() * 6)];
            dado.classList.add("girando");
        });
    }, 100);

    const animMaquina = setInterval(() => {
        dMaquina.forEach(dado => {
            dado.textContent = nombresDados[Math.floor(Math.random() * 6)];
            dado.classList.add("girando");
        });
    }, 100);

    // 🔹 Después de 1 segundo, detener animación y mostrar resultados reales
    setTimeout(() => {
        clearInterval(animJugador);
        clearInterval(animMaquina);

        // Eliminar clase de animación
        dJugador.forEach(dado => dado.classList.remove("girando"));
        dMaquina.forEach(dado => dado.classList.remove("girando"));

        // Tirada real
        let dadosJugador = tirar5Dados();
        let dadosMaquina = tirar5Dados();

        // Mostrar resultados reales
        for (let i = 0; i < 5; i++) {
            dJugador[i].textContent = dadosJugador[i];
            dMaquina[i].textContent = dadosMaquina[i];
        }

        // Calcular jugadas
        let jugadaJugador = calcularJugada(dadosJugador);
        let jugadaMaquina = calcularJugada(dadosMaquina);

        // Determinar ganador
        let mensaje = "";
        if (jugadaJugador.puntaje > jugadaMaquina.puntaje) {
            mensaje = "🎉 ¡Ganaste!";
            saldo += apuesta * 2;
        } else if (jugadaJugador.puntaje < jugadaMaquina.puntaje) {
            mensaje = "😢 ¡Perdiste!";
        } else {
            mensaje = "🤝 Empate";
            saldo += apuesta;
        }

        // Mostrar resultado final
        resultado.innerHTML =
            `Tu jugada: ${jugadaJugador.nombre}<br>` +
            `Máquina: ${jugadaMaquina.nombre}<br>` +
            `${mensaje}`;

        // Actualizar saldo
        document.getElementById("saldoActual").textContent = saldo;

        if (saldo <= 0) {
            alert("💀 Te has quedado sin saldo. Fin del juego.");
            boton.disabled = true;
            return;
        }

        // Reiniciar apuesta y reactivar botón
        apuesta = 0;
        document.getElementById("apuestaActual").textContent = "-";
        boton.disabled = false;
    }, 1000);
}

// --- Eventos ---
document.getElementById("Tirar").addEventListener("click", jugarContraMaquina);
document.getElementById("Apostar").addEventListener("click", iniciarJuego);
