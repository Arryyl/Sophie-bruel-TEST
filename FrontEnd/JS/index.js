const categories = "http://localhost:5678/api/categories";
const url = "http://localhost:5678/api/works";
const getWorks = await fetch(url);
const works = await getWorks.json();

// Récupération des catégories
async function getCategories() {
  try {
    const result = await fetch(categories);
    if (result.ok) {
      const data = await result.json();
      console.log(data);
    } else {
      console.log("Error !");
    }
  } catch (error) {
    console.log(error);
  }
}
getCategories();

// Création des balises HTML pour chaque oeuvre
function createGallery(data) {
  //boucle
  for (let i = 0; i < data.length; i++) {
    // Création de l'élément figure pour chaque oeuvre
    const figureElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = data[i].title;

    // Ajout de l'image et de la légende à l'élément figure
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);

    // Rattachement de l'élément figure à la galerie
    const divGallery = document.querySelector(".gallery");
    divGallery.appendChild(figureElement);
  }
}
createGallery(works);
console.log("dhdhdh");

//Boutons filtres

const galleryContainer = document.querySelector("#portfolio .gallery");
const allBtn = document.querySelector(".btn-tous");
const objetsBtn = document.querySelector(".btn-objets");
const appartementsBtn = document.querySelector(".btn-appartements");
const hotelsrestaurantsBtn = document.querySelector(".btn-hotelsrestaurants");

function loadGallery() {
  galleryContainer.innerHTML = "";
  createGallery();
}

async function filterGallery(category) {
  if (category == 4) {
    createGallery(works);
    return;
  }

  const worksObjets = works.filter((works) => {
    return (works.category.id = category);
  });
  createGallery(worksObjets);
}

if (allBtn) {
  allBtn.addEventListener("click", function () {
    filterGallery(4);
  });
}

if (objetsBtn) {
  objetsBtn.addEventListener("click", function () {
    filterGallery(1);
  });
}

if (appartementsBtn) {
  appartementsBtn.addEventListener("click", function () {
    filterGallery("2");
  });
}

if (hotelsrestaurantsBtn) {
  hotelsrestaurantsBtn.addEventListener("click", function () {
    filterGallery("3");
  });
}

loadGallery();