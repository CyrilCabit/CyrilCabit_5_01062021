// Récupération des produits (appel api fetch)
fetch("http://localhost:3000/api/cameras")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((produits) => {
    // Datas est un tableau d'objets

    affichageProduits(produits);
  })
  .catch((error) => {
    console.log(error.message);
  });

function affichageProduits(produits) {
  console.log(produits);
  const elementDOM = document.getElementById("produits");
  // il faut le parcourir avec une boucle for

  /*
  for () {
      elementDOM.innerHTML = `<a href="produit.html?id=${produit._id}"><p>${produit.name}</p></a>`
  }
  elementDOM.innerHTML = produits[0].name;
  */
}
