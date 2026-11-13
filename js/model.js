// js/model.js
// MODEL: regras de negócio. Não conhece HTML, DOM nem localStorage.

export class Operacao {
  constructor(valor1, valor2) {
    this.valor1 = valor1;
    this.valor2 = valor2;
  }

  calcular() {
    throw new Error("Método deve ser implementado!");
  }
}

export class Soma extends Operacao {
  calcular() {
    return this.valor1 + this.valor2;
  }
}

export class Subtracao extends Operacao {
  calcular() {
    return this.valor1 - this.valor2;
  }
}

export class Multiplicacao extends Operacao {
  calcular() {
    return this.valor1 * this.valor2;
  }
}

export class Divisao extends Operacao {
  calcular() {
    if (this.valor2 === 0) {
      throw new Error("Não é possível dividir por zero.");
    }
    return this.valor1 / this.valor2;
  }
}

export const OPERACOES = {
  soma: Soma,
  subtracao: Subtracao,
  multiplicacao: Multiplicacao,
  divisao: Divisao,
};

export const SIMBOLOS = {
  soma: "+",
  subtracao: "-",
  multiplicacao: "x",
  divisao: "/",
};
