const criptoSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');

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
        
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion  =>{
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
        })
}

function mostrarCotizacionHTML(cotizacion){
    console.log(cotizacion);
}