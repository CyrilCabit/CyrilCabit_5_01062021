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
    console.log(datacamera);
  })
  .catch((error) => {
    console.log(error.message);
  });

function affichageProduit(produit, name) {
  const parentDOM = document.getElementById("card_produit");
  parentDOM.innerHTML = `
  
    <div id ="card_produit-photo">
      <img src=${produit.imageUrl} alt="appareil photo ${produit.name}"</img>
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
//au clic sur l'un des produits =>lien vers le produit avec plus de détails

//addEventListener(onclick);

function addListeners(data) {
  // Bouton ajout au panier
  const boutonAjoutPanier = document.getElementById("ajout-panier");

  // Ajout d'un gestionnaire d'evènement au click sur le bouton d'ajout
  boutonAjoutPanier.addEventListener("click", () => {
    console.log(data);

    // On test si le local storage existe (si existe pas vaut null)
    const recuperationStorage = localStorage.getItem("produits");
    if (recuperationStorage === null) {
      // si existe pas
      // On veut ajouter tout le produit au local storage
      localStorage.setItem("produits", JSON.stringify([data]));
    } else {
      // si existe déjà
      let storageParse = JSON.parse(recuperationStorage); // on convertit du json vers le js
      storageParse.push(data); // c'est un tableau, on y ajoute notre objet
      localStorage.setItem("produits", JSON.stringify(storageParse)); // On remet à jour le storage
      //je vérifie si un produit est déjà présent dans le tableau=> doublon
    }

    console.log(recuperationStorage);

    // const produit1 = { name: "Zurss 50S" };
    // const produit2 = { name: "Hirsch 400DTS" };
    // const produit3 = { name: "Franck JS 105" };
    // const produit4 = { name: "Kuros TTS" };
    // const produit5 = { name: "Katatone" };
    // let produits = [(produit1, produit2, produit3, produit4, produit5)];
    // console.log(produits.length);
    // let produitChoisi = JSON.parse(localStorage.getItem("produit"));
    // console.log(produitChoisi);
    // if (produitChoisi) {
    //   produitChoisi.push(produit);
    //   localStorage.setItem("camera", JSON.stringify(produitChoisi));
    //   console.log(produitChoisi);
    // } else {
    //   produitChoisi = [];
    //   console.log(produitChoisi);
    //   produitChoisi.push(produits);
    //   localStorage.setItem("produits", JSON.stringify(produitChoisi));
    // }

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
