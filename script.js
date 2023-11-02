document.addEventListener("DOMContentLoaded", function () {
  // const preguntaContainer = document.getElementById("quiz");
  const preguntaElement = document.getElementById("question");
  const respuestasElement = document.getElementById("answer-buttons");
  const contadorAciertos = document.getElementById("contador-aciertos");
  const puntuacionFinal = document.getElementById("puntuacion-final");
  const puntuacion = document.getElementById("puntuacion");

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
