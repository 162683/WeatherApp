
  
  const API_KEY = "5cac41e4b55530410385b093afae06ea"

async function obterCidadeTempo(city) {
  const apiURL =`https://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=${5}&appid=${API_KEY}`;
  try {
    const response = await fetch(apiURL);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos del clima:",
      error);
  }
}

async function obterCoordenadas() {

    let buscar = document.getElementById("buscar").value;
    let resultados = document.getElementById("resultados");

    const data = await obterCidadeTempo(buscar);


    if(buscar){

        let resultadosHTML = ""

        if(data && data.length > 0){
            data.forEach(coord => {
                resultadosHTML += `
            <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="./assets/pngtree-planet-space-illustration-background-image_2127745.jpg" alt="Image" />
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${coord.name}</strong> <small>${coord.country}</small>
        </p>
        <p>latitude=${coord.lat}</p>
        <p>lonxitude=${coord.lon}</p>

        <button onclick="abrirDetalleMeteo(${coord.lat},${coord.lon})" class="button">Ver máis</button>
      </div>
    </div>
  </article>
</div>
            `
            });
            resultados.innerHTML = resultadosHTML

        }else{
            resultados.innerHTML = "<p>Non hai datos</p>"

        }

    }else{
        resultados.innerHTML = "<p>Introduce unha cidade válida</p>"
    }
    
}



function abrirDetalleMeteo(lat,lon) {
 const urlDetalle = `index.html?lat=${lat}&lon=${lon}`;
 window.open(urlDetalle, '_self');
}





