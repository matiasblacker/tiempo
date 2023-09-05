
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})




function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    console.log(ciudad);
    console.log(pais);

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios')

        return;
    }
    consultarAPI(ciudad, pais );
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');
  if(!alerta) {
      const alerta = document.createElement('div');

      alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );

      alerta.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">${mensaje}</span>
      `;

      container.appendChild(alerta);
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }
}

function consultarAPI(ciudad, pais ) {
        // Consultar la API e imprimir el Resultado...

    // leer la url  y agregar el API key
    const appId = 'bc357b9c9ea75c9773cd93f76db52914';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&lang=es&units=metric`;

    Spinner();

    // query con fetch api
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        console.log(datos);
        limpiarHTML();
        if(datos.cod === "404") {
          mostrarError('Ciudad No Encontrada')
        } else {
          mostrarClima(datos)
        }
      })
      .catch(error => {
        console.log(error)
      });
}

function mostrarClima(datos) {

  // Formatear el Clima...

  const { name, main: { temp, temp_max, temp_min, humidity }, weather:[arr] } = datos;

  console.log(name);
  console.log(temp);
  console.log(temp_max);
  console.log(temp_min);

  const grados = (temp);
  const min = (temp_max);
  const max = (temp_min);
  const humedad = (humidity);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `Clima en: ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl')

  const iconoClima = datos.weather[0].icon;
  const iconoImagen = document.createElement('img');
  iconoImagen.src = `https://openweathermap.org/img/wn/${iconoClima}.png`;
  iconoImagen.classList.add('mx-auto', 'mt-4', 'w-16');

  const climaDescripcion = document.createElement('p');
  const descripcion = datos.weather[0].description;
  climaDescripcion.innerHTML = `${descripcion}`;
  climaDescripcion.classList.add('text-xl');

  const actual = document.createElement('p');
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl')

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Max: ${min} &#8451;`;
  tempMaxima.classList.add('text-xl')

  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Min: ${max} &#8451;`;
  tempMinima.classList.add('text-xl')

  const humedadAmbiente = document.createElement('p');
  humedadAmbiente.innerHTML = `Humedad: ${humidity} %`;
  humedadAmbiente.classList.add('text-xl')

  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white')
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(iconoImagen);
  resultadoDiv.appendChild(climaDescripcion);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);
  resultadoDiv.appendChild(humedadAmbiente);


  resultado.appendChild(resultadoDiv)
}


function limpiarHTML() {
  while(resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {

  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner);
}