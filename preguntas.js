fetch('preguntas.json')
  .then(res => res.json())
  .then(preguntas => {
    const formulario = document.getElementById('formulario');

    preguntas.forEach(p => {
      const div = document.createElement('div');
      div.innerHTML = `
        <label for="input-${p.id}">${p.pregunta}</label><br>
        <input id="input-${p.id}" name="${p.id}" type="text" /><br><br>
      `;
      formulario.appendChild(div);
    });

    document.getElementById('enviar').addEventListener('click', () => {
      const respuestas = {};
      preguntas.forEach(p => {
        const valor = document.querySelector(`[name="${p.id}"]`).value.trim();
        respuestas[p.pregunta] = valor;
      });

      // Guarda las respuestas en localStorage (array de respuestas)
      const anteriores = JSON.parse(localStorage.getItem('respuestas')) || [];
      anteriores.push(respuestas);
      localStorage.setItem('respuestas', JSON.stringify(anteriores));

      alert('Gracias por responder');
      formulario.reset?.(); // Si formulario es form, resetea inputs
    });
  })
  .catch(error => {
    console.error('Error cargando preguntas:', error);
  });

