//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados 
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision:'',
  color: '',
}


//       Eventos 
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos);// Muestar los autos




    //Llena las opciones  de años
    llenarSelect();
})

// Event listener para los selec
marca.addEventListener('change', e =>{
  datosBusqueda.marca = e.target.value;
  filtrarauto(autos);
})

year.addEventListener('change', e =>{
  datosBusqueda.year = e.target.value;
  filtrarauto();
})

minimo.addEventListener('change', e =>{
  datosBusqueda.minimo = e.target.value;
  filtrarauto();
})

maximo.addEventListener('change', e =>{
  datosBusqueda.maximo = e.target.value;
  filtrarauto();
})

puertas.addEventListener('change', e =>{
  datosBusqueda.puertas =parseInt(e.target.value);
  filtrarauto();
})
transmision.addEventListener('change', e =>{
  datosBusqueda.transmision = e.target.value;
  filtrarauto();
})
color.addEventListener('change', e =>{
  datosBusqueda.color = e.target.value;
  filtrarauto();
})

//Funciones

function mostrarAutos(autos){

  limpiarHTML();

  autos.forEach(auto => {
      const {marca,modelo,year,puertas,transmision,precio,color} = auto;
      const autoHTML = document.createElement('p');

      autoHTML.textContent = `
        ${marca} ${modelo} -Año ${year} - ${puertas} Puertas -Transmision: ${transmision} - Precio: ${precio} - Color: ${color}

      `;

     //Insertar en el html
     resultado.appendChild(autoHTML);

  });
}

// limpiar HTML

function limpiarHTML(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}



//Genera los años del select
function llenarSelect(){
    for(let i = max; i>= min;i--){
       const opcion = document.createElement('option');
       opcion.value = i ;
       opcion.textContent = i;
       year.appendChild(opcion); //Agrega las opciones de año a select
    }
}


//Funcion que filtra en base a la busqueda
function filtrarauto(){
 const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTrasmision).filter(filtrarColor);

//  console.log(resultado);
  

  if(resultado.length){
    mostrarAutos(resultado);
  }else{
    noResultado();
  }
}

function noResultado(){

  limpiarHTML();

  const noResultado = document.createElement('div');
  noResultado.classList.add('alerta','error');
  noResultado.textContent = 'No hay Resultado, intenta con otras opciones';
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
  const {marca} = datosBusqueda;
  if(marca){
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto){
  const {year} = datosBusqueda;
  if(year){
    return auto.year === parseInt(year);
  }
  return auto;
}

function filtrarMinimo(auto){
  const {minimo} = datosBusqueda;
  if(minimo){
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const {maximo} = datosBusqueda;
  if(maximo){
    return auto.maximo <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const {puertas} = datosBusqueda;
  if(puertas){
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTrasmision(auto) {
  const {transmision} = datosBusqueda;
  if(transmision){
    return auto.transmision ===   transmision;
  }
  return auto;
}


function filtrarColor(auto){
  const {color} = datosBusqueda;
  if(color){
    return auto.color === color;
  }
  return auto;
}