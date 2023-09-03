const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})


function mostrarError(mensaje) { 
    const alerta =document.querySelector('.bg-red-100');

    //Alerta
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() =>{
            alerta.remove();
        },5000);
    }
    
}

function buscarClima(e) {
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value; 

    if(ciudad === '' || pais === ''){
        //validar si los campos estan vacios
        
        mostrarError('Los campos son obligatorios');
        return;
    }
    //API
    consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais){

    const appId = '6bf4c8b0fdc2bede9001b2a838fe2f2c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q={$ciudad},{$pais}&appid={$appId}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {
            console.log(datos);
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada')
            }
        })

}