self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("gastos-v1").then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./styles.css",
        "./app.js"
      ])
    )
  );
});
