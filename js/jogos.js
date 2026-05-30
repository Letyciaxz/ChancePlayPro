/* =========================
   HISTÓRICO COM LOCALSTORAGE
========================= */

function salvarHistorico(jogo, tipo, resultado, probabilidade) {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];

  historico.unshift({
    jogo,
    tipo,
    resultado,
    probabilidade,
    data: new Date().toLocaleString("pt-BR")
  });

  localStorage.setItem("historico", JSON.stringify(historico));

  alert("Cálculo salvo no histórico!");
}

/* =========================
   MEGA-SENA
========================= */

let numerosMega = [];

document.querySelectorAll(".numbers-grid button").forEach(botao => {
  botao.addEventListener("click", () => {
    const numero = botao.textContent.trim();

    if (numerosMega.includes(numero)) {
      numerosMega = numerosMega.filter(n => n !== numero);
      botao.classList.remove("selecionado");
    } else {
      if (numerosMega.length >= 15) {
        alert("Você só pode selecionar até 15 números.");
        return;
      }

      numerosMega.push(numero);
      botao.classList.add("selecionado");
    }

    const contador = document.querySelector(".selected");

    if (contador) {
      contador.textContent = "Selecionados: " + numerosMega.length;
    }
  });
});

function salvarMegaSena() {
  if (numerosMega.length < 6) {
    alert("Selecione pelo menos 6 números.");
    return;
  }

  const select = document.querySelector("select");
  const tipo = select ? select.value : "Sena (6 de 6)";

  let resultado = "";
  let probabilidade = "";

  if (tipo.includes("Sena")) {
    resultado = "1 em 50.063.860";
    probabilidade = "0.000002%";
  } else if (tipo.includes("Quina")) {
    resultado = "1 em 154.518";
    probabilidade = "0.000647%";
  } else {
    resultado = "1 em 2.332";
    probabilidade = "0.0428%";
  }

  salvarHistorico(
    "Mega-Sena",
    tipo,
    "Números escolhidos: " + numerosMega.join(", ") + " | " + resultado,
    probabilidade
  );
}
/* =========================
   BARALHO
========================= */

function salvarBaralho() {
  const inputs = document.querySelectorAll("input");

  const cartasTirar = Number(inputs[0]?.value || 1);
  const cartasBaralho = Number(inputs[1]?.value || 52);
  const cartasFavoraveis = Number(inputs[2]?.value || 4);

  if (cartasFavoraveis > cartasBaralho) {
    alert("Cartas favoráveis não podem ser maiores que o total do baralho.");
    return;
  }

  const probabilidadeNumero = (cartasFavoraveis / cartasBaralho) * 100;

  salvarHistorico(
    "Baralho",
    "Cartas favoráveis",
    `Tirando ${cartasTirar} carta(s), com ${cartasFavoraveis} favorável(is) em ${cartasBaralho}`,
    probabilidadeNumero.toFixed(2) + "%"
  );
}

/* =========================
   DADO
========================= */

document.querySelectorAll(".dice-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".dice-card").forEach(c =>
      c.classList.remove("active")
    );

    card.classList.add("active");
  });
});

function salvarDado() {
  const select = document.querySelector("select");
  const quantidade = select ? Number(select.value.replace(/\D/g, "")) || 1 : 1;

  const faceSelecionada = document.querySelector(".dice-card.active");
  const face = faceSelecionada ? faceSelecionada.textContent : "⚀";

  const total = Math.pow(6, quantidade);
  const probabilidade = (1 / total) * 100;

  salvarHistorico(
    "Dado",
    quantidade + " dado(s)",
    `Face escolhida: ${face} | 1 em ${total}`,
    probabilidade.toFixed(2) + "%"
  );
}

/* =========================
   DOMINÓ
========================= */

document.querySelectorAll(".domino-piece").forEach(piece => {
  piece.addEventListener("click", () => {
    document.querySelectorAll(".domino-piece").forEach(p =>
      p.classList.remove("active")
    );

    piece.classList.add("active");
  });
});

function salvarDomino() {
  const input = document.querySelector("input");
  const restantes = Number(input?.value || 28);

  if (restantes < 1 || restantes > 28) {
    alert("Digite um número de peças entre 1 e 28.");
    return;
  }

  const pecaSelecionada = document.querySelector(".domino-piece.active");
  const peca = pecaSelecionada
    ? pecaSelecionada.textContent.trim().replace(/\s+/g, "|")
    : "0|0";

  const probabilidade = (1 / restantes) * 100;

  salvarHistorico(
    "Dominó",
    "Peça específica",
    `Peça escolhida: ${peca} | 1 em ${restantes}`,
    probabilidade.toFixed(2) + "%"
  );
}

/* =========================
   MOEDA
========================= */

function flipCoin() {
  const moeda = document.getElementById("coin");

  if (!moeda) return;

  moeda.classList.add("flip");

  setTimeout(() => {
    moeda.textContent = Math.random() < 0.5 ? "🙂" : "🪙";
    moeda.classList.remove("flip");
  }, 500);
}

function salvarMoeda() {
  const inputs = document.querySelectorAll("input");
  const lancamentos = Number(inputs[0]?.value || 1);

  if (lancamentos < 1) {
    alert("Digite pelo menos 1 lançamento.");
    return;
  }

  const total = Math.pow(2, lancamentos);
  const probabilidade = (1 / total) * 100;

  salvarHistorico(
    "Moeda",
    lancamentos + " lançamento(s)",
    `1 em ${total}`,
    probabilidade.toFixed(2) + "%"
  );
}