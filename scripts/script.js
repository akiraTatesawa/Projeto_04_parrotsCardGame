const parrots = [
    "./media/bobrossparrot.gif", 
    "./media/explodyparrot.gif", 
    "./media/fiestaparrot.gif", 
    "./media/metalparrot.gif", 
    "./media/revertitparrot.gif", 
    "./media/tripletsparrot.gif", 
    "./media/unicornparrot.gif"];

let cartasArr = [];
let armazenaCodigoCartasViradas = [];
let armazenaCartasViradas = [];
let contaAcertos = 0;
let contaJogadas = 0;
let segundos;
let timerInterval;

function comparador () { 
	return Math.random() - 0.5; 
}

function pedeNumCartas () {
//  Função pede um número de cartas e só retorna o valor quando o número for par e estiver entre 4 e 14.
    let numCartas;
    let numValido = false;

    do {
        numCartas = prompt("Digite o número de cartas:\n[Insira um número par entre 4 e 14]");
        if (numCartas%2 === 0 && (numCartas >= 4 && numCartas <= 14)) {
            numValido = true;
        }
    } while (!numValido);
    return numCartas;
}

function distribuiCartas (numeroCartas) {
//  Cria duas cartas idênticas e adiciona à lista cartasArr
    for (let i = 0; i < numeroCartas/2; i++) {
        cartasArr.push({nome: parrots[i]})
        cartasArr.push({nome: parrots[i]})
    }

// Embaralha a lista de cartas
    cartasArr.sort(comparador);
    console.log(cartasArr); 

//  Adiciona as cartas embaralhadas ao DOM
    let cartas = document.querySelector(".cartas");
    cartas.innerHTML = "";
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
//  Recebe um número de cartas, realiza o embaralhamento/sorteio e inicia o timer;
    const numeroCartas = pedeNumCartas();
    parrots.sort(comparador);
    distribuiCartas(numeroCartas);
    iniciaTimer();
}

function iniciaTimer () {

    segundos = 0;
    const timer = document.querySelector(".timer");
    timer.innerHTML = `${segundos}`;
    timerInterval = setInterval(function () {
        segundos ++;
        timer.innerHTML = `${segundos}`;
    }, 1000);
}

function removeOnclick () {
//  Remove permanentemente o onclick das cartas que já foram pontuadas
    armazenaCodigoCartasViradas[0].removeAttribute("onclick");
    armazenaCodigoCartasViradas[1].removeAttribute("onclick"); 
}

function adicionaOnclick () {
//  Adiciona o onclick nas duas cartas que foram viradas, porém não eram iguais
    armazenaCodigoCartasViradas[0].setAttribute("onclick", "giraCarta(this)");
    armazenaCodigoCartasViradas[1].setAttribute("onclick", "giraCarta(this)");
}

function removeGiraDuasCartas () {
//  Remove a classe de transição das cartas que foram viradas, porém não eram iguais
    armazenaCodigoCartasViradas[0].classList.remove("gira");
    armazenaCodigoCartasViradas[1].classList.remove("gira");
    adicionaOnclick();
    armazenaCodigoCartasViradas = [];
}

function verificaCartasViradas () {
//  Confere se as cartas viradas são iguais ou não e retira o clique do site enquanto isso
    if (armazenaCartasViradas.length === 2) {
        document.querySelector(".conteudo").classList.add("sem_clique");
        if (armazenaCartasViradas[0] === armazenaCartasViradas[1]) {
            removeOnclick();
            armazenaCartasViradas = [];
            armazenaCodigoCartasViradas = [];
            contaAcertos++;
            setTimeout(function () {
                document.querySelector(".conteudo").classList.remove("sem_clique");
            }, 700);
        } else {
            setTimeout(removeGiraDuasCartas, 1500);
            armazenaCartasViradas = [];
            setTimeout(function () {
                document.querySelector(".conteudo").classList.remove("sem_clique");
            }, 1500);
        } 
    }
}

function fim () {
// Pausa o timer e exibe o alert de fim e pergunta se o jogador deseja recomeçar
    clearInterval(timerInterval);
    alert(`Você ganhou em ${contaJogadas} jogadas!\nTempo: ${segundos} segundos.`);
    let pergunta;
    do {
        pergunta = prompt("Deseja jogar novamente?\n[sim/não]")
    } while (pergunta !== "sim" && pergunta !== "não");

    if (pergunta === "sim") {
        cartasArr = [];
        armazenaCodigoCartasViradas = [];
        armazenaCartasViradas = [];
        contaAcertos = 0;
        contaJogadas = 0;
        iniciaJogo();
    }
}

function verificaFim (numeroCartas) {
//  Confere se o número de acertos é igual à quantidade de pares de cartas
    if (contaAcertos === numeroCartas/2) {
        setTimeout(fim, 1000);
    }
}

function giraCarta (el) {
//  Armazena a identidade da carta virada
    const cartaVirada = el.querySelector(".traseira img").getAttribute("src");
    el.classList.add("gira");
    armazenaCodigoCartasViradas.push(el);
    armazenaCartasViradas.push(cartaVirada);
    
//  Remove onclick da carta que acaba de ser virada
    for (let i = 0; i < armazenaCartasViradas.length; i++) {
        armazenaCodigoCartasViradas[i].removeAttribute("onclick");
    }

    verificaCartasViradas();

//  Acrescenta o número de jogadas e verifica se o jogo acabou
    contaJogadas++;
    verificaFim(cartasArr.length);
}


iniciaJogo();