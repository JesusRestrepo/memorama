let players = [];
let iconos = [];
let selecciones = [];
let marcador = 0;
let segundos = 0;

function agregarJugadores() {
  let informacionPlayer = document.getElementsByClassName("info");
  for (var i = 0; i < informacionPlayer.length; i++) {
    players[i] = informacionPlayer[i].value;
    //window.location = '/play.html';
    document.form1.submit();
    sessionStorage.setItem("players", players)
  }
  console.log(players);
}

function crearNombres() {
  let select = document.querySelector("select");
  let eleccion = select.value;
  //borrar el a href para mostrar al profesor
  if (eleccion == 1) {
    document.querySelector("p").innerHTML =
      '<div id="formulario"><form name="form1" action="/play.html">digite nombre: <input type="text" class="info"></form></div><button onclick="agregarJugadores()">Continuar</button>';
    console.log("seleccion:", eleccion);
  } else if (eleccion == 2) {
    document.querySelector("p").innerHTML =
      '<div id="formulario"><form name="form1" action="/play.html">digite nombre: <input type="text" class="info"><br>digite nombre: <input type="text" class="info"></form></div><button onclick="agregarJugadores()">Continuar</button>';
    console.log("seleccion:", eleccion);
  } else if (eleccion == 3) {
    document.querySelector("p").innerHTML =
      '<div id="formulario"><form action="">digite nombre: <input style="margin-top: 5%;" type="text" class="info"><br>digite nombre: <input type="text" class="info"><br>digite nombre: <input type="text" class="info"></form></div><button onclick="agregarJugadores()">Continuar</button>';
    console.log("seleccion:", eleccion);
  }
}

generarTablero();

function cargarIconos() {
  iconos = [
    "<i>WAS</i>",
    "<i>FORGET</i>",
    "<i>WALK</i>",
    "<i>RUN</i>",
    "<i>FLEW</i>",
    "<i>WROTTEN</i>",
    "<i>DRANK</i>",
    "<i>ATE</i>",
    "<i>FEEL</i>",
    "<i>DO/DOES</i>",
    "<i>BECOME</i>",
    "<i>BIT</i>",
    "<i>BREAK</i>",
    "<i>BROUGHT</i>",
    "<i>GONE</i>",
  ];
}

function generarTablero() {
  var playersInGame = [];
  cargarIconos();
  selecciones = [];
  let tablero = document.getElementById("tablero");
  let tarjetas = [];
  for (let i = 0; i < 30; i++) {
    tarjetas.push(`
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                    <div class="tarjeta" id="tarjeta${i}">
                        <div class="cara trasera" id="trasera${i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            <i class="far fa-question-circle"></i>
                        </div>
                    </div>
                </div>        
                `);
    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join(" ");
  playersInGame = sessionStorage.getItem('players')
  var coma = ",";
  var playersInGameArray = playersInGame.split(coma)
  console.log(playersInGameArray)
  document.getElementById("player").innerHTML = playersInGameArray[0];
}

function seleccionarTarjeta(i) {
  let tarjeta = document.getElementById("tarjeta" + i);
  if (tarjeta.style.transform != "rotateY(180deg)") {
    tarjeta.style.transform = "rotateY(180deg)";
    selecciones.push(i);
  }
  if (selecciones.length == 2) {
    deseleccionar(selecciones);
    selecciones = [];
    console.log(tarjeta)
  }
}

function deseleccionar(selecciones) {
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);
    if (trasera1.innerHTML != trasera2.innerHTML) {
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
      tarjeta1.style.transform = "rotateY(0deg)";
      tarjeta2.style.transform = "rotateY(0deg)";
    } else {
      trasera1.style.background = "red";
      trasera2.style.background = "red";
      marcador++;
      document.getElementById("marcador").innerHTML = marcador;
    }
  }, 1000);
}

function contadorTiempo() {
  document.getElementById("timer").innerHTML = segundos + " segundos";
  if (marcador < 15){
    timerId = setTimeout('contadorTiempo()', 1000)
  }
  else{
    alert('Haz ganado!!')
  }
  segundos++;
}
