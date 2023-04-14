// Ejercicio de integración con API

// El ejercicio consiste en mostrar la respuesta de los endpoints en una interfaz gráfica.

// Consigna práctica
// Se tiene un web service que provee información sobre razas de perros. El mismo
// consta de dos endpoints, uno que responde un JSON con las razas, y otro que recibe la raza como parámetro y devuelve un JSON que contiene una imagen de la raza.
// Los endpoints son los siguientes:
// ● https://dog.ceo/api/breeds/list
// ● https://dog.ceo/api/breed/{BREED_NAME}/images/random
// Desarrollar una web en la cual se pueda ver en la vista principal un listado categorizado
// alfabéticamente por la primera letra de las razas recibidas con el endpoint /breed/list.
// Al seleccionar un ítem de la lista, se debe abrir otra vista donde se muestre el nombre
// de la
// raza, seguido de una imagen que se obtiene con el endpoint
// /breed/{BREED_NAME}/images/random.


const listSection = document.getElementById('listSection'),
      modal = document.getElementById('modal'),
      img = document.getElementById('modalImg'),
      title = document.getElementById('modalTitle'),
      modalWrapper = document.getElementById('modalWrapper'),
      modalBtn = document.getElementById('modalBtn');
      

modalBtn.addEventListener('click', () => modalWrapper.style.display = 'none' )

async function getImg(e) {
  const id = e.target.id
  fetch(`https://dog.ceo/api/breed/${id}/images/random`)
  .then(resp => {
    title.textContent = `Raza ${id}`  
    img.alt = `Imagen de la raza ${id}`
    return resp.json()
 })
 .then(resp => {
  img.src = resp.message
 })
 .finally(() => {
  modalWrapper.style.display = 'flex'
 })
}

const groupBreeds = (arr) => {
  const groups = arr.reduce((acc,cur) => {
    const last = acc[acc.length -1]
    if (last && last[0][0] === cur[0]) {
      last.push(cur);

    } else {
      acc.push([cur]);
    }
    return acc;
  }, [])

return groups
}

const createCategories = (allBreeds) => {
  const groupArr = groupBreeds(allBreeds)
  for(let arr of groupArr) {
    const char = arr[0][0].toUpperCase()
    const article = document.createElement('article')
    const h2 = document.createElement('h2')
    const ul = document.createElement('ul')

    article.id = `breed${char}`
    h2.textContent = char
    
    article.append(h2, ul)

    arr.forEach(el => {
      const li = document.createElement('li')
      li.id = el
      li.textContent = el
      li.addEventListener('click', getImg)
      ul.appendChild(li)
    })

    listSection.appendChild(article)
  }
}

  window.addEventListener('load', () => {

  fetch('https://dog.ceo/api/breeds/list')

  .then(resp => resp.json())
  .then(info => {
    const breeds = [...info.message]
    createCategories(breeds)
  })
  .catch(err => console.log(err))
  })
