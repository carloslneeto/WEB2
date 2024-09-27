const palavras = [
    "abacaxi", "bola", "cachorro", "dado", "elefante",
    "foca", "gato", "helicoptero", "ilha", "janela",
    "kiwi", "leao", "maca", "neve", "olho", 
    "pato", "quadro", "rosa", "sol", "tigre",
    "uva", "vaca", "webcam", "xale", "zebra"
];

let palavra = palavras[Math.floor(Math.random() * palavras.length)];
let letrasUsadas = [];
let acertos = [];
let erros = 0;

const palavraSecreta = document.getElementById('palavraSecreta');
const letrasDiv = document.getElementById('letras');
const resultadoDiv = document.getElementById('resultado');
const bonecoTexto = document.getElementById('bonecoTexto');

function mostrarPalavra() {
    palavraSecreta.innerHTML = palavra.split('').map(letra => acertos.includes(letra) ? letra : '_').join(' ');
}

function criarBotoes() {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alfabeto.forEach(letra => {
        const botao = document.createElement('button');
        botao.textContent = letra;
        botao.classList.add('letra');
        botao.onclick = () => verificarLetra(letra);
        letrasDiv.appendChild(botao);
    });
}

function verificarLetra(letra) {
    if (letrasUsadas.includes(letra)) return;
    letrasUsadas.push(letra);

    if (palavra.includes(letra)) {
        acertos.push(letra);
        mostrarPalavra();
        verificarVitoria();
    } else {
        erros++;
        atualizarBoneco();
        verificarDerrota();
    }
    
    desativarLetra(letra);
}

function desativarLetra(letra) {
    const botao = document.querySelector(`button.letra:contains(${letra})`);
    botao.disabled = true;
}

function verificarVitoria() {
    if (palavra.split('').every(letra => acertos.includes(letra))) {
        resultadoDiv.innerHTML = 'Você ganhou!';
        desativarTodosBotoes();
    }
}

function verificarDerrota() {
    if (erros === 6) {
        resultadoDiv.innerHTML = `Você perdeu! A palavra era: ${palavra}`;
        desativarTodosBotoes();
    }
}

function desativarTodosBotoes() {
    document.querySelectorAll('button.letra').forEach(botao => botao.disabled = true);
}

function atualizarBoneco() {
    let boneco = [
        `
        _______
        |     |
        |     O
        |    
        |     
        |    
        |_______`,
        `
        _______
        |     |
        |     O
        |     |
        |    
        |    
        |_______`,
        `
        _______
        |     |
        |     O
        |    /|
        |    
        |    
        |_______`,
        `
        _______
        |     |
        |     O
        |    /|\\
        |    
        |    
        |_______`,
        `
        _______
        |     |
        |     O
        |    /|\\
        |    /
        |    
        |_______`,
        `
        _______
        |     |
        |     O
        |    /|\\
        |    / \\
        |    
        |_______`
    ];
    bonecoTexto.innerHTML = boneco[erros - 1];
}

mostrarPalavra();
criarBotoes();
