// Quando a página carregar, executa a função mostrarCarrinho
window.onload = mostrarCarrinho;

// Adiciona um evento que detecta quando o mouse sai da tela
document.addEventListener("mouseout", function (e) {

    // Verifica se o ponteiro do mouse saiu pela parte de cima da janela do navegador
    if (e.clientY < 0) {
      // Exibe o modal de oferta alterando o estilo de display para "flex"
      document.getElementById("modalOferta").style.display = "flex";
    }
  });
  
  // Define uma função chamada "fecharModal"
  function fecharModal() {
    // Oculta o modal de oferta alterando o estilo de display para "none"
    document.getElementById("modalOferta").style.display = "none";
  }
  

// Função que adiciona um produto ao carrinho
function adicionarProduto() {
  // Pega o valor digitado no campo código
  const codigo = document.getElementById("codigo").value;

  // Pega o valor digitado no campo nome
  const nome = document.getElementById("nome").value;

  // Pega a quantidade digitada e converte para número inteiro
  const quantidade = parseInt(document.getElementById("quantidade").value);

  // Pega o valor digitado e converte para número com casas decimais
  const valor = parseFloat(document.getElementById("valor").value);

  // Calcula o total do item (quantidade * valor unitário)
  const total = quantidade * valor;

  // Cria um objeto com as informações do produto
  const produto = { codigo, nome, quantidade, valor, total };

  // Pega o carrinho do localStorage (ou cria array vazio se não existir)
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Adiciona o novo produto ao array do carrinho
  carrinho.push(produto);

  // Salva o novo carrinho no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Atualiza a exibição do carrinho na tela
  mostrarCarrinho();

  // Limpa os campos após adicionar o produto
  document.getElementById("codigo").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valor").value = "";
}

// Função que exibe o carrinho na tela
function mostrarCarrinho() {
  // Recupera o carrinho salvo no localStorage
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Seleciona a div onde os produtos serão mostrados
  const carrinhoDiv = document.getElementById("carrinho");

  // Começa com o título da seção
  carrinhoDiv.innerHTML = "<h2>Itens no Carrinho:</h2>";

  // Variável para somar o valor total de todos os itens
  let totalGeral = 0;

  // Para cada item no carrinho...
  carrinho.forEach((item, index) => {
    totalGeral += item.total; // Soma o total do item ao total geral

    // Adiciona um parágrafo com as informações do item
    carrinhoDiv.innerHTML += `
      <p>
        <strong>${item.nome}</strong> (${item.codigo}) -
        Quantidade: ${item.quantidade} |
        Valor: R$${item.valor.toFixed(2)} |
        Total: R$${item.total.toFixed(2)}
        <button onclick="removerItem(${index})">Remover</button>
      </p>
    `;
  });

  // Adiciona o valor total de todos os produtos ao final
  carrinhoDiv.innerHTML += `<h3>Total Geral: R$${totalGeral.toFixed(2)}</h3>`;
}

// Função que remove um item do carrinho
function removerItem(index) {
  // Recupera o carrinho
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Remove o item da posição especificada
  carrinho.splice(index, 1);

  // Salva novamente o carrinho atualizado no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Atualiza a exibição na tela
  mostrarCarrinho();
}
