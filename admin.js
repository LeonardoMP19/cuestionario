let preguntas = [];

const listaPreguntas = document.getElementById("listaPreguntas");
const form = document.getElementById("formPregunta");
const input = document.getElementById("textoPregunta");

function cargarPreguntas() {
  fetch("preguntas.json")
    .then(res => res.json())
    .then(data => {
      preguntas = data;
      mostrarPreguntas();
    });
}

function mostrarPreguntas() {
  listaPreguntas.innerHTML = "";
  preguntas.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input value="${p.pregunta}" onchange="editarPregunta(${index}, this.value)" />
      <button onclick="borrarPregunta(${index})">❌</button>
    `;
    listaPreguntas.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto !== "") {
    preguntas.push({ id: "p" + Date.now(), pregunta: texto });
    input.value = "";
    mostrarPreguntas();
  }
});

function editarPregunta(index, nuevoTexto) {
  preguntas[index].pregunta = nuevoTexto;
}

function borrarPregunta(index) {
  preguntas.splice(index, 1);
  mostrarPreguntas();
}

function guardarPreguntas() {
  const contenido = JSON.stringify(preguntas, null, 2);
  const blob = new Blob([contenido], { type: "application/json" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "preguntas.json";
  enlace.click();
}

cargarPreguntas();
function mostrarRespuestas() {
  const datos = JSON.parse(localStorage.getItem('respuestas')) || [];
  const tabla = document.getElementById('tablaRespuestas');
  if (!tabla) return;

  if (datos.length === 0) {
    tabla.innerHTML = '<tr><td>No hay respuestas todavía.</td></tr>';
    return;
  }

  const encabezados = Object.keys(datos[0]);
  let html = '<tr>' + encabezados.map(h => `<th>${h}</th>`).join('') + '</tr>';

  datos.forEach(resp => {
    html += '<tr>' + encabezados.map(h => `<td>${resp[h] || ''}</td>`).join('') + '</tr>';
  });

  tabla.innerHTML = html;
}

function descargarCSV() {
  const datos = JSON.parse(localStorage.getItem('respuestas')) || [];
  if (datos.length === 0) {
    alert('No hay respuestas para descargar.');
    return;
  }

  const encabezados = Object.keys(datos[0]);
  const filas = datos.map(obj => encabezados.map(e => `"${obj[e] || ''}"`).join(','));
  const csv = [encabezados.join(','), ...filas].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'respuestas.csv';
  link.click();
}

mostrarRespuestas();
