// on recupere les éléments du LocalStorage sous le format Javascript
let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));

// zones HTML où seront les produits

const panierDOM = document.getElementById("card_panier");
const recapPanierDOM = document.getElementById("card_recap");

let quantiteProduit = 1;
let addition = 0;
let calculTVA = addition * (20 / 100);
affichagePanier(produitDansLocalStorage);
function affichagePanier(produits) {
  // ------------ SI PANIER REMPLI--------------
  if (produitDansLocalStorage !== null) {
    for (const produit of produits) {
      addition += produit.price;

      panierDOM.innerHTML += `     
      
      <div id ="panier_produit">         
        <div id ="produit_photo"> 
          <img src=${produit.imageUrl} alt="appareil photo ${produit.name}">
        </div>
        <div id="produit_details">
          <div id="name">${produit.name}</div>
          <div id="option"></div>           
        </div>
        <div id="produit_calcul">       
          <p>${produit.price} €</p>
        </div>
        <p id="produit_clear"><i class="far fa-trash-alt"></i></p>     
      </div>
      </div>    
    
    `;
    }
    

    //------------partie RECAP PANIER----------

    recapPanierDOM.innerHTML += `

  <div id ="panier_totaux">
    <div id ="panier_totaux-articles">
      <p>Articles (${produits.length})</p> 
      <p>${addition} €</p>
    </div>
    <div id ="panier_totaux-tax">
      <p>TVA 20%</p> 
      <p> ${addition * (20 / 100)} €</p>
    </div>
    <div id ="panier_grand_total">
      <p>TOTAL</p>
      <p>${addition + addition * (20 / 100)}  € </p>
    </div>   
  </div>
  <button id="clear_panier">Vider le panier</button>`;
   
   
    

    // ------------ VIDER COMPLETEMENT LE PANIER--------------
    //suppression de la KEY Produits du Local Storage
    const clearPanier = document.getElementById("clear_panier");
    
    clearPanier.addEventListener("click", () => {
      localStorage.removeItem("produits");
      alert("le panier a été vidé");
      //rechargement de la page
      window.location.href = "panier.html";
    });

    
  } else {
    
    //------------partie RECAP PANIER----------

    recapPanierDOM.innerHTML += `
    <p>Le panier est vide... <i class="far fa-sad-cry"></i></p>
    <p><a href="index.html">Cliquez ici pour voir notre sélection de produits</a></p>
    `;
    //---------------FORMULAIRE---------------
    formulaireDOM.innerHTML += `
    `;
  }
}
