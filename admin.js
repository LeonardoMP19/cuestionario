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
