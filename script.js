const contenedorPalabra = document.getElementById('contenedorPalabra');
const botonIniciar = document.getElementById('botonIniciar');
const letrasUsadasElemento = document.getElementById('letrasUsadas');

let lienzo = document.getElementById('lienzo');
let ctx = lienzo.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const partesCuerpo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let palabraSeleccionada;
let letrasUsadas;
let errores;
let aciertos;

const agregarLetra = letra => {
    const letraElemento = document.createElement('span');
    letraElemento.innerHTML = letra.toUpperCase();
    letrasUsadasElemento.appendChild(letraElemento);
}

const agregarParteCuerpo = parteCuerpo => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...parteCuerpo);
};

const letraIncorrecta = () => {
    agregarParteCuerpo(partesCuerpo[errores]);
    errores++;
    if(errores === partesCuerpo.length) finalizarJuego();
}

const finalizarJuego = () => {
    document.removeEventListener('keydown', eventoLetra);
    botonIniciar.style.display = 'block';
}

const letraCorrecta = letra => {
    const { children } = contenedorPalabra;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letra) {
            children[i].classList.toggle('hidden');
            aciertos++;
        }
    }
    if(aciertos === palabraSeleccionada.length) finalizarJuego();
}

const entradaLetra = letra => {
    if(palabraSeleccionada.includes(letra)) {
        letraCorrecta(letra);
    } else {
        letraIncorrecta();
    }
    agregarLetra(letra);
    letrasUsadas.push(letra);
};

const eventoLetra = event => {
    let nuevaLetra = event.key.toUpperCase();
    if(nuevaLetra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(nuevaLetra)) {
        entradaLetra(nuevaLetra);
    };
};

const dibujarPalabra = () => {
    palabraSeleccionada.forEach(letra => {
        const letraElemento = document.createElement('span');
        letraElemento.innerHTML = letra.toUpperCase();
        letraElemento.classList.add('letra');
        letraElemento.classList.add('hidden');
        contenedorPalabra.appendChild(letraElemento);
    });
};

const seleccionarPalabraAleatoria = () => {
    let palabra = words[Math.floor((Math.random() * words.length))].toUpperCase();
    palabraSeleccionada = palabra.split('');
};

const dibujarAhorcado = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const iniciarJuego = () => {
    letrasUsadas = [];
    errores = 0;
    aciertos = 0;
    contenedorPalabra.innerHTML = '';
    letrasUsadasElemento.innerHTML = '';
    botonIniciar.style.display = 'none';
    dibujarAhorcado();
    seleccionarPalabraAleatoria();
    dibujarPalabra();
    document.addEventListener('keydown', eventoLetra);
};

botonIniciar.addEventListener('click', iniciarJuego);
