fetch('preguntas.json')
  .then(res => res.json())
  .then(preguntas => {
    const formulario = document.getElementById('formulario');

    preguntas.forEach(p => {
      const div = document.createElement('div');
      div.innerHTML = `
        <label>${p.pregunta}</label><br>
        <input name="${p.id}" type="text" /><br><br>
      `;
      formulario.appendChild(div);
    });

    document.getElementById('enviar').addEventListener('click', () => {
      const respuestas = {};
      preguntas.forEach(p => {
        const valor = document.querySelector(`[name="${p.id}"]`).value;
        respuestas[p.id] = valor;
      });
      console.log('Respuestas:', respuestas);
      alert('Gracias por responder');
    });
  });
