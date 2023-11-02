document.addEventListener("DOMContentLoaded", function () {
  const preguntaElement = document.getElementById("question");
  const respuestasElement = document.getElementById("answer-buttons");
  const contadorAciertos = document.getElementById("contador-aciertos");

  let preguntas;
  let preguntaActual = 0;
  let aciertos = 0;
  let indice = 0;

  // Declaramos la función para cargar las preguntas desde el archivo JSON
  function cargarPreguntas() {
    fetch("preguntas.json")
      .then((response) => response.json())
      .then((data) => {
        preguntas = data;
        siguientePregunta();
      })
      .catch((error) => console.error("Error:", error));
  }
  // Función para mostrar la pregunta actual
  function siguientePregunta() {
    if (preguntaActual < preguntas.length) {
      const pregunta = preguntas[preguntaActual];
      indice++;
      preguntaElement.textContent = indice + "-" + pregunta.question;

      // Limpiar respuestas anteriores
      respuestasElement.innerHTML = "";

      // Crear botones de respuesta
      pregunta.answers.forEach((answer) => {
        const botonRespuesta = document.createElement("li");
        botonRespuesta.setAttribute("class", "botonRespuesta");
        botonRespuesta.textContent = answer;
        botonRespuesta.addEventListener("click", () =>
          comprobarRespuesta(answer, pregunta.correct)
        );
        respuestasElement.appendChild(botonRespuesta);
      });
    } else {
      // Se han completado todas las preguntas
      preguntaElement.textContent =
        "¡Felicidades, has completado todas las preguntas!";
      respuestasElement.innerHTML = "";
    }
  }
  // Función para comprobar si la respuesta es correcta
  function comprobarRespuesta(answer, correct) {
    const botonesRespuesta = document.querySelectorAll(".botonRespuesta");

    // Deshabilitar los botones para evitar más clics
    botonesRespuesta.forEach((boton) => {
      boton.removeEventListener("click", () => {
        // Evitar que se puedan hacer más selecciones de respuesta
      });
      boton.style.pointerEvents = "none"; // Deshabilitar clics en el botón
    });

    if (answer === correct) {
      aciertos++;
      contadorAciertos.textContent = `Aciertos: ${aciertos} de 50`;
    } else {
      // Cambiar el color del botón de respuesta incorrecta a rojo
      const respuestaIncorrecta = [...botonesRespuesta].find(
        (boton) => boton.textContent === answer
      );
      respuestaIncorrecta.style.backgroundColor = "indianRed";
    }
    // Cambiar el color del botón de respuesta correcta a verde
    const respuestaCorrecta = [...botonesRespuesta].find(
      (boton) => boton.textContent === correct
    );
    respuestaCorrecta.style.backgroundColor = "lightgreen";
    preguntaActual++;
    setTimeout(siguientePregunta, 1000);
  }
  // Iniciar la aplicación cargando las preguntas
  cargarPreguntas();
});
