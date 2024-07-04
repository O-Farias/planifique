document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // Lógica de validação e login
  alert("Login realizado com sucesso!");
  window.location.href = "index.html";
});

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Lógica de validação e cadastro
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  });

document
  .getElementById("reset-password-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Lógica para envio de link de redefinição de senha
    alert("Link de redefinição de senha enviado para o seu email!");
    window.location.href = "login.html";
  });
