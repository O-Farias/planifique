document.addEventListener("DOMContentLoaded", function () {
  loadCategoryTotals();
  loadManageCategories();
});

//
function loadCategoryTotals() {
  const transactions = getTransactions();
  const categories = getCategories();
  const tbody = document.getElementById("categories-tbody");
  const totals = {};

  categories.forEach((category) => {
    totals[category] = 0;
  });

  transactions.forEach((transaction) => {
    totals[transaction.category] += parseFloat(transaction.amount);
  });

  tbody.innerHTML = "";

  for (const category in totals) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${category}</td>
      <td>R$${totals[category].toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  }
}

function loadManageCategories() {
  const categories = getCategories();
  const tbody = document.getElementById("manage-categories-tbody");
  tbody.innerHTML = "";

  categories.forEach((category) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${category}</td>
      <td><button class="button is-small is-danger" onclick="removeCategory('${category}')">Remover</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// função para remover categoria
function removeCategory(category) {
  const categories = getCategories().filter((c) => c !== category);
  saveCategories(categories);

  const transactions = getTransactions().filter((t) => t.category !== category);
  saveTransactions(transactions);

  loadCategoryTotals();
  loadManageCategories();
}

function getTransactions() {
  const transactions = localStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
}

function saveTransactions(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function getCategories() {
  const categories = localStorage.getItem("categories");
  return categories ? JSON.parse(categories) : [];
}

function saveCategories(categories) {
  localStorage.setItem("categories", JSON.stringify(categories));
}
