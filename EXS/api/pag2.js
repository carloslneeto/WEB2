async function getCatFact() {
    try {
        const response = await fetch('https://catfact.ninja/fact');
        
        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar a curiosidade sobre gatos');
        }

        const data = await response.json();
        document.getElementById('catFact').textContent = data.fact;
    } catch (error) {
        // Exibe uma mensagem de erro caso a requisição falhe
        document.getElementById('catFact').textContent = `Erro: ${error.message}`;
    }
}
window.onload = getCatFact;
