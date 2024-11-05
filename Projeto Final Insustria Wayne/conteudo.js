document.addEventListener("DOMContentLoaded", () => {
    async function carregarConteudo(pagina) {
        try {
            const response = await fetch(pagina)
            if (!response.ok) {
                throw new Error('Erro ao carregar a página: ' + response.statusText);
            }
            const html = await response.text();
            document.getElementById("conteudo").innerHTML = html
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById("conteudo").innerHTML = "<p>Erro ao carregar a página.</p>";
        }
    }

    document.getElementById("btnusuario").addEventListener("click", () => {
        carregarConteudo("usuario.html")
    });

    document.getElementById("btnservico").addEventListener("click", () => {
        carregarConteudo("servico.html")
    });

    document.getElementById("btnequipamento").addEventListener("click", () => {
        carregarConteudo("equipamento.html")
    });

    document.getElementById("btnsair").addEventListener("click", () => {
        const confirmarSaida = confirm("Você realmente deseja sair?");
        if (confirmarSaida) {
            window.location.href = "login.html";
        }
    });
});
