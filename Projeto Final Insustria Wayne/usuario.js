const cargo = document.querySelector("#cargo")
const nome = document.querySelector("#nome")
const senha = document.querySelector("#senha")
const email = document.querySelector("#email")
const form = document.querySelector("#form")
const busca = document.querySelector("#busca")

const todos_os_funcionarios= document.querySelector("#todos_os_funcionarios")
const lista_de_funcionarios = JSON.parse(localStorage.getItem("lista")) || []


form.addEventListener("submit", (evento)=>{
    evento.preventDefault()
  
    const funcionario_criado = {
        cargo: cargo.value,
        nome: nome.value,
        senha: senha.value,
        email: email.value,
    }

    if (form.dataset.editIndex !== undefined) {
        lista_de_funcionarios[form.dataset.editIndex] = funcionario_criado;
        delete form.dataset.editIndex;
      } else {
        lista_de_funcionarios.push(funcionario_criado)
      }
    
        localStorage.setItem("lista", JSON.stringify(lista_de_funcionarios))
        form.reset()
        nome.focus()
    
    montar_funcionario()
})

function montar_funcionario(){
    todos_os_funcionarios.innerHTML = ""
  
    lista_de_funcionarios.forEach((funcionario_da_vez,index)=>{
        const novo_card = document.createElement("div")
        novo_card.className = "card"

        const novo_nome = document.createElement("h2")
        novo_nome.textContent = funcionario_da_vez.nome
        
        const novo_cargo = document.createElement("p")
        novo_cargo.textContent = funcionario_da_vez.cargo

        const nova_senha = document.createElement("p")
        nova_senha.textContent = funcionario_da_vez.senha
        
        const novo_email = document.createElement("p")
        novo_email.textContent = funcionario_da_vez.email
        
        const editar = document.createElement("button")
        editar.textContent = "Editar"
        editar.addEventListener("click", () => editar_funcionario(index))
        
        const excluir = document.createElement("button")
        excluir.textContent = "Excluir"
        excluir.addEventListener("click", () => excluir_funcionario(index));
        
        novo_card.append(novo_nome, novo_cargo, nova_senha, novo_email, editar, excluir)
        todos_os_funcionarios.appendChild(novo_card)
    })
}
  
function buscar_funcionario() {

    todos_os_funcionarios.innerHTML = ""; 
    const termo_de_busca = busca.value.toLowerCase()
    const filtrar_funcionario = lista_de_funcionarios.filter(funcionario => 
        funcionario.nome.toLowerCase().includes(termo_de_busca) || 
        funcionario.cargo.toLowerCase().includes(termo_de_busca)
    );

    if (filtrar_funcionario.length === 0) {
        todos_os_funcionarios.innerHTML = "<p>Nenhum funcionário encontrado</p>";
        return;
    }

    filtrar_funcionario.forEach((funcionario_da_vez, index) => {
        const novo_card = document.createElement("div")
        novo_card.className = "card"

        const novo_nome = document.createElement("h2")
        novo_nome.textContent = funcionario_da_vez.nome

        const novo_cargo = document.createElement("p");
        novo_cargo.textContent = funcionario_da_vez.cargo;
        
        const novo_email = document.createElement("p")
        novo_email.textContent = funcionario_da_vez.email

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.addEventListener("click", () => editar_funcionario(index));

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", () => excluir_funcionario(index));

    novo_card.append(novo_nome, novo_cargo, novo_email, editar, excluir)
    todos_os_funcionarios.appendChild(novo_card)
  })
}

function editar_funcionario(index) {
    const funcionario = lista_de_funcionarios[index]
      
    nome.value = funcionario.nome;
    cargo.value = funcionario.cargo;
    email.value = funcionario.email;
    senha.value = funcionario.senha;
    form.dataset.editIndex = index;
  }
  
function excluir_funcionario(index) {
    if (confirm("Deseja excluir este funcionário?")) {
        lista_de_funcionarios.splice(index, 1)
        localStorage.setItem("lista", JSON.stringify(lista_de_funcionarios))
        montar_funcionario()
    }
}

busca.addEventListener("input", montar_funcionario);

montar_funcionario();