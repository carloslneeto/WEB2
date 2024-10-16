Parse.initialize("a35ah9wZT8I5SAznpddbBmLbKSo6Bnvn4c3KMJaG", "AeFGWvQlKxgNtcfoL4unZul0AB01bOtJwJHnRctu");
Parse.serverURL = 'https://parseapi.back4app.com';

async function createExpense(descricao, valor) {
    const Despesa = Parse.Object.extend("Despesas");
    const despesa = new Despesa();
  
    despesa.set("descricao", descricao);
    despesa.set("valor", parseFloat(valor));
  
    try {
      await despesa.save();
      alert('Despesa salva com sucesso!');
      fetchExpenses(); // Atualiza a lista de despesas e o total
    } catch (error) {
      alert('Erro ao salvar despesa: ' + error.message);
    }
  }
  
  document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
  
    createExpense(descricao, valor);
  });
  async function fetchExpenses() {
    const Despesa = Parse.Object.extend("Despesas");
    const query = new Parse.Query(Despesa);
  
    try {
      const results = await query.find();
      const tableBody = document.querySelector('#expenseList tbody');
      tableBody.innerHTML = ''; // Limpa a tabela antes de preencher
  
      let total = 0;
  
      results.forEach((despesa) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = despesa.get('descricao');
        row.insertCell(1).textContent = despesa.get('valor').toFixed(2);
        total += despesa.get('valor');
  
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Atualizar Valor';
        updateButton.onclick = () => updateExpense(despesa.id, prompt('Novo valor:'));
        row.insertCell(2).appendChild(updateButton);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteExpense(despesa.id);
        row.insertCell(2).appendChild(deleteButton);
      });
  
      document.getElementById('totalDespesas').textContent = total.toFixed(2); // Atualiza o total
    } catch (error) {
      console.error('Erro ao buscar despesas: ' + error.message);
    }
  }
  
  fetchExpenses();
  async function updateExpense(id, novoValor) {
    if (!novoValor || isNaN(novoValor)) {
      alert('Valor inválido!');
      return;
    }
  
    const Despesa = Parse.Object.extend("Despesas");
    const query = new Parse.Query(Despesa);
  
    try {
      const despesa = await query.get(id);
      despesa.set('valor', parseFloat(novoValor));
      await despesa.save();
      alert('Valor atualizado com sucesso!');
      fetchExpenses(); // Atualiza a lista
    } catch (error) {
      alert('Erro ao atualizar despesa: ' + error.message);
    }
  }
  async function deleteExpense(id) {
    const Despesa = Parse.Object.extend("Despesas");
    const query = new Parse.Query(Despesa);
  
    try {
      const despesa = await query.get(id);
      await despesa.destroy();
      alert('Despesa excluída!');
      fetchExpenses(); // Atualiza a lista
    } catch (error) {
      alert('Erro ao excluir despesa: ' + error.message);
    }
  }
        