const dogList = document.getElementById("dog-list"); 

// Obtiene del primer endpoint la lista de las razas de los perros y almacena esa lista en un array
fetch("https://dog.ceo/api/breeds/list")
  .then((resp) => resp.json())
  .then((info) => {
    const breeds = [...info.message];
    createCategories(breeds);
  });

// Modifica el array anterior agrupando alfabéticamente las razas de los perros en subarrays
const groupBreeds = (arr) => {
  const groups = arr.reduce((acc, cur) => {
    const last = acc[acc.length - 1];
    last && last[0][0] === cur[0] ? last.push(cur) : acc.push([cur]);
    return acc;
  }, []);
  return groups;
};

// Crea la estructura html con el array de subarrays 
const createCategories = (allBreeds) => {
  const groupArr = groupBreeds(allBreeds); // Divide el array en subarrays por letra
  // Recorre cada subarray
  groupArr.map((breed) => {
    // Crea el título con la inicial del primer elemento del subarray
    const initial = document.createElement("h2");
    initial.innerText = breed[0][0].toUpperCase();
    dogList.appendChild(initial);
    // Recorre cada elemento del subarray
    breed.forEach((breed2) => {
      // Crea los items que se corresponden a las razas del subarray
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.innerText = breed2.charAt(0).toUpperCase() + breed2.slice(1);
      link.href = "#";
      // Le añade una escucha de evento a los items creados
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showDogg(breed2);
      });
      item.appendChild(link);
      dogList.appendChild(item);
    });
  });
};

// Crea una nueva ventana por cada perro que se corresponde con su raza incluyendo su nombre y una imagen
const showDogg = async (breed) => {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  const data = await response.json();

  window.open().document.write(`
    <head>
    <link rel="stylesheet" href="styles.css" />
    <title>${breed.charAt(0).toUpperCase() + breed.slice(1)} photo</title>
    </head>
    <div id="styles-outside">
    <a href="http://127.0.0.1:5500/">Return</a>
    <img src="${data.message}" alt="${breed}">
    <h1>${breed}</h1>
    </div>`);
};
