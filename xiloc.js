//Dados del jugador
let dado1 = 0, dado2 = 0, dado3 = 0;
//Dados del CPU
let mdado1=0, mdado2=0, mdado3=0;
//Interfaz del jugador
let bet=0, saldo=100;
//Valores de las jugadas
let jugadas={"CuLeBrItA":1,"A":2,"Ngs":3,"Rjs":4,"J":5,"Q":6,"K":7,"Xiloc":8};
let novalido = "Jugada no válida, vuelve a tirar";
//Variables para calcular las jugadas
let jugada=0, mjugada=0;

document.getElementById("saldoActual").innerHTML=saldo;

//Función para definir la apuesta
function apuesta(){
    bet=Number(prompt("Cuanto deseas apostar"));
    if((saldo-bet)<0){
        alert("No tienes suficiente saldo");
        bet=0;
    } else {
        saldo=(saldo-bet);
        document.getElementById("saldoActual").innerHTML=saldo;
        document.getElementById("apuestaActual").innerHTML=bet;
    }    
}
    
// Función para tirar los dados con animación
function tirardados() {

    if(bet==0){
        alert("No has apostado, aún no puedes jugar")
    } else{

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
            jugada='Xiloc';
            boton.disabled = true;
        } else if (dado1 == dado2) {
            resultado.innerHTML = dado3;
            jugada=dado3;
            boton.disabled = true;
        } else if (dado1 == dado3) {
            resultado.innerHTML = dado2;
            jugada=dado2;
            boton.disabled = true;
        } else if (dado2 == dado3) {
            resultado.innerHTML = dado1;
            jugada=dado1;
            boton.disabled = true;
        } else if (
            (dado1 == "A" && dado2 == "Ngs" && dado3 == "Rjs") ||
            (dado1 == "A" && dado3 == "Ngs" && dado2 == "Rjs") ||
            (dado2 == "A" && dado1 == "Ngs" && dado3 == "Rjs") ||
            (dado2 == "A" && dado3 == "Ngs" && dado1 == "Rjs") ||
            (dado3 == "A" && dado1 == "Ngs" && dado2 == "Rjs") ||
            (dado3 == "A" && dado2 == "Ngs" && dado1 == "Rjs")
        ) {
            resultado.innerHTML = "CuLeBrItA";
            jugada="CuLeBrItA";
            boton.disabled = true;
        } else {
            resultado.innerHTML = novalido;
            jugada=0;
            boton.disabled=false;
        }
    }, 1000);
    }

    boton.disabled=true;

}

//Funcion para el tiro del CPU
function mtirardados() {    
    if (jugada == 0) {
        alert("Tu jugada no es válida, vuelve a tirar para poder seguir con el juego");
        return;
    }

    const md1 = document.getElementById("mdado_1");
    const md2 = document.getElementById("mdado_2");
    const md3 = document.getElementById("mdado_3");
    const mresultado = document.getElementById("mresultado");
    const mboton = document.getElementById("mTirar");

    mboton.disabled = true;
    mresultado.innerHTML = "";
    md1.classList.add("girando");
    md2.classList.add("girando");
    md3.classList.add("girando");

    // 🔁 Esta función realiza un tiro de CPU y se repite hasta obtener jugada válida
    function tirarCPU() {
        // Animación rápida
        const manimacion = setInterval(() => {
            md1.innerHTML = ["Ngs", "Rjs", "J", "Q", "K", "A"][Math.floor(Math.random() * 6)];
            md2.innerHTML = ["Ngs", "Rjs", "J", "Q", "K", "A"][Math.floor(Math.random() * 6)];
            md3.innerHTML = ["Ngs", "Rjs", "J", "Q", "K", "A"][Math.floor(Math.random() * 6)];
        }, 100);

        // Detener animación después de 1 segundo y calcular el resultado real
        setTimeout(() => {
            clearInterval(manimacion);

            md1.classList.remove("girando");
            md2.classList.remove("girando");
            md3.classList.remove("girando");

            const caras = ["Ngs", "Rjs", "J", "Q", "K", "A"];
            mdado1 = caras[Math.floor(Math.random() * 6)];
            mdado2 = caras[Math.floor(Math.random() * 6)];
            mdado3 = caras[Math.floor(Math.random() * 6)];

            md1.innerHTML = mdado1;
            md2.innerHTML = mdado2;
            md3.innerHTML = mdado3;

            // Evaluar jugada
            if (
                (mdado1 == "K" && mdado2 == "Q" && mdado3 == "J") ||
                (mdado1 == "K" && mdado3 == "Q" && mdado2 == "J") ||
                (mdado2 == "K" && mdado1 == "Q" && mdado3 == "J") ||
                (mdado2 == "K" && mdado3 == "Q" && mdado1 == "J") ||
                (mdado3 == "K" && mdado1 == "Q" && mdado2 == "J") ||
                (mdado3 == "K" && mdado2 == "Q" && mdado1 == "J")
            ) {
                mresultado.innerHTML = "Xiloc";
                mjugada = "Xiloc";
                mboton.disabled = true;
            } else if (mdado1 == mdado2) {
                mresultado.innerHTML = mdado3;
                mjugada = mdado3;
                mboton.disabled = true;
            } else if (mdado1 == mdado3) {
                mresultado.innerHTML = mdado2;
                mjugada = mdado2;
                mboton.disabled = true;
            } else if (mdado2 == mdado3) {
                mresultado.innerHTML = mdado1;
                mjugada = mdado1;
                mboton.disabled = true;
            } else if (
                (mdado1 == "A" && mdado2 == "Ngs" && mdado3 == "Rjs") ||
                (mdado1 == "A" && mdado3 == "Ngs" && mdado2 == "Rjs") ||
                (mdado2 == "A" && mdado1 == "Ngs" && mdado3 == "Rjs") ||
                (mdado2 == "A" && mdado3 == "Ngs" && mdado1 == "Rjs") ||
                (mdado3 == "A" && mdado1 == "Ngs" && mdado2 == "Rjs") ||
                (mdado3 == "A" && mdado2 == "Ngs" && mdado1 == "Rjs")
            ) {
                mresultado.innerHTML = "CuLeBrItA";
                mjugada = "CuLeBrItA";
                mboton.disabled = true;
            } else {
                // Jugada no válida: intentar de nuevo después de 1 segundo
                mresultado.innerHTML = "Jugada no válida... tirando otra vez 🤖";
                mjugada = 0;
                mboton.disabled=true;
                setTimeout(() => {
                    md1.classList.add("girando");
                    md2.classList.add("girando");
                    md3.classList.add("girando");
                    tirarCPU(); // 🔁 vuelve a intentar
                }, 1000);
                return;
            }

            // Si llega aquí, jugada válida
            mboton.disabled = true;
        }, 1000);
    }

    // Iniciar el primer tiro
    tirarCPU();
    mboton.disabled=false
    
}
    
function reinicio() {
    const boton = document.getElementById("Tirar");
    const mboton = document.getElementById("mTirar");
    const resultado = document.getElementById("resultado");
    const mresultado = document.getElementById("mresultado");

    // 🔹 Primero, determinar ganador antes de reiniciar valores
    if (jugada && mjugada) {
        const valorJugador = jugadas[jugada];
        const valorCPU = jugadas[mjugada];

        if (valorJugador > valorCPU) {
            if(valorJugador==8)
            {
                alert('Xiloc!!');
                saldo+=bet*3
            } else{
                alert("🎉 ¡Ganaste la ronda!");
                saldo += bet * 2;
                }
            } else {
            alert("😢 Perdiste la ronda");
            // saldo no cambia (ya se descontó la apuesta)
        }

        // Actualizar saldo visual
        document.getElementById("saldoActual").innerHTML = saldo;
    }

    // 🔹 Limpiar tablero y reactivar botones
    resultado.innerHTML = "";
    mresultado.innerHTML = "";
    boton.disabled = false;
    mboton.disabled = false;

    // 🔹 Reset de variables
    jugada = 0;
    mjugada = 0;
    bet = 0;
    document.getElementById("apuestaActual").innerHTML = bet;
}


/*
2. Una vez que la máquina tira, desactiva ambos botones, a menos que
piques un nuevo botón con el cúal reinicias el juego y activas
una nueva jugada (En este botón puedes incluir la función para calcular la apuesta).

*/



document.getElementById("Tirar").addEventListener("click", tirardados);
document.getElementById("mTirar").addEventListener("click", mtirardados);
document.getElementById("reinicio").addEventListener("click", reinicio);

