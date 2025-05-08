//Navbar BulmaCSS Mobile
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});



// API OpenWeatherMaps

const API_KEY = "5cac41e4b55530410385b093afae06ea"

//Obter os parámetros de coordenadas da URL

const params = new URLSearchParams(window.location.search);
const lat = params.get('lat');
const lon = params.get('lon');
if (lat && lon) {
    actualizarDatos(lat, lon);
    obterDatosPronostico(lat, lon)
} else {
 // Valores por defecto
 actualizarDatos(42.84, -8.57);
 obterDatosPronostico(42.84, -8.57)
}



async function obterDatosTempo(lat, lon) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=gl`
  try {
    const response = await fetch(apiURL);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos del clima:",
      error);
  }
}
var imagendia = document.getElementById("imagendia");
var imagennoite = document.getElementById("imagennoite")
var contedor = document.getElementById("contedor")

console.log(obterDatosTempo("42.845, -8.5782"))

async function actualizarDatos(lon, lat) {

  const data = await obterDatosTempo(lon, lat);

  if (data) {
    document.getElementById("ClimaTemperatura").innerHTML = `${Math.round(data.main.temp)}ºC`;
    document.getElementById("weatherIcon").src = `./assets/iconos/${data.weather[0].icon}.png`;
    document.getElementById("feellike").innerHTML = `${Math.round(data.main.feels_like)}ºC`;
    document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
    document.getElementById("tempMax").innerHTML = `${Math.round(data.main.temp_max)}ºC`;
    document.getElementById("tempMin").innerHTML = `${Math.round(data.main.temp_min)}ºC`;
    document.getElementById("location").innerHTML = `${data.name}`;
    document.getElementById("description").innerHTML = `${data.weather[0].description}`;
    document.getElementById("location").innerHTML = `${data.name}`
    //hora actual
    let fechaPronostico = (data.dt) * 1000;
    let fecha = new Date(fechaPronostico);

    let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    let fechaFinal = fecha.toLocaleDateString("es-ES", options);
    console.log(fechaFinal);

    document.getElementById("local").innerHTML = fechaFinal;



    // Abrente
    let abrenteTimestamp = data.sys.sunrise * 1000;
    let abrenteAPI = new Date(abrenteTimestamp);
    console.log(abrenteAPI);

    let horaAbrente = abrenteAPI.getHours()
    console.log(horaAbrente)
    let minutosAbrente = abrenteAPI.getMinutes()

    let abrenteTotal = `${horaAbrente}:${minutosAbrente}h`;
    console.log(abrenteTotal)

    document.getElementById("abrente").innerHTML = abrenteTotal;

    //Solpor
    let solporTimestamp = data.sys.sunset * 1000;
    let solporAPI = new Date(solporTimestamp);
    console.log(solporAPI);
    let horaSolpor = solporAPI.getHours()
    console.log(horaSolpor)
    let minutosSolpor = solporAPI.getMinutes()
    let solporTotal = `${horaSolpor}:${minutosSolpor}h`;
    console.log(solporTotal)

    document.getElementById("solpor").innerHTML = solporTotal;


    // fondo cambiante


    function cambiarFondo() {
      let horaActual = new Date(fechaPronostico);
      if (horaActual > abrenteAPI && horaActual < solporAPI) {
        document.body.classList.remove("noite");
        document.body.classList.add("dia")
      }
      else {
        document.body.classList.remove("dia");
        document.body.classList.add("noite")
      }
    }

    cambiarFondo()
  }


}


actualizarDatos(42.84, -8.57)


//Pronóstico por horas
async function obterDatosPronostico(lat, lon) {
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=gl`
  try {
    const response = await fetch(apiURL);
    const dataForecast = await response.json();
    console.log(dataForecast)
    actualizarForecast(dataForecast)
  } catch (error) {
    console.error("Error al obtener datos del clima:", error);
  }
}

function actualizarForecast(dataForecast) {
  
  let containerForecast = document.getElementById("containerForecast");
  let templateForecast = document.getElementById("templateForecast");
  containerForecast.innerHTML = "";
  

  dataForecast.list.forEach(forecast =>{
    let clone = templateForecast.content.cloneNode(true)
    clone.querySelector("#horaForecast").textContent = new Date(forecast.dt * 1000).getHours() + "h";
    clone.querySelector("#iconoForecast").src = `./assets/iconos/${forecast.weather[0].icon}.png`;
    clone.querySelector("#temperaturaForecast").textContent = `${Math.round(forecast.main.temp)}º`;


    containerForecast.appendChild(clone);
  })

}