// on recupere les éléments du LocalStorage sous le format Javascript
let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));

// zones HTML où seront les produits
const formPanier = document.getElementById("form-panier");

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
    //---------------FORMULAIRE---------------
    formPanier.innerHTML += `
    <form id="card_formulaire">
    <h2>Informations de facturation</h2>
    <div class ="form">
      <label for="prenom">Prénom</label>
      <input type="text" id="prenom" name="prenom" required>
    </div>
    <div class ="form">
      <label for="nom">Nom</label>
      <input type="text" id="nom" name="nom" required>
    </div>
    <div class ="form">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div class ="form">
      <label for="adress">Adresse de Livraison</label>
      <input type="text" id="adress" class="adress" name="adress" required>
  </div>
  <div class ="form">
      <label for="cp">CP</label>
      <input type="number" min="01000" max="99999" id="cp" name="cp" required>
  </div>
  <div class ="form">
      <label for="ville">Ville</label>
      <input type="text" class="adress" name="ville" id="ville" required>
  </div>
  <button id ="validation" type="submit">valider la commande</button>
    </form>
`;
    // ------------ VIDER COMPLETEMENT LE PANIER--------------
    //suppression de la KEY Produits du Local Storage
    const clearPanier = document.getElementById("clear_panier");
    
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
function send(e) {
  e.preventDefault(); 

  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({form: document.getElementById("value").value}),
  })
  .then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
document
  .getElementById("form")
  .addEventListener("validation", send); 
}