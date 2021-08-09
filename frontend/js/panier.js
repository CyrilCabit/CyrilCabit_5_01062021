// on recupere les éléments du LocalStorage sous le format Javascript
let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));

// zones HTML où seront les produits
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
    <button id="clear_panier">Vider le panier</button>
  
  </div>`;
    //---------------FORMULAIRE---------------
    formulaireDOM.innerHTML += `
<label for="prenom">
                Prénom
                 <input type="text" id="prenom" name="prenom" required="required">
            </label>
            <label for="nom">
                Nom
                 <input type="text" id="nom" name="nom" required="required">
            </label>
            <label for="email">
                Email
                 <input type="email" id="email" name="email" required="required">
            </label>
            <label for="adress">
                Adresse de Livraison
                 <input type="text" class="adress" name="adress" required="required">
            </label>
            <label for="adress">
                CP
                 <input type="number" class="adress" name="cp" required="required" minlenght ="6" maxlenght="6">
            </label>
            <label for="adress">
                Ville
                 <input type="text" class="adress" name="ville" required="required">
            </label>
            <label for="validation">                
                 <input type="button" id="validation" value="valider la commande"> 
            </label>
`;
    // ------------ VIDER COMPLETEMENT LE PANIER--------------
    //suppression de la KEY Produits du Local Storage
    const clearPanier = document.getElementById("clear_panier");
    console.log(clearPanier);
    clearPanier.addEventListener("click", () => {
      localStorage.removeItem("produits");
      alert("le panier a été vidé");
      //rechargement de la page
      window.location.href = "panier.html";
    });

    // ------------ SI PANIER VIDE--------------
  } else {
    panierDOM.innerHTML += `
    <div id ="paniervide">
      
      
    </div>
    `;
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

//---------------ENVOI DU FORMULAIRE---------------
/*fetch("http://localhost:3000/api/cameras", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  //body: JSON.stringify(jsonBody),
});*/
