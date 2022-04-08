const parrots = [
    "./media/bobrossparrot.gif", 
    "./media/explodyparrot.gif", 
    "./media/fiestaparrot.gif", 
    "./media/metalparrot.gif", 
    "./media/revertitparrot.gif", 
    "./media/tripletsparrot.gif", 
    "./media/unicornparrot.gif"];

const cartasArr = [];
let listaGira = [];
let armazenaCodigoCartasViradas = [];
let armazenaCartasViradas = [];
let contaAcertos = 0;
let contaJogadas = 0;

// [{nome: "bobrossparrot", status: "frente"}, {nome: "explodyparrot", status: "frente"}, ...]


function comparador () { 

	return Math.random() - 0.5; 
}

function pedeNumCartas () {

    let numCartas;
    let numValido = false;

    do {
        numCartas = prompt("Digite o número de cartas");
        if (numCartas%2 === 0 && (numCartas >= 4 && numCartas <= 14)) {
            numValido = true;
        }
    } while (!numValido);
    return numCartas;
}

function distribuiCartas (numeroCartas) {

    for (let i = 0; i < numeroCartas/2; i++) {
        cartasArr.push({nome: parrots[i], status: "frente"})
        cartasArr.push({nome: parrots[i], status: "frente"})
    }
    cartasArr.sort(comparador);
    console.log(cartasArr); 

    let cartas = document.querySelector(".cartas");
    for (let i = 0; i < cartasArr.length; i++) {
        cartas.innerHTML += 
        `<div class='carta_container' onclick="giraCarta(this)">
            <div class="carta frontal">
                <img src='./media/front.png' alt='Ilustração de um papagaio'/>
            </div>
            <div class="carta traseira">
                <img src='${cartasArr[i].nome}' alt='GIF de um papagaio animado'/>
            </div>
        </div>`
    }
}


function iniciaJogo () {
    const numeroCartas = pedeNumCartas();
    parrots.sort(comparador);
    distribuiCartas(numeroCartas);
}

function removeOnclick () {
    armazenaCodigoCartasViradas[0].removeAttribute("onclick");
    armazenaCodigoCartasViradas[1].removeAttribute("onclick"); 
}

function adicionaOnclick () {
    armazenaCodigoCartasViradas[0].setAttribute("onclick", "giraCarta(this)");
    armazenaCodigoCartasViradas[1].setAttribute("onclick", "giraCarta(this)");
}


function removeGiraDuasCartas() {
    armazenaCodigoCartasViradas[0].classList.remove("gira");
    armazenaCodigoCartasViradas[1].classList.remove("gira");
    adicionaOnclick();
    armazenaCodigoCartasViradas = [];
}

function fim () {
    alert(`Você ganhou em ${contaJogadas} jogadas!`);
}

function verificaFim (numeroCartas) {
    if (contaAcertos === numeroCartas/2) {
        setTimeout(fim, 1000);
    }

}

function giraCarta (el) {

    const cartaVirada = el.querySelector(".traseira img").getAttribute("src");
    el.classList.add("gira");
    armazenaCodigoCartasViradas.push(el);
    armazenaCartasViradas.push(cartaVirada);
    console.log(armazenaCartasViradas);
    console.log(armazenaCodigoCartasViradas);

    for (let i = 0; i < armazenaCartasViradas.length; i++) {
        armazenaCodigoCartasViradas[i].removeAttribute("onclick");
    }

    if (armazenaCartasViradas.length === 2) {
        if (armazenaCartasViradas[0] === armazenaCartasViradas[1]) {
            console.log("é igual");
            removeOnclick();
            armazenaCartasViradas = [];
            armazenaCodigoCartasViradas = [];
            contaAcertos++;
            console.log(contaAcertos);
        } else {
            console.log("é diferente");
            setTimeout(removeGiraDuasCartas, 2000);
            armazenaCartasViradas = [];
        }
    }

    contaJogadas++;
    console.log(`Jogada número ${contaJogadas}`);
    verificaFim(cartasArr.length);
}

iniciaJogo();
