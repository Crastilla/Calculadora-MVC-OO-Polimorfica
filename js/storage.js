const CHAVE_HISTORICO = "historico-calculadora";
const CHAVE_TEMA = "tema-calculadora";

export function carregarHistorico() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_HISTORICO)) ?? [];
  } catch {
    return [];
  }
}

export function salvarHistorico(historico) {
  localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
}

export function carregarTema() {
  return localStorage.getItem(CHAVE_TEMA) ?? "1";
}

export function salvarTema(tema) {
  localStorage.setItem(CHAVE_TEMA, tema);
}
