// Nome da "caixa" onde os arquivos ficam guardados no celular
var nomeCache = "dizimo-cache-v1";

// Lista de arquivos que vão ficar salvos pra funcionar offline
var arquivosParaSalvar = [
  "index.html",
  "style.css",
  "script.js"
];

// Quando o service worker é instalado, ele salva os arquivos no cache
self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(nomeCache).then(function (cache) {
      return cache.addAll(arquivosParaSalvar);
    })
  );
});

// Quando o app pede um arquivo, primeiro olha se já tem salvo no celular
self.addEventListener("fetch", function (evento) {
  evento.respondWith(
    caches.match(evento.request).then(function (respostaSalva) {
      return respostaSalva || fetch(evento.request);
    })
  );
});
