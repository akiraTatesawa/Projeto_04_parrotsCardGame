const parrots = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
const cartasArr = [];

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
        cartasArr.push({nome: parrots[i], status: "frente", par: "1"})
        cartasArr.push({nome: parrots[i], status: "frente", par: "2"})
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
                <img src='./media/${cartasArr[i].nome}.gif' alt='GIF de um papagaio animado'/>
            </div>
        </div>`
    }
}


function iniciaJogo () {
    const numeroCartas = pedeNumCartas();
    parrots.sort(comparador);
    distribuiCartas(numeroCartas);
}

function giraCarta (el) {
    el.classList.add("gira");
}


iniciaJogo()



// for (let i = 0; i < numeroCartas/2; i++) {
//     cartasArr.push(`
//     <div class='carta_container' onclick="giraCarta(this)">
//         <div class="carta frontal">
//             <img src='./media/front.png' alt='Ilustração de um papagaio'/>
//         </div>
//         <div class="carta traseira">
//             <img src='./media/${cartasArr[i].nome}.gif' alt='GIF de um papagaio animado'/>
//         </div>
//     </div>
//     `);
//     cartasArr.push(`
//     <div class='carta_container' onclick="giraCarta(this)">
//         <div class="carta frontal">
//             <img src='./media/front.png' alt='Ilustração de um papagaio'/>
//         </div>
//         <div class="carta traseira">
//             <img src='./media/${imagens[i]}' alt='GIF de um papagaio animado'/>
//         </div>
//     </div>
//     `);
// }