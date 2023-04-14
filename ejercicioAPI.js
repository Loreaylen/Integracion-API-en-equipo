const listaPerros = document.getElementById('lista-perros'); //obtengo mi elemento de HTML y lo guardo en la variable

window.addEventListener('load', () => {
    fetch('https://dog.ceo/api/breeds/list')
        .then((resp) => resp.json())
        .then((info) => {
            const breeds = [...info.message];
            createCategories(breeds);
        })
        .catch((err) => console.log(err));
});

const createCategories = (allBreeds) => {
    const groupArr = groupBreeds(allBreeds);
    groupArr.map((breed) => {
        const initialLetter = breed[0][0].toUpperCase();
        const initial = document.createElement('h2');
        initial.innerText = initialLetter;
        listaPerros.appendChild(initial);
        breed.forEach((raza) => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.innerText = raza.charAt(0).toUpperCase() + raza.slice(1);
            link.href = '#';
            link.addEventListener('click', (event) => {
                event.preventDefault();
                mostrarFotoPerro(raza);
            });
            item.appendChild(link);
            listaPerros.appendChild(item);
        });
    });
};
const mostrarFotoPerro = async (raza) => {
    try {
        const response = await fetch(
            `https://dog.ceo/api/breed/${raza}/images/random` //hago la misma solicitud qye hice anteriormente para obtener las img
        );
        const data = await response.json();

        const nuevaVentana = window.open(); // creo una nueva ventana
        nuevaVentana.document.write(`
        <head><title>${
            raza.charAt(0).toUpperCase() + raza.slice(1)
        } photo</title>
        </head><div style="text-align: center;">
        <a href="http://127.0.0.1:5500/" style=
        "position: absolute; top: 10; left: 10; background: teal; text-decoration: none; border: 2px solid teal; color: white; border-radius: 8px; padding: 4px 8px; cursor: pointer; outline: inherit;"
        ;">test</a>
  <img src="${
      data.message
  }" alt="${raza}" style="border: 1px solid black; width:350px; height:auto;">
  <h1 style="font-family: 'Bebas Neue', cursive;  text-transform: uppercase; color: #5a382c;">${raza}</h1>
</div>`);
        // creo un div donde almaceno la img y el nombre de la raza
    } catch (error) {
        console.log(error);
    }
};

const groupBreeds = (arr) => {
    const groups = arr.reduce((acc, cur) => {
        const last = acc[acc.length - 1];
        if (last && last[0][0] === cur[0]) {
            last.push(cur);
        } else {
            acc.push([cur]);
        }
        return acc;
    }, []);

    return groups;
};
