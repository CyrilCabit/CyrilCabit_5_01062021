// on recupere les éléments du LocalStorage sous le format Javascript
let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));
console.log(produitDansLocalStorage);

//on déclare une variable qui va contenir la mise en forme HTML pour un panier vide
const panierVide = `
<div id="panier_vide">
  <h1> Votre Panier</h1>
  <div id ="panier_details">
    <p>Le panier est vide</p>
  </div>
</div>
`;
//variable à insérer dans le DOM sil y a un produit dans le panier
let panierRempli = `
<div id="panier_rempli">
  <h1> Votre Panier</h1>
  <div id ="panier_details">      
    <div id ="card_produits_panier">     
      <div class="info">
        <div id ="card_produit-photo">
          <img>  
        </div> 
        <p class="name">  </p>
        <p class="price">  €</p>
      </div>
    </div>
    <div id ="total_panier">
  </div>
  <button>Valider le panier</button>
  </div>  
</div>
`;

//-----------------------affichage produits du Local Storage dans la page HTML Panier

const produitsDansHTML = document.querySelector("#card_produit_panier");
//on déclare la variable qui selectionne la zone html ou devront s'afficher les produits

//-----------------si le storage est vide

if (produitDansLocalStorage === null) {
  console.log("vide!");

  // on place tout le bloc HTML prévu pour un panier vide
  produitsDansHTML.innerHTML = panierVide;

  //----------------si le storage contient des produits
} else {
  produitsDansHTML.innerHTML = panierRempli;
  console.log("pas vide!");
}
