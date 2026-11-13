import { OPERACOES, SIMBOLOS } from "./model.js";
import {
  carregarHistorico,
  salvarHistorico,
  carregarTema,
  salvarTema,
} from "./storage.js";

const visor = document.getElementById("visor");
const mensagem = document.getElementById("mensagem");
const teclado = document.getElementById("teclado");
const listaHistorico = document.getElementById("historico");
const seletorTema = document.getElementById("tema");
const botaoHistorico = document.getElementById("botao-historico");
const painelHistorico = document.getElementById("painel-historico");

const historico = carregarHistorico();

let anterior = null; // primeiro número da conta
let operacaoAtual = null; // "soma", "subtracao", "multiplicacao" ou "divisao"
let entrada = "0"; // número que está sendo digitado
let novaEntrada = false; // true = o próximo dígito começa um número novo

// ---------- View ----------
function atualizarVisor() {
  if (operacaoAtual === null) {
    visor.textContent = entrada;
  } else if (novaEntrada) {
    visor.textContent = `${anterior} ${SIMBOLOS[operacaoAtual]}`;
  } else {
    visor.textContent = `${anterior} ${SIMBOLOS[operacaoAtual]} ${entrada}`;
  }
}

function renderizarHistorico() {
  listaHistorico.innerHTML = "";

  if (historico.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Nenhum cálculo ainda.";
    listaHistorico.appendChild(li);
    return;
  }

  historico.forEach((linha) => {
    const li = document.createElement("li");
    li.textContent = linha;
    listaHistorico.appendChild(li);
  });
}

function aplicarTema(tema) {
  document.body.dataset.tema = tema;
  seletorTema.value = tema;
}

// ---------- Fluxo da calculadora ----------
function digitar(digito) {
  if (novaEntrada || entrada === "0") {
    entrada = digito;
  } else {
    entrada += digito;
  }
  novaEntrada = false;
}

function ponto() {
  if (novaEntrada) {
    entrada = "0.";
    novaEntrada = false;
  } else if (!entrada.includes(".")) {
    entrada += ".";
  }
}

function apagar() {
  if (novaEntrada) return;
  entrada = entrada.length > 1 ? entrada.slice(0, -1) : "0";
}

function resetar() {
  anterior = null;
  operacaoAtual = null;
  entrada = "0";
  novaEntrada = false;
  mensagem.textContent = "";
}

function resolver() {
  const b = parseFloat(entrada);
  try {
    // Polimorfismo: escolhe a classe pelo tipo e chama sempre o mesmo método
    const Classe = OPERACOES[operacaoAtual];
    if (!Classe) {
      throw new Error("Operação desconhecida.");
    }
    const op = new Classe(anterior, b);

    // toFixed evita resultados como 0.30000000000000004
    const resultado = parseFloat(op.calcular().toFixed(10));

    historico.push(
      `${anterior} ${SIMBOLOS[operacaoAtual]} ${b} = ${resultado}`,
    );
    salvarHistorico(historico);
    renderizarHistorico();

    entrada = String(resultado);
    anterior = null;
    operacaoAtual = null;
    novaEntrada = true;
    return true;
  } catch (erro) {
    resetar();
    mensagem.textContent = erro.message;
    return false;
  }
}
function escolherOperacao(tipo) {
  // Se já existe uma conta pendente com o segundo número digitado, resolve antes
  if (operacaoAtual !== null && !novaEntrada) {
    if (!resolver()) return;
  }
  anterior = parseFloat(entrada);
  operacaoAtual = tipo;
  novaEntrada = true;
}

function igual() {
  if (operacaoAtual === null || novaEntrada) return;
  resolver();
}

// ---------- Eventos ----------
teclado.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button");
  if (!botao) return;

  mensagem.textContent = "";

  if (botao.dataset.num !== undefined) {
    digitar(botao.dataset.num);
  } else if (botao.dataset.operacao) {
    escolherOperacao(botao.dataset.operacao);
  } else if (botao.dataset.acao === "ponto") {
    ponto();
  } else if (botao.dataset.acao === "del") {
    apagar();
  } else if (botao.dataset.acao === "reset") {
    resetar();
  } else if (botao.dataset.acao === "igual") {
    igual();
  }

  atualizarVisor();
});

seletorTema.addEventListener("input", () => {
  aplicarTema(seletorTema.value);
  salvarTema(seletorTema.value);
});

botaoHistorico.addEventListener("click", () => {
  const abrir = painelHistorico.hidden;
  painelHistorico.hidden = !abrir;
  botaoHistorico.setAttribute("aria-expanded", String(abrir));
  botaoHistorico.textContent = abrir ? "OCULTAR HISTÓRICO" : "VER HISTÓRICO";
});

aplicarTema(carregarTema());
renderizarHistorico();
atualizarVisor();
