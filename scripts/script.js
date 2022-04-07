const imagens = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];
let cartas;

function comparador() { 
	return Math.random() - 0.5; 
}

function pedeNumCartas() {
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

//embaralhar as imagens
//dividir o numCartas por 2
//adicionar uma carta * 2 numa lista 
//embaralhar as cartas
//colocar as cartas no DOM

function iniciaJogo() {
    const cartasArr = [];
    const numeroCartas = pedeNumCartas();
    imagens.sort(comparador);
    
    for (let i = 0; i < numeroCartas/2; i++) {
        cartasArr.push(`
        <div class='carta_container' onclick="giraCarta(this)">
            <div class="carta frontal">
                <img src='./media/front.png' alt='Ilustração de um papagaio'/>
            </div>
            <div class="carta traseira">
                <img src='./media/${imagens[i]}' alt='GIF de um papagaio animado'/>
            </div>
        </div>
        `);
        cartasArr.push(`
        <div class='carta_container' onclick="giraCarta(this)">
            <div class="carta frontal">
                <img src='./media/front.png' alt='Ilustração de um papagaio'/>
            </div>
            <div class="carta traseira">
                <img src='./media/${imagens[i]}' alt='GIF de um papagaio animado'/>
            </div>
        </div>
        `);
    }
    cartasArr.sort(comparador);
    
    cartas = document.querySelector(".cartas");
    for (let j = 0; j < cartasArr.length; j++) {
        cartas.innerHTML += cartasArr[j];
    }
}

function giraCarta(el) {
    el.classList.toggle("gira");
}

iniciaJogo()