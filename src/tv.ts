import { Produto } from "../src/produto.interface";

class TV implements Produto {
  constructor(
      public modelo: string,
      public fabricante: string,
      public preco: number,
      public resolucao: string,
      public tamanhoPolegadas: number
  ) {}
}

export default TV;
