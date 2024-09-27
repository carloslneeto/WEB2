document.getElementById('separarBtn').addEventListener('click', function() {
    const palavra = document.getElementById('palavra').value;
    const resultado = document.getElementById('resultado');
    
    resultado.innerHTML = '';  

    if (palavra) {
        palavra.split('').forEach(letra => {
            const div = document.createElement('div');
            div.className = 'letra';
            div.textContent = letra;
            resultado.appendChild(div);
        });
    } else {
        resultado.innerHTML = 'Por favor, digite uma palavra!';
    }
});
