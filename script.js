// const listaPerros = document.getElementById("lista-perros")

// const mostrarPerros = async () => {

//     try {
//     const response = await fetch ("https://dog.ceo/api/breeds/list")

//     // console.log(response);

//     const datos = await response.json();
//     console.log(datos);
//     } catch (error) {
//         console.log(error);
//     }
// }

// mostrarPerros();

// const listaPerros = document.getElementById("lista-perros");

// const mostrarPerros = async () => {
//   try {
//     const response = await fetch("https://dog.ceo/api/breeds/list");
//     const datos = await response.json();

//     const lista = document.createElement("ul");

//     datos.message.forEach((raza) => {
//       const item = document.createElement("li");
//       item.textContent = raza;
//       lista.appendChild(item);
//     });

//     listaPerros.appendChild(lista);
//   } catch (error) {
//     console.log(error);
//   }
// };

// mostrarPerros();

const listaPerros = document.getElementById("lista-perros"); //obtengo mi elemento de HTML y lo guardo en la variable 


const mostrarPerros = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");  //le hago una peticion a la api
    const data = await response.json();

    const razas = Object.keys(data.message); // array con todos las razas de los perros

    razas.forEach((raza) => { //recorro cada elemento
      const item = document.createElement("li"); // creo una lista de elementos
      const link = document.createElement("a"); // tambien un enlace 
      link.innerText = raza; // obtengo el nombre que esta en la variable raza ya que esta contiene el nombre de la raza que se esta recorriendo en el array razas 
      link.href = "#"; // le asigno # para decirle que no se dirija a otra pag
      link.addEventListener("click", () => {
        mostrarFotoPerro(raza);
      }); // cuando haga click en el enlace, osea la raza del perro se va a ver la imagen
      item.appendChild(link); // el enlace a lo agrego como hijo a li 
      listaPerros.appendChild(item); // y el elemento li al elemento lu que es lista perros 
    });
  } catch (error) {
    console.log(error);
  }
};

const mostrarFotoPerro = async (raza) => {
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${raza}/images/random` //hago la misma solicitud qye hice anteriormente para obtener las img
    );
    const data = await response.json();

    const nuevaVentana = window.open(); // creo una nueva ventana
    nuevaVentana.document.write(`<div style="text-align: center;">
    <img src="${data.message}" alt="${raza}" style="border: 1px solid black;">
    <h1 style="font-family: 'Bebas Neue', cursive;  text-transform: uppercase; color: #5a382c;">${raza}</h1>
  </div>`); // creo un div donde almaceno la img y el nombre de la raza
  } catch (error) {
    console.log(error);
  }
};

mostrarPerros();

//bucle for each que recorrer el array razas, para cada raza cree un li y un a, cada uno asignado a su constante, asigno el nombre de la raza al elemento del enlace

// promesa:al usar fetch nos devuelve una promesa, esta promesa la estamos guardando en la variable response y la estamos mostrando. Promesa significa que estamos haciendo una petición, pero en este caso tenemos qeu esperar a que termine antes de hacer algo es que cuando hacemos una peticion al servidor le enviamos lo que queremos, en este caso los nombres de perritos, el servidor tiene que procesar esa petición, varias cosas más por parte del servidor y nos va a devolver la info, pero esto tarda tiempo, tenemos que esperar a que termine esto antes de poder obtener la respuesta. Para esperar a que termine la petición lo hacemos usando await. Es nuestro caso decimos quiero que hagas esta peticion (url perritos) y cuando termines (await) pasa a la siguiente linea (console.log). Await solo la usamos dentro de funciones async.

//Al usar funciones async deberiamos trabajar con try y catch

//object.jeys = obtiene un array de todas la claves en este caso con las razas de perros que estan en el response, que esta guardado en la variable data

