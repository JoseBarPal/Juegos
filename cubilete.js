// --- Datos iniciales ---
const nombresDados = ["Ngs","Rjs","J","Q","K","A"];
const valorDados = { "Ngs":1, "Rjs":2, "J":3, "Q":4, "K":5, "A":6 };
const valorJugadas = { "Quintilla":10000000, "Pokar":1000000, "Full":100000, "Tercia":10000, "Dos pares":1000, "Par":100, "Pachuca":0 };

let saldo = 100;
let nombreUsuario = "";
let apuesta = 0;

// --- Solicitar nombre y apuesta al iniciar ---
function iniciarJuego() {
    nombreUsuario = prompt("Ingrese su nombre de usuario:");
    if(!nombreUsuario) {
        alert("Debe ingresar un nombre válido");
        return iniciarJuego();
    }

    apuesta = parseFloat(prompt(`Ingrese su apuesta inicial (saldo disponible: $${saldo}):`));
    if(isNaN(apuesta) || apuesta <= 0 || apuesta > saldo) {
        alert("Apuesta inválida");
        return iniciarJuego();
    }

    document.getElementById("nombreUsuario").textContent = nombreUsuario;
    document.getElementById("saldoActual").textContent = saldo;
    document.getElementById("apuestaActual").textContent = apuesta;
}

// --- Función para tirar 5 dados ---
function tirar5Dados() {
    let dados = [];
    for(let i=0; i<5; i++) {
        dados.push(nombresDados[Math.floor(Math.random()*6)]);
    }
    return dados;
}

// --- Función para calcular jugada y puntaje ---
function calcularJugada(dados) {
    let frecuencia = {};
    for(let dado of dados) frecuencia[dado] = (frecuencia[dado] || 0) + 1;

    let valoresOrdenados = Object.entries(frecuencia).sort((a,b) => {
        if(b[1] !== a[1]) return b[1]-a[1];
        return valorDados[b[0]] - valorDados[a[0]];
    });

    let resultado = "";
    let puntaje = 0;

    if(valoresOrdenados[0][1] === 5) {
        resultado = "Quintilla de " + valoresOrdenados[0][0];
        puntaje = valorJugadas["Quintilla"] + valorDados[valoresOrdenados[0][0]];
    }
    else if(valoresOrdenados[0][1] === 4) {
        resultado = "Pokar de " + valoresOrdenados[0][0];
        puntaje = valorJugadas["Pokar"] + valorDados[valoresOrdenados[0][0]];
    }
    else if(valoresOrdenados[0][1] === 3 && valoresOrdenados[1] && valoresOrdenados[1][1] === 2) {
        resultado = "Full: Tercia de " + valoresOrdenados[0][0] + " y par de " + valoresOrdenados[1][0];
        puntaje = valorJugadas["Full"] + valorDados[valoresOrdenados[0][0]]*10 + valorDados[valoresOrdenados[1][0]];
    }
    else if(valoresOrdenados[0][1] === 3) {
        resultado = "Tercia de " + valoresOrdenados[0][0];
        puntaje = valorJugadas["Tercia"] + valorDados[valoresOrdenados[0][0]];
    }
    else if(valoresOrdenados[0][1] === 2 && valoresOrdenados[1] && valoresOrdenados[1][1] === 2) {
        resultado = "Dos pares: " + valoresOrdenados[0][0] + " y " + valoresOrdenados[1][0];
        puntaje = valorJugadas["Dos pares"] + valorDados[valoresOrdenados[0][0]]*10 + valorDados[valoresOrdenados[1][0]];
    }
    else if(valoresOrdenados[0][1] === 2) {
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

// --- Función principal para jugar contra la máquina ---
function jugarContraMaquina() {
    if(apuesta > saldo) {
        alert("No tienes suficiente saldo para esa apuesta");
        return;
    }

    // Tirada del jugador
    let dadosJugador = tirar5Dados();
    for(let i=0;i<5;i++) document.getElementById("dado_"+(i+1)).textContent = dadosJugador[i];
    let jugadaJugador = calcularJugada(dadosJugador);

    // Tirada de la máquina
    let dadosMaquina = tirar5Dados();
    let jugadaMaquina = calcularJugada(dadosMaquina);

    // Determinar ganador
    let mensaje = "";
    if(jugadaJugador.puntaje > jugadaMaquina.puntaje) {
        mensaje = "¡Ganaste!";
        saldo += apuesta;
    } else if(jugadaJugador.puntaje < jugadaMaquina.puntaje) {
        mensaje = "¡Perdiste!";
        saldo -= apuesta;
    } else {
        mensaje = "Empate";
    }

    // Mostrar resultados
    document.getElementById("resultado").innerHTML =
        `Tu jugada: ${jugadaJugador.nombre} <br>` +
        `Máquina: ${jugadaMaquina.nombre} <br>` +
        `${mensaje}`;

    // Actualizar saldo en pantalla
    document.getElementById("saldoActual").textContent = saldo;
}

// --- Evento del botón ---
document.getElementById("Tirar").addEventListener("click", jugarContraMaquina);
document.getElementById("Apostar").addEventListener("click", iniciarJuego);
