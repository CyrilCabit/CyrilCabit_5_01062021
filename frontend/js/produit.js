// Récupération id url
const objetUrl = new URL(window.location.href);
const url = objetUrl.searchParams.get("id");

console.log(url);

fetch(`http://localhost:3000/api/cameras/${url}`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }

    throw new Error("reponse pas ok");
  })
  .then(function (datacamera) {
    affichageProduit(datacamera);
    addListeners(datacamera);
  })
  .catch((error) => {
    console.log(error.message);
  });

function affichageProduit(produit, name) {
  const parentDOM = document.getElementById("card_produit");
  parentDOM.innerHTML = `
  
    <div id ="card_produit-photo">
      <img src=${produit.imageUrl} alt="appareil photo ${produit.name}">
    </div>
    <div id="card_produit-details">
      <div id="name">${produit.name}</div>
      <div id="description">${produit.description}</div>
      <div id="lenses">${produit.lenses}</div>
      <div id="price">${produit.price} €</div> 
      <button id="ajout-panier">Ajouter au panier</button>     
    </div>

  `;
}

//--------------addEventListener(onclick);au clic sur l'un des produits =>lien vers le produit avec plus de détails

function addListeners(data) {
  // je crée la variable qui désigne l'endroit ou se situe le Bouton ajout au panier
  const boutonAjoutPanier = document.getElementById("ajout-panier");
  //je crée une variable qui récupère uniquement le nom du produit choisi

  // Ajout d'un gestionnaire d'evènement au clic sur le bouton d'ajout
  boutonAjoutPanier.addEventListener("click", () => {
    // On déclare une variable qui détaillera les produits présents dans le LS en les convertissant en JS. clé "produits
    let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));
    console.log(produitDansLocalStorage);

    //---------------------------s'il y a déjà des produits dans le LS
    if (produitDansLocalStorage) {
      //check des doublons
      produitDansLocalStorage.forEach(function (element, index, array) {
        if (element._id === data._id) {
          console.log("ATTENTION !!! élement déjà présent dans le panier!!");
          produitDansLocalStorage.push(data);
        } else {
          produitDansLocalStorage.push(data);
          localStorage.setItem(
            "produits",
            JSON.stringify(produitDansLocalStorage)
          );
        }
      });

      //---------------------------si le LS est vide
    } else {
      //on va créer un array
      produitDansLocalStorage = [];
      //On place dans l'Array le produit choisi avec push
      produitDansLocalStorage.push(data);

      //on remet à jour le LS en lui envoyant les données en format JSON
      localStorage.setItem("produits", JSON.stringify(produitDansLocalStorage));
    }

    // monStorage.push(produit1);
    // local storage doit ressembler à ça : [{}, {}]
    // let monStorage = localstorage.getItem('produits'); --> récupérer local storage
    // localstorage.setItem('produits', mavariable) --> créer local storage
    // fonctions de convertion js et json
    // js to json -> JSON.stringify
    // json to js --> JSON.parse
    // Description du process
    // Vérifier si le local storage existe
    // --> Si existe pas --> le créer et ensuite ajouter le produit au local storage
    // --> si existe déjà --> le récupérer dans une variable et vérifier si le produit est dedans (.find)
    // ----------------------> si dedans ne rien faire si pas dedans l'ajouter
  });
}
