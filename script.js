const listaPerros = document.getElementById('lista-perros'); //obtengo mi elemento de HTML y lo guardo en la variable

const mostrarPerros = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all'); //le hago una peticion a la api
        const data = await response.json();

        const razas = Object.keys(data.message); // array con todos las razas de los perros

        razas.forEach((raza) => {
            //recorro cada elemento
            const item = document.createElement('li'); // creo una lista de elementos
            const link = document.createElement('a'); // tambien un enlace
            link.innerText = raza; // obtengo el nombre que esta en la variable raza ya que esta contiene el nombre de la raza que se esta recorriendo en el array razas
            link.href = '#'; // le asigno # para decirle que no se dirija a otra pag
            link.addEventListener('click', () => {
                mostrarFotoPerro(raza);
            }); // cuando haga click en el enlace, osea la raza del perro se va a ver la imagen
            item.appendChild(link); // el enlace a lo agrego como hijo a li
            listaPerros.appendChild(item); // y el elemento li al elemento lu que es lista perros
        });
    } catch (error) {
        console.log(error);
    }
};

mostrarPerros();
