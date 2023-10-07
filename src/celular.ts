import { Produto } from './produto.interface';

class Celular implements Produto {
  constructor(
      public modelo: string,
      public fabricante: string,
      public preco: number,
      public memoria: string
  ) {}
}

export default Celular;