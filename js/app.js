const criptoSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
//crear un promise 
const obtenerCripto = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
});

const objBusqueda = {
    moneda:'',
    criptomoneda:''
 }

document.addEventListener('DOMContentLoaded', ()=>{
    consultarCripto();
    formulario.addEventListener('submit', submitFormulario);
    criptoSelect.addEventListener('change',leerValor);
    monedaSelect.addEventListener('change',leerValor);
})


function consultarCripto() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado => obtenerCripto(resultado.Data))
        .then(criptomonedas => selectCripto(criptomonedas)) 
}

function selectCripto(criptomonedas){
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptoSelect.appendChild(option);
    });
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
    
}

function submitFormulario(e) {
    e.preventDefault();   
    const {moneda , criptomoneda}= objBusqueda;
    
    if(moneda ===''|| criptomoneda === ''){
        mostrarAlerta('Todos los Capos son Necesarios');
        return;
    }

    //consultar la api con los resultados 

    consultarAPI();
}

function mostrarAlerta(msg) {
    const Alerta = document.querySelector('.error');
    
    //verifica si la condicoon de la alerta se cumple para ejecutar las acciones 
    if(!Alerta){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }    
    
}

function consultarAPI(){
    const {moneda, criptomoneda} = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    mostrarSpinner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion  =>{
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
        })
}

function mostrarCotizacionHTML(cotizacion){
    limpiarHTML();
    const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE} =cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El Precio es: <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `El Precio Más Alto del Diá: <span>${HIGHDAY}</span>`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `El Precio Más Bajo del Diá: <span>${LOWDAY}</span>`;

    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = `Variación ultimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `Ultima Actualizacion: <span>${LASTUPDATE}</span>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);


}

function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner() {
    limpiarHTML();

    const Spinner = document.createElement('div');
    Spinner.classList.add('spinner');
    
    Spinner.innerHTML= `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `
    resultado.appendChild(Spinner);
}