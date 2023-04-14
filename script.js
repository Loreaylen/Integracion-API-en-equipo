const listaPerros = document.getElementById('lista-perros'); //obtengo mi elemento de HTML y lo guardo en la variable

const mostrarPerros = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all'); //le hago una peticion a la api
        const data = await response.json();

        const razas = Object.keys(data.message); // array con todos las razas de los perros
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
