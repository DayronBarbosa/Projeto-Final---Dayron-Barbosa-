const newcargo = document.querySelector("#cargo");
const newusuario = document.querySelector("#usuario");
const newsenha = document.querySelector("#senha");
const btnentrar = document.querySelector("#btnentrar");

const form = document.querySelector("#form");

const todos_os_usuarios = document.querySelector("#todos_os_usuarios");

const lista_de_usuario = JSON.parse(localStorage.getItem("login")) || [];

btnentrar.addEventListener("click", (evento) => { // Adicionado para lógica de entrada
    evento.preventDefault();
    localStorage.getItem(form, JSON.stringify(lista_de_usuario))
    const usuario = document.querySelector("#usuario").value;
    const senha = document.querySelector("#senha").value;

    const usuarioEncontrado = lista_de_usuario.find(user => user.newusuario === usuario && user.newsenha === senha);

    if (usuarioEncontrado) {
        alert("Login bem-sucedido!");
        form.reset();
        // Aqui você pode redirecionar ou fazer o que quiser após o login bem-sucedido
    } else {
        alert("Usuário ou senha incorretos.");
    }
});