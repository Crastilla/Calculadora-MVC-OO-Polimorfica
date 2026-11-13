export const SIMBOLOS = {
  soma: "+",
  subtracao: "-",
  multiplicacao: "x",
  divisao: "/",
};

export function somar(a, b) {
  return a + b;
}

export function subtrair(a, b) {
  return a - b;
}

export function multiplicar(a, b) {
  return a * b;
}

export function dividir(a, b) {
  if (b === 0) {
    throw new Error("Não é possível dividir por zero.");
  }
  return a / b;
}

export function calcular(tipo, a, b) {
  switch (tipo) {
    case "soma":
      return somar(a, b);
    case "subtracao":
      return subtrair(a, b);
    case "multiplicacao":
      return multiplicar(a, b);
    case "divisao":
      return dividir(a, b);
    default:
      throw new Error("Operação desconhecida.");
  }
}
