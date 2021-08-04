// on recupere les éléments du LocalStorage sous le format Javascript
let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));

// zone HTML où seront les produits
const panierDOM = document.getElementById("card_panier");
const recapPanierDOM = document.getElementById("card_recap");
const formulaireDOM = document.getElementById("card_formulaire");
let quantiteProduit = 1;
let addition = 0;
let calculTVA = addition * (20 / 100);
affichagePanier(produitDansLocalStorage);
function affichagePanier(produits) {
  // ------------ SI PANIER REMPLI--------------
  if (produitDansLocalStorage !== null) {
    for (const produit of produits) {
      let multiply = quantiteProduit * produit.price;

      addition += produit.price;

      panierDOM.innerHTML += `     
      
      <div id ="panier_produit">         
        <div id ="produit_photo"> 
          <img src=${produit.imageUrl} alt="appareil photo ${produit.name}">
        </div>
        <div id="produit_details">
          <div id="name">${produit.name}</div>           
          <div id="price">${produit.price} €</div> 
        </div>
        <div id="produit_calcul">        
          <input type ="number" min="1" value= "${quantiteProduit}" id="number"></input>
          <p>${multiply} €</p>
        </div>
        <p id="produit_clear"><i class="far fa-trash-alt"></i></p>     
      </div>
      </div>    
    
    `;
    }
    console.log(quantiteProduit);

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
  
  </div>`;
    // ------------ SI PANIER VIDE--------------
  } else {
    panierDOM.innerHTML += `
    <div id ="paniervide">
      <p>Le panier est vide... <i class="far fa-sad-cry"></i></p>
      <p><a href="index.html">Cliquez ici pour voir notre sélection de produits</a></p>
    </div>
    `;
  }
}
//---------------FORMULAIRE---------------
formulaireDOM.innerHTML += `
<label for="prenom">
                Prénom
                 <input type="text" id="prenom" name="prenom">
            </label>
            <label for="nom">
                Nom
                 <input type="text" id="nom" name="nom">
            </label>
            <label for="email">
                Email
                 <input type="email" id="email" name="email">
            </label>
            <label for="adress">
                Adresse de Livraison
                 <input type="text" class="adress" name="adress">
            </label>
            <label for="adress">
                CP
                 <input type="number" class="adress" name="cp">
            </label>
            <label for="adress">
                Ville
                 <input type="text" class="adress" name="ville">
            </label>
            <label for="validation">                
                 <input type="button" id="validation" value="valider la commande"> 
            </label>
`;
