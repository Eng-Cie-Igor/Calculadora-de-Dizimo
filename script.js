function mascaraMoeda(campo) {
  // Remove tudo que não for número (pontos, vírgulas, letras etc.)
  var valor = campo.value.replace(/\D/g, "");

  // Se apagou tudo, deixa o campo vazio
  if (valor === "") {
    campo.value = "";
    return;
  }

  // Trata os números digitados como centavos e divide por 100
  // Exemplo: se a pessoa digitar 115110, vira 1151.10
  valor = (parseInt(valor, 10) / 100).toFixed(2);

  // Troca o ponto decimal por vírgula (padrão brasileiro)
  valor = valor.replace(".", ",");

  // Coloca o ponto de milhar (transforma 1151,10 em 1.151,10)
  valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  campo.value = valor;
}

function converterParaNumero(valorTexto) {
  // Tira os pontos de milhar e troca a vírgula decimal por ponto,
  // pra transformar "1.151,10" em 1151.10 (que o JavaScript entende como número)
  valorTexto = valorTexto.replace(/\./g, "").replace(",", ".");
  return Number(valorTexto);
}

function calcular() {
  var textoRenda = document.getElementById("renda").value;
  var renda = converterParaNumero(textoRenda);

  // Se não digitou nada válido, não faz nada
  if (renda <= 0 || isNaN(renda)) {
    return;
  }

  var dizimo = renda * 0.10;

  var fraseDizimo = "Seu dízimo é R$ " + dizimo.toFixed(2).replace(".", ",");
  
  document.getElementById("fraseDizimo").innerText = fraseDizimo;
  
  document.getElementById("etapaPergunta").classList.add("escondido");
  document.getElementById("etapaResultado").classList.remove("escondido");
  document.getElementById("etapaResultado").classList.add("aparecendo");
}

function calcularNovamente() {
  document.getElementById("renda").value = "";
  document.getElementById("etapaResultado").classList.add("escondido");
  document.getElementById("etapaPergunta").classList.remove("escondido");
}