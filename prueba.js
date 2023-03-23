//definiendo variables
let players = [];
let segundos = 0;
let currentPlayer = 0
let marcador = 0

const section = document.querySelector("section");

//estableciendo el cronometro
function contadorTiempo() {
    document.getElementById("timer").innerHTML = segundos + " segundos";
    if (marcador < 30){
      timerId = setTimeout('contadorTiempo()', 1000)
    }
    else{
      alert('Haz ganado!!')
    }
    segundos++;
  }

  //agregando funcion de jugadores
function agregarJugadores() {
    let informacionPlayer = document.getElementsByClassName("info");
    for (var i = 0; i < informacionPlayer.length; i++) {
      document.form1.submit();
      agregarDatosPlayer(informacionPlayer[i].value);
      console.log(players)
      sessionStorage.setItem("players", JSON.stringify(players))
    }
  }
  
  function crearNombres() {
    let select = document.querySelector("select");
    let eleccion = select.value;
    if (eleccion == 1) {
      document.querySelector("p").innerHTML =
        '<div id="formulario"><form name="form1" action="/prueba.html">digite nombre: <input <input style="margin-top: 5%;" type="text" class="info"></form></div><button onclick="agregarJugadores()">Continuar</button>';
    } else if (eleccion == 2) {
      document.querySelector("p").innerHTML =
        '<div id="formulario"><form name="form1" action="/prueba.html">digite nombre: <input type="text" <input style="margin-top: 5%;" class="info"><br>digite nombre: <input type="text" class="info"></form></div><button onclick="agregarJugadores()">Continuar</button>';
    } else if (eleccion == 3) {
      document.querySelector("p").innerHTML =
        '<div id="formulario"><form name="form1" action="/prueba.html">digite nombre: <input style="margin-top: 5%;" type="text" class="info"><br>digite nombre: <input type="text" class="info"><br>digite nombre: <input type="text" class="info"></form></div><button onclick="agregarJugadores()">Continuar</button>';
    }
  }

  function agregarDatosPlayer(nombrePlayer){
    var nuevoPlayer = {
      nombre: nombrePlayer,
      score: 0
    };
    console.log(nuevoPlayer)
    players.push(nuevoPlayer);
  }


//obtener imgs
const getData = () => [
    { imgSrc: "img/img1.png", name:"become" },
    { imgSrc: "img/img2.png", name:"become" },
    { imgSrc: "img/img3.png", name:"become" },
    { imgSrc: "img/img4.png", name:"begin" },
    { imgSrc: "img/img5.png", name:"begin" },
    { imgSrc: "img/img6.png", name:"begin" },
    { imgSrc: "img/img7.png", name:"bite" },
    { imgSrc: "img/img8.png", name:"bite" },
    { imgSrc: "img/img9.png", name:"bite" },
    { imgSrc: "img/img10.png", name:"blow" },
    { imgSrc: "img/img11.png", name:"blow" },
    { imgSrc: "img/img12.png", name:"blow" },
    { imgSrc: "img/img13.png", name:"break" },
    { imgSrc: "img/img14.png", name:"break" },
    { imgSrc: "img/img15.png", name:"break" },
    { imgSrc: "img/img16.png", name:"build" },
    { imgSrc: "img/img17.png", name:"build" },
    { imgSrc: "img/img18.png", name:"build" },
    { imgSrc: "img/img19.png", name:"buy" },
    { imgSrc: "img/img20.png", name:"buy" },
    { imgSrc: "img/img21.png", name:"buy" },
    { imgSrc: "img/img22.png", name:"catch" },
    { imgSrc: "img/img23.png", name:"catch" },
    { imgSrc: "img/img24.png", name:"catch" },
    { imgSrc: "img/img25.png", name:"do" },
    { imgSrc: "img/img26.png", name:"do" },
    { imgSrc: "img/img27.png", name:"do" },
    { imgSrc: "img/img28.png", name:"draw" },
    { imgSrc: "img/img29.png", name:"draw" },
    { imgSrc: "img/img30.png", name:"draw" },
];

//desorganizar cartas
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

const playersInGame = JSON.parse(sessionStorage.getItem('players'))

//creador de cartas
const generadorCartas = () => {
    const cardData = randomize();
    
    //generador html
    cardData.forEach( (item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        //llevar imgs a cartas
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);

        //llevar cartas a section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", (e) => {
            card.classList.toggle("togglecard");
            matchCards(e);
        })
    })
    //obteniendo la info del sessionStorage
    
    if(playersInGame.length == 1){
      document.getElementById("jugadores").innerHTML = `
      <div>
        <p id="player1"></p>
      </div>`
      document.getElementById("player1").innerHTML = `
      <p>${playersInGame[0].nombre}: ${playersInGame[0].score}</p>
      `
    } else if (playersInGame.length == 2){
      document.getElementById("jugadores").innerHTML = `
      <div>
        <p id="player1"></p>
      </div>
      <div>
        <p id="player2"></p>
      </div>
      `
      document.getElementById("player1").innerHTML = `
      <p>${playersInGame[0].nombre}: ${playersInGame[0].score}</p>
      `
      document.getElementById("player2").innerHTML = `
      <p>${playersInGame[1].nombre}: ${playersInGame[1].score}</p>
      `
    } else if (playersInGame.length == 3){
      document.getElementById("jugadores").innerHTML = `
      <div>
        <p id="player1"></p>
      </div>
      <div>
        <p id="player2"></p>
      </div>
      <div>
        <p id="player3"></p>
      </div>
      `
      document.getElementById("player1").innerHTML = `
      <p>${playersInGame[0].nombre}: ${playersInGame[0].score}</p>
      `
      document.getElementById("player2").innerHTML = `
      <p>${playersInGame[1].nombre}: ${playersInGame[1].score}</p>
      `
      document.getElementById("player3").innerHTML = `
      <p>${playersInGame[2].nombre}: ${playersInGame[2].score}</p>
      `
    }
}

//emparejando las cartas
const matchCards = (e) =>  {
    const clickedcard = e.target;
    clickedcard.classList.add("flipped");
    const flippedcards = document.querySelectorAll(".flipped");
    //logica
    if (flippedcards.length === 3){
        if (flippedcards[0].getAttribute("name") === flippedcards[1].getAttribute("name") && flippedcards[1].getAttribute("name") === flippedcards[2].getAttribute("name")){
            playersInGame[currentPlayer].score++;
            document.getElementById("jugadores").innerHTML = `
            <p>${playersInGame[0].nombre}: ${playersInGame[0].puntaje}</p>
            <p>${playersInGame[1].nombre}: ${playersInGame[1].puntaje}</p>
            <p>${playersInGame[2].nombre}: ${playersInGame[2].puntaje}</p>
            `
            flippedcards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        } else {
            flippedcards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => {
                  card.classList.remove("togglecard")
                  currentPlayer = (currentPlayer + 1) % 3;
                }, 1000);
            })
        }
    }
}



generadorCartas();