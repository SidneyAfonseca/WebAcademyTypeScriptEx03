import TV from './tv';
import Celular from './celular';
import Bicicleta from './bicicleta';
import CarrinhoDeCompras from './carrinhodecompras';

const carrinho = new CarrinhoDeCompras();

function atualizarCarrinho() {
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");
  console.log(cartList)
  if (cartList) {
    cartList.innerHTML = "";
    const produtosNoCarrinho = carrinho.listarProdutos();
    console.log(produtosNoCarrinho)
    produtosNoCarrinho.forEach((produto, index) => {
      console.log(produto)
      console.log(typeof produto)
      const listItem = document.createElement("li");
      if (produto instanceof TV) {
        listItem.innerHTML = `
              TV - Modelo:${produto.modelo} - Fabricante:${produto.fabricante} - Preço:R$ ${produto.preco.toFixed(2)} </br> 
              Resolução: ${produto.resolucao} - Tamanho polegadas: ${produto.tamanhoPolegadas} 
              <button class="button-remove" onclick="removerDoCarrinho(${index})">Remover</button>
          `;
      } if (produto instanceof Celular) {
        listItem.innerHTML = `
              Modelo:${produto.modelo} - Fabricante:${produto.fabricante} - Preço:R$ ${produto.preco.toFixed(2)}
              - Memória: ${produto.memoria}
              <button class="button-remove" onclick="removerDoCarrinho(${index})">Remover</button>
          `;
      } if (produto instanceof Bicicleta) {
        listItem.innerHTML = `
              Modelo:${produto.modelo} - Fabricante:${produto.fabricante} - Preço:R$ ${produto.preco.toFixed(2)} </br> 
              Tamanho Aro: ${produto.tamanhoAro} 
              <button class="button-remove" onclick="removerDoCarrinho(${index})">Remover</button>
          `;
      }
      console.log(listItem)
      cartList.appendChild(listItem);
    });
  }

  const total = carrinho.calcularTotal();
  console.log(cartTotal)
  if (cartTotal)
    cartTotal.textContent = total.toFixed(2);
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho() {
  const productType = document.getElementById("productType") as HTMLSelectElement;
  const modelInput = document.getElementById("model") as HTMLInputElement;
  const manufacturerInput = document.getElementById("manufacturer") as HTMLInputElement;
  const priceInput = document.getElementById("price") as HTMLInputElement;
  const resolution = document.getElementById("resolution") as HTMLInputElement;
  const sizeInches = document.getElementById("sizeInches") as HTMLInputElement;
  const memory = document.getElementById("memory") as HTMLInputElement;
  const wheelSize = document.getElementById("wheelSize") as HTMLInputElement;

  const tipoProduto = productType.value;
  const modelo = modelInput.value;
  const fabricante = manufacturerInput.value;
  const preco = parseFloat(priceInput.value);
  const resoulcao = resolution.value;
  const tamanhoPolegadas = Number.parseInt(sizeInches.value);
  const memoria = memory.value;
  const tamanhoAro = Number.parseInt(wheelSize.value);

  if (modelo && fabricante && !isNaN(preco) && preco > 0) {
    let produto: Produto;

    switch (tipoProduto) {
      case "tv":
        produto = new TV(modelo, fabricante, preco, resoulcao, tamanhoPolegadas);
        break;
      case "celular":
        produto = new Celular(modelo, fabricante, preco, memoria);
        break;
      case "bicicleta":
        produto = new Bicicleta(modelo, fabricante, preco, tamanhoAro);
        break;
      default:
        return;
    }

    carrinho.adicionarProduto(produto);
    atualizarCarrinho();

    // Limpar campos de entrada
    modelInput.value = "";
    manufacturerInput.value = "";
    priceInput.value = "";
    resolution.value = "";
    sizeInches.value = "";
    memory.value = "";
    wheelSize.value = "";
  }
}

// Função para atualizar campos adicionais com base no tipo de produto selecionado
function atualizarCamposAdicionais() {
  const productType = document.getElementById("productType") as HTMLSelectElement;
  const resolutionInput = document.getElementById("resolution") as HTMLInputElement;
  const sizeInchesInput = document.getElementById("sizeInches") as HTMLInputElement;
  const memoryInput = document.getElementById("memory") as HTMLInputElement;
  const wheelSizeInput = document.getElementById("wheelSize") as HTMLInputElement;

  // Esconder todos os campos adicionais
  resolutionInput.style.display = "none";
  sizeInchesInput.style.display = "none";
  memoryInput.style.display = "none";
  wheelSizeInput.style.display = "none";

  // Mostrar campos adicionais com base no tipo de produto selecionado
  const selectedType = productType.value;
  if (selectedType === "tv") {
    resolutionInput.style.display = "block";
    sizeInchesInput.style.display = "block";
  } else if (selectedType === "celular") {
    memoryInput.style.display = "block";
  } else if (selectedType === "bicicleta") {
    wheelSizeInput.style.display = "block";
  }
}

// Adicionar um evento de alteração ao menu suspenso "productType"
const productTypeDropdown = document.getElementById("productType") as HTMLSelectElement;
productTypeDropdown.addEventListener("change", atualizarCamposAdicionais);

// Inicializar os campos adicionais com base no valor inicial do menu suspenso
atualizarCamposAdicionais();

// Função para remover produto do carrinho
function removerDoCarrinho(index: number) {
  carrinho.listarProdutos().splice(index, 1);
  atualizarCarrinho();
}

// Adicionar um evento de clique ao botão "Adicionar ao Carrinho"
const addToCartButton = document.getElementById("addToCart") as HTMLButtonElement;
addToCartButton.addEventListener("click", adicionarAoCarrinho);

atualizarCarrinho();
