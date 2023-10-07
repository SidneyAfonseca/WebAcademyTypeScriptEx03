import { Produto } from './produto.interface';

// Classe Carrinho de Compras
class CarrinhoDeCompras<T extends Produto> {
    private produtos: T[] = [];
  
    adicionarProduto(produto: T) {
        this.produtos.push(produto);
        console.log(this.produtos)
    }
  
    calcularTotal(): number {
        return this.produtos.reduce((total, produto) => total + produto.preco, 0);
    }
  
    listarProdutos(): T[] {
        return this.produtos;
    }

  }

export default CarrinhoDeCompras;