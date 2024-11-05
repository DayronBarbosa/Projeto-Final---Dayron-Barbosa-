const servico = document.querySelector("#servico")
const formulario = document.querySelector("#formulario")
const resultado = document.querySelector("#resultado")

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const valor = servico.value.trim()
    if (valor === ""){
        alert("Por favor, inserir um serviço.")
        return;
    }

    const novo_elemento = document.createElement("div")
    const novo_input = document.createElement("input")
    const novo_texto = document.createElement("span")
    const novo_botao = document.createElement("button")

    novo_input.addEventListener("click", (evento) => {
        if (evento.target.checked) {
            novo_texto.style.textDecoration = "line-through"
        } else {
            novo_texto.style.textDecoration = "none"
        }
    })

    novo_botao.addEventListener("click", (evento) => {
        if (evento) resultado.removeChild(novo_elemento)
    })

    novo_input.type = "checkbox"
    novo_texto.textContent = valor
    novo_botao.textContent = "Remover"

    novo_elemento.append(novo_input, novo_texto, novo_botao)
    resultado.appendChild(novo_elemento)
    servico.value = ""
    servico.focus()
});

