// Récupération des produits (appel api fetch)
//on récupère les données via l'URL avec fetch

fetch("http://localhost:3000/api/cameras")
  // Si on a réussi à accéder l'api
  .then(function (response) {
    // Si l'api renvoi une réponse valide
    if (response.ok) {
      // On renvoie les données converties pour y accéder dans le 2ème then
      return response.json();
    }
    // on lève une erreur ce qui nous fait passer dans le catch

    throw new Error("Reponse pas ok");
  })
  //cela récupère les données caméras = datacameras pour les afficher
  .then(function (datacameras) {
    affichageProduits(datacameras);
    console.log(datacameras);
  })
  .catch(function (error) {
    console.log(error.message);
  });

function affichageProduits(produits) {
  // On récupère le parent ou seront affichés tous les produits
  const parentDOM = document.getElementById("produits");

  // On fait une boucle sur le tableau de produits
  // const produit vaut un produit dans le tableau lors de l'itération
  for (const produit of produits) {
    // On ajoute au DOM chaque nouveau produit
    parentDOM.innerHTML += `
    <a class="link" href="produit.html?id=${produit._id}">
      <div class="card">  
        <img src=${produit.imageUrl} alt="appareil photo ${produit.name}"</img> 
        <div class="info">
          <p class="name"> ${produit.name} </p>
          <p class="price"> ${produit.price} €</p>
        </div>
      </div>
    </a>
    `;
  }
}
// <a href="produit.html?id=${produit._id}"></a>
//const lienProduit = document.querySelector(".link");
//lienProduit.addEventListener("click", function () {});

//console.log(lienProduit);
