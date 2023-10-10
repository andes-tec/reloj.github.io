// Función para actualizar la hora y mostrarla en la página web
function updateTime() {
  const now = new Date(); // Obtiene la fecha y hora actual

  // Obtiene las horas, minutos y segundos y asegura que tengan al menos 2 caracteres
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // Crea una cadena de texto en formato HH:MM:SS
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Actualiza el contenido de un elemento HTML con el ID "time" con la hora actual
  document.getElementById("time").textContent = timeString;
}

// Llama a la función updateTime() para mostrar la hora inicial
updateTime();

// Establece un intervalo para llamar a updateTime() cada 1000 milisegundos (1 segundo)
setInterval(updateTime, 1000);


//--------------API PRONOSTICO---------------------------------------------------------------------

$(document).ready(function () {
  // URL de la API de pronóstico del tiempo (sustituye 'YOUR_API_KEY' con tu clave de API)
  const apiKey = 'b9622f228e2216ef0378f8c6324ec8c6';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Salta,ar&lang=es&appid=${apiKey}&units=metric`;

  // Realiza la solicitud GET a la API
  $.get(apiUrl, function (data) {
    console.log(data);

    // Accede a la descripción del clima desde la respuesta de la API
    const weatherDescription = data.weather[0].description;

    // Actualiza el contenido del div con la descripción del clima
    $('#weather-description').text(weatherDescription);

    // Obtiene la temperatura actual desde la respuesta de la API
    const temperature = data.main.temp;

    // Actualiza el contenido del div con la temperatura
    $('#temp').text(`${temperature}°C`);

    // Carga la imagen correspondiente al clima
    const weatherImage = getWeatherImage(weatherDescription);
    $('#temperatura-image').attr('src', weatherImage);
  });
});

// Función para obtener la imagen del clima
function getWeatherImage(weatherDescription) {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // Verifica si la descripción del clima es "cielo despejado" y es después de las 00:00 horas
  if (weatherDescription === 'cielo claro' && currentHour >= 0) {
    return 'assets/noche.png'; // Muestra la imagen de noche.png
  }
  switch (weatherDescription) {
    case 'cielo claro':
      return 'assets/soleado.gif';
    case 'pocas nubes':
    case 'nubes dispersas':
    case 'nubes rotas':
      return 'assets/nublado.png';
    case 'lluvia':
      return 'assets/lluvioso.png';
    case 'nieve':
      return 'assets/nevando.png';
    default:
      return 'assets/default.png'; // Imagen por defecto si no coincide con ninguna descripción
  }
}