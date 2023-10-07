"use strict";
// Classe Carrinho de Compras
class CarrinhoDeCompras {
    constructor() {
        this.produtos = [];
    }
    adicionarProduto(produto) {
        this.produtos.push(produto);
        console.log(this.produtos);
    }
    calcularTotal() {
        return this.produtos.reduce((total, produto) => total + produto.preco, 0);
    }
    listarProdutos() {
        return this.produtos;
    }
}
// Classes para os produtos: TV, Celular e Bicicleta
class TV {
    constructor(modelo, fabricante, preco, resolucao, tamanhoPolegadas) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.preco = preco;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
    }
}
class Celular {
    constructor(modelo, fabricante, preco, memoria) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.preco = preco;
        this.memoria = memoria;
    }
}
class Bicicleta {
    constructor(modelo, fabricante, preco, tamanhoAro) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.preco = preco;
        this.tamanhoAro = tamanhoAro;
    }
}
// Função para atualizar a lista de produtos no carrinho
function atualizarCarrinho() {
    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");
    console.log(cartList);
    if (cartList) {
        cartList.innerHTML = "";
        const produtosNoCarrinho = carrinho.listarProdutos();
        console.log(produtosNoCarrinho);
        produtosNoCarrinho.forEach((produto, index) => {
            console.log(produto);
            console.log(typeof produto);
            const listItem = document.createElement("li");
            if (produto instanceof TV) {
                listItem.innerHTML = `
              TV - Modelo:${produto.modelo} - Fabricante:${produto.fabricante} - Preço:R$ ${produto.preco.toFixed(2)} </br> 
              Resolução: ${produto.resolucao} - Tamanho polegadas: ${produto.tamanhoPolegadas} 
              <button class="button-remove" onclick="removerDoCarrinho(${index})">Remover</button>
          `;
            }
            if (produto instanceof Celular) {
                listItem.innerHTML = `
              Modelo:${produto.modelo} - Fabricante:${produto.fabricante} - Preço:R$ ${produto.preco.toFixed(2)}
              - Memória: ${produto.memoria}
              <button class="button-remove" onclick="removerDoCarrinho(${index})">Remover</button>
          `;
            }
            if (produto instanceof Bicicleta) {
                listItem.innerHTML = `
              Modelo:${produto.modelo} - Fabricante:${produto.fabricante} - Preço:R$ ${produto.preco.toFixed(2)} </br> 
              Tamanho Aro: ${produto.tamanhoAro} 
              <button class="button-remove" onclick="removerDoCarrinho(${index})">Remover</button>
          `;
            }
            console.log(listItem);
            cartList.appendChild(listItem);
        });
    }
    const total = carrinho.calcularTotal();
    console.log(cartTotal);
    if (cartTotal)
        cartTotal.textContent = total.toFixed(2);
}
// Função para adicionar produto ao carrinho
function adicionarAoCarrinho() {
    const productType = document.getElementById("productType");
    const modelInput = document.getElementById("model");
    const manufacturerInput = document.getElementById("manufacturer");
    const priceInput = document.getElementById("price");
    const resolution = document.getElementById("resolution");
    const sizeInches = document.getElementById("sizeInches");
    const memory = document.getElementById("memory");
    const wheelSize = document.getElementById("wheelSize");
    const tipoProduto = productType.value;
    const modelo = modelInput.value;
    const fabricante = manufacturerInput.value;
    const preco = parseFloat(priceInput.value);
    const resoulcao = resolution.value;
    const tamanhoPolegadas = Number.parseInt(sizeInches.value);
    const memoria = memory.value;
    const tamanhoAro = Number.parseInt(wheelSize.value);
    if (modelo && fabricante && !isNaN(preco) && preco > 0) {
        let produto;
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
    const productType = document.getElementById("productType");
    const resolutionInput = document.getElementById("resolution");
    const sizeInchesInput = document.getElementById("sizeInches");
    const memoryInput = document.getElementById("memory");
    const wheelSizeInput = document.getElementById("wheelSize");
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
    }
    else if (selectedType === "celular") {
        memoryInput.style.display = "block";
    }
    else if (selectedType === "bicicleta") {
        wheelSizeInput.style.display = "block";
    }
}
// Adicionar um evento de alteração ao menu suspenso "productType"
const productTypeDropdown = document.getElementById("productType");
productTypeDropdown.addEventListener("change", atualizarCamposAdicionais);
// Inicializar os campos adicionais com base no valor inicial do menu suspenso
atualizarCamposAdicionais();
// Função para remover produto do carrinho
function removerDoCarrinho(index) {
    carrinho.listarProdutos().splice(index, 1);
    atualizarCarrinho();
}
// Adicionar um evento de clique ao botão "Adicionar ao Carrinho"
const addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", adicionarAoCarrinho);
// Inicializar o carrinho
const carrinho = new CarrinhoDeCompras();
// Inicializar o carrinho de compras na página
atualizarCarrinho();
