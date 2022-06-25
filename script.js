
class Opcion {
     constructor (opcion){
          this.id= opcion.id;
          this.scene= opcion.scene;   
          this.img = opcion.img;
          this.img2= opcion.img2;
          this.cantidad = cantidad;
        }
}

let opciones;
let contenedorCards=document.getElementById("grafico");
const tablasPracticadas=document.getElementById("tabla");
const URLJSON = "./opciones.json";
let cantidad;


function mostrarOpciones (array){
  contenedorCards.innerHTML=""
  array.forEach(element => {
  contenedorCards.innerHTML+=`
                      <div class="col mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="${element.img}" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">Tabla del ${element.id}</h5>
                                    ${element.scene}
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center">
                                <button id="btn${element.id}"  onclick= "agregarALaTabla(${element.id})" class="btn btn-outline-dark mt-auto">Elegir</button>
                                </div>
                            </div>
                        </div>
                      </div>
                    `
});
}

function capturarStorage (){
  return JSON.parse (localStorage.getItem("mostrarTabla")) || [];
}

function guardarStorage (tablaNueva) {
    localStorage.setItem ("mostrarTabla", JSON.stringify(tablaNueva));
}

function agregarALaTabla(idParam){
  let mostrarTabla= capturarStorage();
  if (mostrarTabla.some(e=>e.id==idParam)){
      let indice= mostrarTabla.findIndex (e=>e.id==idParam)
      mostrarTabla[indice].cantidad++;
      Swal.fire({
        title: 'GENIAL!',
        text: 'Memoriza toda la tabla!',
        imageUrl: mostrarTabla[indice].img2,
        imageWidth: 200,
        imageHeight: 300,
        imageAlt: 'Custom image',
  })
  } else {
      const tablasPracticadas=opciones.find(e=>e.id==idParam);
      mostrarTabla.push({...tablasPracticadas,cantidad:1});

  }
  guardarStorage(mostrarTabla);
}

function crearTabla (){
  let mostrarTabla=capturarStorage();
  tablasPracticadas.innerHTML="";
  mostrarTabla.forEach(element=>{
    tablasPracticadas.innerHTML +=`
    <tr>
         <td>${element.id}</td>
         <td>${element.scene}</td>
         <td><img src= "${element.img}"width="30px"></td>
         <td>${element.cantidad}</td>
     </tr>
    `
  })
}

fetch(URLJSON)
  .then((respuesta) => respuesta.json())
  .then((data) => {
    opciones = data.opciones;
    mostrarOpciones(opciones);
  })
  crearTabla();

  let botonFinal = document.getElementById("btnFinal");

  function finalizarPractica (botonFinal)  {
    Swal.fire({
      title: 'Practicaste muchisimo!',
      text: 'Sos un genio de las tablas!',
      imageUrl: "./assets/aplauso3.png",
      imageWidth: 200,
      imageHeight: 300,
      imageAlt: 'Custom image',
  }) ;
 }

  