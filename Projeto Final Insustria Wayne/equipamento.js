const nome = document.querySelector("#nome")
const estatus = document.querySelector("#estatus")
const quantidade = document.querySelector("#quantidade")
const formulario = document.querySelector("#formulario")
const buscar = document.querySelector("#buscar")

const todos_equipamentos = document.querySelector("#todos_equipamento")
const lista_de_equipamento = JSON.parse(localStorage.getItem("almoxarifado")) || []

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault()

  const equipamento_criado = {
    nome: nome.value,
    estatus: estatus.value,
    quantidade: Number(quantidade.value),
  }

  lista_de_equipamento.push(equipamento_criado)
  localStorage.setItem("almoxarifado", JSON.stringify(lista_de_equipamento))

  formulario.reset()
  nome.focus()

  montar_esquipamento()
})

buscar.addEventListener("input", mostrar_na_tela)

function mostrar_na_tela() {
  todos_equipamentos.innerHTML = "";
  const termo_de_buscar = buscar.value.toLowerCase()

  const equipamento_filtrado = lista_de_equipamento.filter((equipamento) =>
    equipamento.nome.toLowerCase().includes(termo_de_buscar)
  )

  if (equipamento_filtrado.length === 0) {
    todos_equipamentos.innerHTML = "<p>Nenhum equipamento encontrado</p>";
    return
  }

  equipamento_filtrado.forEach((equipamento_da_vez, index) => {
    const novo_card = document.createElement("div")
    novo_card.className = "card"

    const novo_nome = document.createElement("h2")
    novo_nome.textContent = equipamento_da_vez.nome

    const novo_estatus = document.createElement("p")
    novo_estatus.textContent = equipamento_da_vez.estatus

    const nova_quantidade = document.createElement("p")
    nova_quantidade.textContent = `Quantidade: ${equipamento_da_vez.quantidade}`

    const botao_remover = document.createElement("button");
    botao_remover.textContent = "Remover"
    botao_remover.addEventListener("click", () => {
      remover_equipamento(index)
    })

    novo_card.append(novo_nome, novo_estatus, nova_quantidade, botao_remover);
    todos_equipamentos.appendChild(novo_card)
  })
}

function remover_equipamento(index) {
  lista_de_equipamento.splice(index, 1) // Remove o item
  localStorage.setItem("almoxarifado", JSON.stringify(lista_de_equipamento)); // Atualiza o localStorage

  mostrar_na_tela(); // Atualiza a tela com os dados corrigidos
}

function montar_esquipamento() {
  todos_equipamentos.innerHTML = ""
  
  lista_de_equipamento.forEach((equipamento_da_vez, index) => {
    const novo_card = document.createElement("div")
    novo_card.className = "card"

    const novo_nome = document.createElement("h2")
    novo_nome.textContent = equipamento_da_vez.nome

    const novo_estatus = document.createElement("p")
    novo_estatus.textContent = equipamento_da_vez.estatus

    const nova_quantidade = document.createElement("p")
    nova_quantidade.textContent = `Quantidade: ${equipamento_da_vez.quantidade}`

    const botao_remover = document.createElement("button")
    botao_remover.textContent = "Remover"
    botao_remover.addEventListener("click", () => {
      remover_equipamento(index)
    });

    novo_card.append(novo_nome, novo_estatus, nova_quantidade, botao_remover)
    todos_equipamentos.appendChild(novo_card)
  })
}

montar_esquipamento()
