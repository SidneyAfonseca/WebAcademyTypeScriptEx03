import { Produto } from "'./produto.interface";

class Bicicleta implements Produto {
  constructor(
      public modelo: string,
      public fabricante: string,
      public preco: number,
      public tamanhoAro: number
  ) {}
}

export default Bicicleta;