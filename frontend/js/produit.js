// Récupération id url
const objetUrl = new URL(window.location.href);
const url = objetUrl.searchParams.get("id"); //va chercher l'Id dans l'url


//.................................requête...........................................
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

//.................................affichage produit..........................................
function affichageProduit(produit, name) {
  const parentDOM = document.getElementById("card_produit"); // où seront les produits

  //affichage option.........

  let options = "";
  //je boucle sur les options dispo pour chaque produits
  produit.lenses.forEach(function (lens) {
    options = options + `<option value="">${lens}</option>`;
  });

  console.log(options);
  //bloc html pour chaque produit
  parentDOM.innerHTML = `  
    <div id ="card_produit-photo">
      <img src=${produit.imageUrl} alt="appareil photo ${produit.name}">
    </div>
    <div id="card_produit-details">
      <div id="name">${produit.name}</div>
      <div id="description">${produit.description}</div>      
      <div id="price">${produit.price} €</div>  
      <select name="option" id="option">          
          <option value="">Choix de lentilles${options}</option>                    
      </select>      
      <div id="ajout_panier">
        <p><i class="fas fa-shopping-cart"></i><br>ajouter au panier</p>        
      </div>   
    </div>

  `;
}

//------------------addEventListener(onclick)--------------------
//au clic sur l'un des produits =>lien vers le produit avec plus de détails

function addListeners(data) {
  // je crée la variable qui désigne l'endroit ou se situe le Bouton ajout au panier
  const boutonAjoutPanier = document.getElementById("ajout_panier");

  // On écoute l'evènement "au clic" sur le bouton d'ajout
  boutonAjoutPanier.addEventListener("click", () => {
    //-----------------------------------LOCAL STORAGE------------------------------------

    // On déclare une variable qui détaillera les produits présents dans le LS
    //en les convertissant en JS.
    // la clé se nommera "produits"
    let produitsDansLocalStorage = JSON.parse(localStorage.getItem("produits"));
    console.log(produitsDansLocalStorage);

    //---------------------------s'il y a déjà des produits dans le LS
    if (produitsDansLocalStorage !== null) {
      //je fais une boucle pour verifier si le produit existe deja
      let doublon = false;
      produitsDansLocalStorage.forEach(function (produit) {
        if (produit.name == data.name) {
          doublon = true;
          alert("ATTENTION !!! Produit déjà présent dans le panier");
        }
      });
      if (!doublon) {
        console.log(doublon);
        produitsDansLocalStorage.push(data);
        alert("Produit ajouté au panier")
      }
      localStorage.setItem(
        "produits",
        JSON.stringify(produitsDansLocalStorage)
      );

      //---------------------------si le LOCAL STORAGE est vide
    } else {
      //on va créer un array vide
      produitsDansLocalStorage = [];
      //On place dans l'Array le produit choisi avec push
      produitsDansLocalStorage.push(data);
      alert("Produit ajouté au panier")
      //on remet à jour le LS en lui envoyant les données en format JSON
      localStorage.setItem(
        "produits",
        JSON.stringify(produitsDansLocalStorage)
      );
    }
  });
}
