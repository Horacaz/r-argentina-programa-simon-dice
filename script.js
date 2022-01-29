const $comenzar = document.querySelector(".comenzar");
const $rondaActual = document.querySelector("#ronda-actual");
const $turnoActual = document.querySelector("#turno-actual");
let secuenciaCpu = [];
let rondaActual = 1
$comenzar.onclick = function () {
rondaActual = 1
secuenciaCpu = []
 ronda(rondaActual);
    
}


function ronda(rondaActual){
    $rondaActual.textContent = ` ${rondaActual}`;
    desabilitarBotones();
    secuenciaCpu.push(turnoCpu());
    repetirSecuencia(secuenciaCpu);
    const secuenciaJugador = [];
    let retraso = (rondaActual + 2) * 1000;
    turnoJugador(secuenciaCpu, secuenciaJugador, retraso);


}


function repetirSecuencia(secuenciaCpu) {
$turnoActual.textContent = " CPU";
secuenciaCpu.forEach(function(secuencia, i){
    let retraso = (i + 1) * 1000;
    secuencia = document.querySelector(`.${secuenciaCpu[i]}`);
    setTimeout(function(){iluminarBotones(secuencia)}, retraso);
})
}

function iluminarBotones(elementoSecuencia){
   elementoSecuencia.setAttribute("id", "highlight");
    setTimeout(function(){elementoSecuencia.setAttribute("id", "unhighlight")}, 500)
}


function turnoJugador(secuenciaCpu, secuenciaJugador, retraso){
    habilitarBotones(retraso);
    const $botones = document.querySelectorAll(".main-container button");
    $botones.forEach(function(boton){

        boton.onclick = function(e){ 
            secuenciaJugador.push(e.target.className);
            for(i = 0; i < secuenciaJugador.length; i++){
                if (secuenciaJugador[i] !== secuenciaCpu[i]){
                    desabilitarBotones();
                    return $turnoActual.textContent = " Perdiste, pulsa comenzar para jugar nuevamente.";
                } if (secuenciaJugador.length === secuenciaCpu.length){
                    rondaActual++;
                    return setTimeout(ronda(rondaActual), 500);
                    ;
                    
                }
            }
        }
    })
}

function turnoCpu() {
    let cpuPlay = Math.floor(Math.random() * 4);
    let secuenciaCpu;
    const botones = {
        "boton-verde": 0,
        "boton-rojo": 1,
        "boton-azul": 2,
        "boton-amarillo": 3,
    }

    const claseBotones = Object.keys(botones);
    const valorBotones = Object.values(botones);

    valorBotones.forEach(function (valor) {
        if (valor === cpuPlay) {
            secuenciaCpu = claseBotones[valor]

        }
    })
    return  secuenciaCpu;
}

function desabilitarBotones() {
    const $botones = document.querySelectorAll(".main-container button");
    $botones.forEach(boton => boton.disabled = true);

}

function habilitarBotones(retraso) {
    setTimeout(function(){
        $turnoActual.textContent = " JUGADOR";
        const $botones = document.querySelectorAll(".main-container button");
    $botones.forEach(boton => boton.disabled = false)
}, retraso)};
    



