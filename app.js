const meses = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

let mesActual = new Date().getMonth();
let datos = JSON.parse(localStorage.getItem("datos")) || {};

const mesTitulo = document.getElementById("mes");
const lista = document.getElementById("lista");
const saldoEl = document.getElementById("saldo");
const modal = document.getElementById("modal");

function render() {
  mesTitulo.textContent = meses[mesActual];
  lista.innerHTML = "";

  let saldo = 0;
  (datos[mesActual] || []).forEach(m => {
    saldo += (m.credito || 0) - (m.debito || 0);

    lista.innerHTML += `
      <tr>
        <td>${m.fecha}</td>
        <td>${m.detalle}</td>
        <td>${m.credito || ""}</td>
        <td>${m.debito || ""}</td>
      </tr>
    `;
  });

  saldoEl.textContent = saldo;
  localStorage.setItem("datos", JSON.stringify(datos));
}

document.getElementById("agregar").onclick = () => modal.style.display = "block";
function cerrar(){ modal.style.display = "none"; }

function guardar() {
  const mov = {
    fecha: fecha.value,
    detalle: detalle.value,
    credito: Number(credito.value),
    debito: Number(debito.value)
  };

  datos[mesActual] = datos[mesActual] || [];
  datos[mesActual].push(mov);
  cerrar();
  render();
}

let inicioX = 0;
document.addEventListener("touchstart", e => inicioX = e.touches[0].clientX);
document.addEventListener("touchend", e => {
  let finX = e.changedTouches[0].clientX;
  if (finX - inicioX > 80 && mesActual > 0) mesActual--;
  if (inicioX - finX > 80 && mesActual < 11) mesActual++;
  render();
});

render();

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
