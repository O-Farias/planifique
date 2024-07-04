document.addEventListener("DOMContentLoaded", function () {
  loadCategories();
  loadTransactions();

  // Adiciona um evento de submit no formulário de transação
  document
    .getElementById("transaction-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const description = document.getElementById("description").value;
      let amount = document.getElementById("amount").value.replace(",", "."); // Substitui vírgula por ponto
      const date = document.getElementById("date").value;
      const category = document.getElementById("category").value;

      if (!description || !amount || !date || !category) {
        alert("Por favor, preencha todos os campos!");
        return;
      }

      if (isNaN(amount) || amount <= 0) {
        alert("Por favor, insira um valor válido!");
        return;
      }

      amount = parseFloat(amount).toFixed(2);

      addTransaction(description, amount, date, category);
      clearForm();
    });

  // Adiciona um evento de submit no formulário de categoria
  document
    .getElementById("category-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Remove espaços em branco do início e do fim do texto
      const newCategory = document.getElementById("new-category").value.trim();

      if (!newCategory) {
        alert("Por favor, insira o nome da categoria!");
        return;
      }

      addCategory(newCategory);
      document.getElementById("new-category").value = "";
    });
});

// função para adicionar transação
function addTransaction(description, amount, date, category) {
  const transactions = getTransactions();
  transactions.push({ description, amount, date, category });
  saveTransactions(transactions);

  const tbody = document.getElementById("transactions-tbody");
  const tr = document.createElement("tr");

  const formattedDate = formatDate(date);

  // Adiciona uma nova linha na tabela
  tr.innerHTML = `
    <td>${description}</td>
    <td>R$${amount}</td>
    <td>${formattedDate}</td>
    <td>${category}</td>
    <td><button class="button is-small is-danger" onclick="removeTransaction(this)">Remover</button></td>
  `;

  tbody.appendChild(tr);
}

// função para limpar o formulário
function clearForm() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  document.getElementById("category").value = "";
}

// função para remover transação
function removeTransaction(button) {
  const tr = button.parentElement.parentElement;
  const description = tr.children[0].textContent;
  const amount = tr.children[1].textContent.replace("R$", "");
  const date = tr.children[2].textContent;
  const category = tr.children[3].textContent;

  const transactions = getTransactions().filter(
    (transaction) =>
      !(
        transaction.description === description &&
        transaction.amount === amount &&
        transaction.date === date &&
        transaction.category === category
      )
  );

  saveTransactions(transactions);
  tr.remove();
}

// função para formatar a data
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

// função para carregar as categorias
function loadCategories() {
  const categories = getCategories();
  const select = document.getElementById("category");

  select.innerHTML = ""; // Limpa as opções antes de adicionar as novas

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

// função para adicionar categoria
function addCategory(category) {
  const categories = getCategories();
  categories.push(category);
  saveCategories(categories);
  loadCategories();
}

// função para obter as categorias
function getCategories() {
  const categories = localStorage.getItem("categories");
  return categories ? JSON.parse(categories) : [];
}

// função para salvar as categorias
function saveCategories(categories) {
  localStorage.setItem("categories", JSON.stringify(categories));
}

// função para obter as transações
function getTransactions() {
  const transactions = localStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
}

// função para salvar as transações
function saveTransactions(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// função para carregar as transações
function loadTransactions() {
  const transactions = getTransactions();
  const tbody = document.getElementById("transactions-tbody");
  tbody.innerHTML = "";

  transactions.forEach(({ description, amount, date, category }) => {
    const tr = document.createElement("tr");
    const formattedDate = formatDate(date);

    tr.innerHTML = `
      <td>${description}</td>
      <td>R$${amount}</td>
      <td>${formattedDate}</td>
      <td>${category}</td>
      <td><button class="button is-small is-danger" onclick="removeTransaction(this)">Remover</button></td>
    `;

    tbody.appendChild(tr);
  });
}
