document.getElementById('jsonButton').addEventListener('click', function() {

    var matricula = document.getElementById('c1').value;
    var nome = document.getElementById('c2').value;
    var idade = document.getElementById('c3').value;
    var cpf = document.getElementById('c4').value;

    if (!matricula || !nome || !idade || !cpf) {
        alert('preencha todos os campos antes de prosseguir.');
        return; 
    }

    if (!Number.isInteger(Number(idade))) {
        alert('A idade deve ser um número inteiro.');
        return;
    }

    var aluno = {
        matricula: matricula,
        nome: nome,
        idade: idade,
        cpf: cpf
    };

    var alunoJSON = JSON.stringify(aluno, null, 2);

    document.getElementById('jsonOutput').textContent = alunoJSON;
});
