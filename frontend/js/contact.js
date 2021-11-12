//Gere affichage et interaction du formulaire de contact

let myForm = document.getElementById('card_formulaire');


myForm.addEventListener('submit', function(e){
    
    e.preventDefault();    
    myForm.reportValidity(); 
    myForm.checkValidity(); 
    console.log(myForm);
    if (myForm.reportValidity()) {
// -------------------------------------Je crée mon objet contact        
        const contact = {
            firstName: document.getElementById('prenom').value,
            lastName: document.getElementById('nom').value,
            address: document.getElementById('adress').value,
            city: document.getElementById('ville').value,
            email: document.getElementById('email').value,
        }
//----------------------------------- Je crée mon tableau qui contiendra les produits a envoyer au backend       
        const products = [];  
//----------------------------------- Je récupère les données du LocalStorage  choisies par le client       
        let produitsDansLocalStorage = JSON.parse(localStorage.getItem("produits"));

//----------------------------------- Je fais une boucle sur produitDansLocalStorage pour récuperer tous les produits présents et je push l'ID dans le tableau
        for (let i = 0; i < produitsDansLocalStorage.length; i++) {
            products.push(produitsDansLocalStorage[i]._id);            
         }
         console.log(products);

//-----------------------------------je crée un objet qui va contenir contact et products
        const donneesCommande = {contact, products};
        console.log(donneesCommande);

//-----------------------------------j'envoie les données au serveur


let sendData = fetch("http://localhost:3000/api/cameras/order",{
        method: "POST",
        headers: {
'Accept': 'application/json', 
'Content-Type': 'application/json' 
},
	body: JSON.stringify(donneesCommande),
});
       
        
    } 
    }, false)
 
    
// let btnValidation =  document.getElementById('validation'); 









