const imagens = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"]

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
//embaralhar a lista
//colocar as cartas no DOM

function iniciaJogo() {
    let numeroCartas = pedeNumCartas();
    imagens.sort(comparador);
    


}