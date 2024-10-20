//Selectores
const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector(".app__title");
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

//Eventos
musica.loop = true;//Reproducción continua de la música

//Musica---Cuando se cambie el estado del boton en pausa se reproduce la música
inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }else{
        musica.pause();
    }
});


botonCorto.addEventListener("click", () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto ('descanso-corto'); 
    botonCorto.classList.add("active");
});

botonEnfoque.addEventListener("click", () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto ('enfoque');
    botonEnfoque.classList.add("active");

});

botonLargo.addEventListener("click", () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto ('descanso-largo');
    botonLargo.classList.add("active");

});


//Funciones
function cambiarContexto (contexto) {
    mostrarTiempo();
    //Remover enfoque de los botones
    botones.forEach(contexto => {
        contexto.classList.remove("active");
    });

    //Cambiar texto e imagen de acuerdo con el contexto
    html.setAttribute('data-contexto', contexto );
    banner.setAttribute('src', `/imagenes/${contexto}.png`);

     //Estructura de control switch-case para agregar los textos.   
    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;

        case 'descanso-corto':
            titulo.innerHTML = `¿Qué tal tomar un respiro? 
            <strong class="app__title-strong">¡Haz una pausa corta!<strong class="app__title-strong">`
            break;

        case 'descanso-largo':
            titulo.innerHTML= `Hora de volver a la superficie
            <strong class="app__title-strong">Haz una pausa larga.<strong class="app__title-strong">`
            break
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if (tiempoTranscurridoEnSegundos <= 0) {
        audioTiempoFinalizado.play();
        alert("TIEMPO FINALIZADO");
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', '/imagenes/pause.png');
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
    
}

botonIniciarPausar.addEventListener("click", iniciarPausar);

function iniciarPausar(){
    if (idIntervalo){
        audioPausa.play();
        reiniciar();
        return;// retorno anticipado -- circuit breaker
    }
    audioPausa.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);/**setInterval ejecuta cuentaRegresiva cada 1000 milisegundos (1 segundo).  */
}

function reiniciar() {
    clearInterval(idIntervalo);/**clearInterval Se usa para detener el intervalo cuando llega a cero */
    idIntervalo = null;
    textoIniciarPausar.textContent = "Comenzar";
    iconoIniciarPausar.setAttribute('src', '/imagenes/play_arrow.png');
}

//Funcion para mostrar tiempo en pantalla
function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-CO', {minute:'2-digit', second: '2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();