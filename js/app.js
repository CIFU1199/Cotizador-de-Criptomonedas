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
    console.log(objBusqueda);
}

function submitFormulario(e) {
    e.preventDefault();   
    const {moneda , criptomoneda}= objBusqueda;
    
    if(moneda ===''|| criptomoneda === ''){
        mostrarAlerta('Todos los Capos son Necesarios');
        return;
    }
}

function mostrarAlerta(msg) {
    console.log('msg');
}