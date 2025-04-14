// Quando a página carregar, executa a função mostrarCarrinho
window.onload = mostrarCarrinho;

// Adiciona um evento que detecta quando o mouse sai da tela
document.addEventListener("mouseout", function (e) { 
/*document:se refere a toda a página web (HTML)
.addEventListener: é um método que espera alguma coisa acontecer
"mouseout": é o tipo de evento que estamos esperando, quando o mouse sai de dentro da janela do navegador.
function (e): define o que vai acontecer quando o evento acontecer. O e é um objeto do evento, que contém informações como posição do mouse, teclas apertadas, etc.
*/
    

if (e.clientY < 0) {
        /*if: é uma condição, só executa o que está dentro dela se for verdadeira.

e.clientY: pega a posição vertical do ponteiro do mouse em relação ao topo da janela (0 = topo).
< 0: verifica se o mouse passou para cima da janela (ou seja, saiu da tela).

Essa linha pergunta: "O ponteiro do mouse foi para cima da janela?"
Se sim, então mostra o modal.
*/
      // Exibe o modal de oferta alterando o estilo de display para "flex"
      document.getElementById("modalOferta").style.display = "flex";
/*.getElementById("modalOferta"): pega o elemento com o ID modalOferta (que é o nosso modal).
.style.display: acessa o estilo de exibição do elemento.
= "flex": define o estilo como flexível (visível). Assim o modal aparece centralizado. */
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

// Função para tocar a música após a primeira interação do usuário
function iniciarMusica() {
    const musica = document.getElementById("musicaBoasVindas");
    musica.play(); // Toca a música
    document.removeEventListener("click", iniciarMusica); // Remove o evento após tocar
    document.removeEventListener("mousemove", iniciarMusica); // Também remove do mouse
  }
  
  // Escuta a primeira interação do usuário (clique ou movimento do mouse)
  document.addEventListener("click", iniciarMusica);
  document.addEventListener("mousemove", iniciarMusica);
  
