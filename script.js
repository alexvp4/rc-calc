function calculate() {
  const rcMkt = parseFloat(document.getElementById("value1").value) || 0;
  const castleMkt = parseFloat(document.getElementById("value2").value) || 0;
  const option = document.getElementById("value3").value;

  let charges, price, coins;

  switch (option) {
    case "Exercise":
      charges = 500;
      price = 347222;
      coins = 40;
      break;
    case "Durable":
      charges = 1800;
      price = 1250000;
      coins = 90;
      break;
    case "Lasting":
      charges = 14400;
      price = 10000000;
      coins = 190;
      break;
    case "Daily":
      charges = 45000;
      price = 31250000;
      coins = 390;
      break;
    default:
      charges = 0;
      price = 0;
      coins = 0;
  }

  document.getElementById("value4").value = charges;

  // Cálculos para os cenários
  const c4 = rcMkt * 390;
  const c2 = rcMkt * coins;
  const c3 = castleMkt * 3;
  const castleCharges = 14400;
  const scenarios = [
    { name: "no NPC", valorBruto: price, valorUnitario: price / charges },
    { name: "na Store", valorBruto: c2, valorUnitario: c2 / charges },
    {
      name: "com Castle Coins",
      valorBruto: c3,
      valorUnitario: c3 / castleCharges,
    },
  ];

  // Calcula o valor unitário para a opção "Daily"
  const dailyUnitPrice = c4 / 45000; // preço / cargas para "Daily"

  // Encontrando o cenário com o menor valor unitário
  let minScenario = scenarios[0];
  for (let i = 1; i < scenarios.length; i++) {
    if (scenarios[i].valorUnitario < minScenario.valorUnitario) {
      minScenario = scenarios[i];
    }
  }

  // Exibindo os resultados
  const resultDiv = document.getElementById("result");
  if (charges > 0) {
    document.getElementById("result").value = `Compra ${
      minScenario.name
    } tem o menor valor unitário de ${minScenario.valorUnitario.toFixed(
      2
    )} gp por carga.`;
  } else {
    document.getElementById(
      "result"
    ).value = `Preenche as informações primeiro paizão.`;
  }

  // Exibe o aviso somente se o Daily não for a opção selecionada e se o valor unitário for maior que o do Daily
  const warningDiv = document.getElementById("warning");
  if (option !== "Daily" && minScenario.valorUnitario > dailyUnitPrice) {
    warningDiv.style.display = "block";
  } else {
    warningDiv.style.display = "none";
  }
}

// Adicionar ouvintes de eventos para limpar o resultado e esconder o aviso quando qualquer entrada for modificada
document.getElementById("value1").addEventListener("input", clearResults);
document.getElementById("value2").addEventListener("input", clearResults);
document.getElementById("value3").addEventListener("change", clearResults);

// Adicionar ouvinte de evento ao botão "Calcular" para executar o cálculo
document.getElementById("calculate").addEventListener("click", calculate);

function clearResults() {
  document.getElementById("result").value = "";
  document.getElementById("warning").style.display = "none"; // Esconde o aviso quando qualquer entrada for alterada
}
