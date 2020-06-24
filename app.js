/*****************************/
/* Construction des objets  */
/*****************************/


/******* Mon Objet***********/
class MonObjet {
     constructor(nom,photo,prix,id,stock,ean){
          this.nom =nom,
          this.photo = photo,
          this.prix = prix,
          this.id = id,
          this.stock = stock;
          this.ean = ean
     }
     rajouterStock(n){
          this.stock += n
     }
     enleverStock(n){
          this.stock -= n
     }
     ajouterObjet(){
          tabObjet.push(this)
     }
}

/******* Objet Vendu ********/
class ObjetVendu {
     constructor(title, quantite, fullName, contactAdress, email, phoneNumber, shippingServiceCode){
          this.title = title,
          this.quantite = quantite,
          this.fullName = fullName,
          this.contactAdress = contactAdress,
          this.email = email,
          this.phoneNumber = phoneNumber,
          this.shippingServiceCode = shippingServiceCode
     }
     getTitle(){
          return this.title;
     }
     getQuantite(){
          return this.quantite;
     }
     getFullName(){
          return this.fullName;
     }
     getAdress(){
          return this.contactAdress;
     }
     getMail(){
          return this.email;
     }
     getPhoneNumber(){
          return this.this.phoneNumber;
     }
     getShipping(){
          return this.shippingServiceCode;
     }
     getPhotos(objet){
          return objet.photo;
     }
}

/******* Info Vente *********/

class InfoVente {
     constructor(title,quantite,prixVente,taxes){
          this.title = title,
          this.quantite = quantite,
          this.prixVente = prixVente,
          this.taxes = taxes
     }
     getQuantite (){
          return this.quantite;
     }
     getPrixVente(){
          return this.prixVente;
     }
     getTaxes(){
          return this.taxes
     }
     getCiffreAffaire(){
          return this.prixVente * this.quantite;
     }
     getBenifices(objet){
          return ((this.prixVente - this.taxes - objet.prix) - ((this.prixVente /100)*13))* (this.quantite)
     }
     ajouterBenifices(mois,objet/*nombre */){
          // On utulisra Date pour récupres le mois
          tabbenifices[mois]+= this.getBenifices(objet);
     }
}

/******* Info Client ********/

class Client{
     constructor(fullName, contactAdress, email, phoneNumber,id){
          this.fullName = fullName,
          this.contactAdress = contactAdress,
          this.email = email,
          this.phoneNumber = phoneNumber,
          this.id = id,
          this.fidelite = 0

     }
     verifierClient(){
          let res = false;
          // const resultatNom = tabClient.find( nom => nom.fullName === this.fullName);
          // const resultatMail = tabClient.find( mail => mail.email === this.email);
          for(let i = 0 ;i<tabClient.length;i++){
               if ( tabClient[i].id == this.id){
                    res = true;
                    break;
               }
          }
          return res;

     }
     ajouterClient(){
          // si le client n'est pas dans tableau client je le rajoute
          if (!this.verifierClient()){
               tabClient.push(this);
          }

     }
     fideliteClient(){
          // rechercher si client existe dans tabClient  si il est dans le tableau je rajoute 1 a fidelite
          for(let i = 0 ;i<tabClient.length;i++){
               if ( tabClient[i].id == this.id){
                    tabClient[i].fidelite++;
                    return tabClient[i].fidelite;
               }
          }
     }
}

/******* Gestion Vente********/

class GestionVente{
     constructor(id, infoVente, objetVendu, Client){
          let date = new Date();
          this.id = id,
          this.infoVente = infoVente,
          this.objetVendu = objetVendu,
          this.Client = Client,
          this.traitement = false;
          this.monObjet = this.getMonObjet();
          this.date = [date.getDate(),date.getMonth(),date.getFullYear()]
     }
     getMonObjet(){
          const monObjet = tabObjet.find( nom => nom.id === this.id)
          return monObjet;
     }
     venteTraite(){
          this.traitement = true;
     }
     ajouterGestionVente(){
          tabGestionVente.push(this);
     }
}

/******* Affichage  ********/
class Affichage {
     static creeOnglets(){
          // Générer Onglets
          for (let i = 0; i<tabOnglets.length;i++){
               let span = document.createElement('span')
               onglets.appendChild(span);
               span.classList.add('mes_ongles')
               span.style.display = "inline-block"
               span.innerText = tabOnglets[i];
               span.style.cursor ="pointer"
              // span.style.width = width;
          }
            /* Génerer le contenud  */
            for(let i =0; i<tabOnglets.length;i++){
                 let div = document.createElement('div')
                 div.classList.add('contenu_ongles')
                 contenu.appendChild(div);
                 div.id = tabOnglets[i];
                 div.hidden = true;
                 div.style.display = "none"
                 div.style.width = "100vw"
            }
            /* Apparence du contenu*/
            for (let i =0; i<onglets.children.length;i++){
                 onglets.children[i].addEventListener('click',()=>{
                     console.log(onglets.children[i])
                      for(let j =0 ;j<contenu.children.length;j++){
                           if(contenu.children[j].id != onglets.children[i].innerHTML){
                              contenu.children[j].hidden = true;
                              onglets.children[j].style.backgroundColor = " rgb(255,255,255)";
                              contenu.children[j].style.display ="none";
                           }
                           else{
                              contenu.children[j].hidden = false
                              onglets.children[i].style.backgroundColor = " aliceblue";
                              contenu.children[j].style.display ="flex";
                           }
                      }
                 })
            }
     }
     static TableauDeBord(){
          const tableauDeBord = document.querySelector('#TableaudeBord');
          console.log(tableauDeBord);
          for(let i = 0; i < tabGestionVente.length; i++){
               let date = new Date();
               let tabDate = [date.getDate(),date.getMonth(),date.getFullYear()];
               let nbDeVente = 0;
               let beneficeDuJour = 0;
               let chiffreDaffaireJour =0;
               let commandeATraiter =0;
               let divGauge1 = document.createElement('div');
               tableauDeBord.appendChild(divGauge1);
               divGauge1.id ="gauge_1"
               let divGauge2 = document.createElement('div');
               tableauDeBord.appendChild(divGauge2);
               divGauge2.id ="gauge_2"
               let divGauge3 = document.createElement('div');
               tableauDeBord.appendChild(divGauge3);
               divGauge3.id ="gauge_3"
               let divGauge4 = document.createElement('div');
               tableauDeBord.appendChild(divGauge4);
               divGauge4.id ="gauge_4"

               if (tabGestionVente[i].traitement == false ){
                    commandeATraiter++;
               }
               if(tabDate[0]== tabGestionVente[i].date[0]&&(tabDate[1]== tabGestionVente[i].date[1])&&(tabDate[2]== tabGestionVente[i].date[2])){
                    let objet = tabGestionVente[i].monObjet;
                    nbDeVente++;
                    beneficeDuJour+=tabGestionVente[i].infoVente.getBenifices(objet);
                    chiffreDaffaireJour += tabGestionVente[i].infoVente.getCiffreAffaire();
               }
               document.addEventListener("DOMContentLoaded", function(event) {
                    var g1 = new JustGage({
                         id: "gauge_1",
                         value: nbDeVente,
                         min: 0,
                         max: 100,
                         title: "Nombre De Vente",
                         label: "",
                         shadowOpacity: 1,
                         shadowSize: 5,
                         shadowVerticalOffset: 10
                       });
                       var g2 = new JustGage({
                         id: "gauge_2",
                         value: beneficeDuJour,
                         min: 0,
                         max: 1000,
                         title: "Benifice Du Jour",
                         label: "",
                         shadowOpacity: 1,
                         shadowSize: 5,
                         shadowVerticalOffset: 10
                       });
                       var g3 = new JustGage({
                         id: "gauge_3",
                         value: chiffreDaffaireJour,
                         min: 0,
                         max: 10000,
                         title: "Chiffre d'affaire du jour",
                         label: "",
                         shadowOpacity: 1,
                         shadowSize: 5,
                         shadowVerticalOffset: 10
                       });
                       var g4 = new JustGage({
                         id: "gauge_4",
                         value: commandeATraiter,
                         min: 0,
                         max: 100,
                         title: "Commandes a traiter",
                         label: "",
                         shadowOpacity: 1,
                         shadowSize: 5,
                         shadowVerticalOffset: 10
                       });
                       setInterval(function() {
                         g1.refresh(nbDeVente);
                         g2.refresh(beneficeDuJour);
                         g3.refresh(chiffreDaffaireJour);
                         g4.refresh(commandeATraiter);
                       }, 2500);
               })

          }
     }

     static pageStock(){
          const stock = document.querySelector('#Stock')
     //let stockDispo = getStockDispo(tabObjet);
     for(let i=0;i<tabObjet.length;i++){
               let article = document.createElement('article');
               stock.appendChild(article);
               article.innerHTML = "<h3>"+tabObjet[i].nom+"</h3>"+
                                   "<img src="+ tabObjet[i].photo+">"+
                                   "<p> Staock :"+tabObjet[i].stock+"</p>"
                                   console.log(article);
           }
         
     }
     static pageClients(){
          const client= document.querySelector('#Clients');
          for( let i= 0; i<tabClient.length; i++){
               let article = document.createElement('article')
               client.appendChild(article)
               article.innerHTML =  "<p> Nom: "+ tabClient[i].fullName +"</p>"+
                                    "<p> Adress: "+ tabClient[i].contactAdress +"</p>"+
                                   "<p> email: "+ tabClient[i].email+"</p>"+
                                   "<p> Téléphone: "+ tabClient[i].phoneNumber+"</p>"+
                                   "<p> Indice Fidélié: "+ tabClient[i].fidelite+"</p>"
          }
     }
     static pageObjets(){
          const objets = document.querySelector('#Objets')
          let btnAjouter = document.createElement('button');
          objets.appendChild(btnAjouter)
          btnAjouter.addEventListener('click',()=>{
               pageModaleObjet()
          })
          btnAjouter.innerText = "Ajouter" ;
          btnAjouter.style.position ="absolute"
          btnAjouter.style.right ="0"
          //let objets = contenu[4];
           for(let i = 0; i < tabObjet.length; i++){
               let article = document.createElement('article');
               objets.appendChild(article);
               article.classList.add('article_objet')
               article.innerHTML = "<h3>"+ tabObjet[i].nom+"</h3>"+
                                   "<img src="+ tabObjet[i].photo+">"+
                                   "<img src="+ tabObjet[i].ean+">"+
                                   "<p> Prix: "+ tabObjet[i].prix +"</p>"+
                                   "<p> id: "+ tabObjet[i].id +"</p>"+
                                   "<p> stock: "+ tabObjet[i].stock+"</p>"
               }
     }
     static pageVente(){
          const ventes = document.querySelector('#Vente')
          for(let i = 0; i < tabGestionVente.length; i++){
               let vente = tabGestionVente[i]
               if(vente.traitement === false){
                    let article = document.createElement('article')
                    ventes.appendChild(article);
                    article.innerHTML = "<h3> "+ vente.objetVendu.getFullName() +"</h3>"+
                                        "<img src="+vente.monObjet.photo +">"+
                                        "<p> Quantité: "+ vente.objetVendu.getQuantite() +"</p>"+
                                        "<p> Adress: "+ vente.objetVendu.getAdress() +"</p>"+
                                        "<p> Transporteur: "+ vente.objetVendu.getShipping() +"</p>"+
                                        "<p> Email: "+ vente.objetVendu.getMail() +"</p>"+
                                        "<button>Traiter</button>";
                    let buttonTraiter = article.children[6];
                    buttonTraiter.addEventListener('click',()=>{
                         pageModaleTraiter()
                    })
               }
          }
     }
}
/*****************************/
         /* Functions */
/*****************************/


/******* Globale ********/

/******* Api ********/
function httpR(url,callback){
     let requete = new XMLHttpRequest();
     requete.addEventListener('readystatechange',()=>{
          if(requete.readyState === 4){
               console.log(requete.readyState);
               console.log(requete.status)
               if(requete.status ===200){
                   let reponse = JSON.parse(requete.responseText)
                     callback(reponse)
               }
               else{
                    //alert("err")
               }
          }
          
     });
     requete.open("GET",url,true);
     requete.send()
}
function httpRGetOrders(url,token,body){
     let requete = new XMLHttpRequest();
requete.open("GET", url, true);
requete.setRequestHeader("Authorization","Bearer " + token);
requete.setRequestHeader('Content-Type','text/xml');
requete.setRequestHeader('X-EBAY-API-COMPATIBILITY-LEVEL','391');
requete.setRequestHeader('X-EBAY-API-DEV-NAME','3afb0867-77c3-4ba5-9442-aee8174c050d');
requete.setRequestHeader('X-EBAY-API-APP-NAME','bengamra-DWWM-PRD-969ec6afc-efdebfd2');
requete.setRequestHeader('X-EBAY-API-CERT-NAME','PRD-69ec6afc32c2-5212-4c16-aab4-5e71');
requete.setRequestHeader('X-EBAY-API-CALL-NAME','GetOrders');
requete.setRequestHeader('X-EBAY-API-SITEID','0');
requete.onreadystatechange = function(){
    if(requete.readyState==4){
        console.log(requete.status);
        if(requete.status == 200){
          let reponse = JSON.parse(requete.responseText)
          // on recupére le nombre de commande 
          let  nombreDeCommande = reponse.total;
          //On construie notre objet de vente autent de fois du'il ya de commande :
          for (let i = 0;i<nombreDeCommande;i++){
               let commande = reponse.orders[i];
               let fullName = commande.fulfillmentStartInstructions[0].shippingStep.shipTo.fulName;
               let adress = commande.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress
               let contacAdress = 
                                   `${adress.addressLine1}
                                   ${adress.city}
                                   ${adress.postalCode}
                                   ${aress.stateOrProvince}
                                   ${adress.countryCode}`;
               let email =  commande.fulfillmentStartInstructions[0].shippingStep.shipTo.email;
               let phoneNumber = commande.commande.fulfillmentStartInstructions[0].shippingStep.shipTo.primaryPhone.phoneNumber;
               let shippingServiceCode = commande.commande.fulfillmentStartInstructions[0].shippingStep.shipTo.shippingServiceCode;
               let nombredObjet = commande.lineItems.length;
               let idClient = chiffreArbitraire(10)
               //contruction par raport au nombre d'objet vendu dans la même commande :
               for (let j = 0;j<nombredObjet;j++){
                    let objet = commande.lineItems[j]
                    let title = objet.title;
                    let quantite = objet.quantity;
                    let id = objet.legacyItemId;
                    let prixVente = objet.total.value/quantite;
                    let taxes = objet.taxes[0].amount.value;
                    let objetVendu = new ObjetVendu(title,quantite,fullName,contacAdress,email,phoneNumber,shippingServiceCode);
                    let infoVente = new InfoVente(title,quantite,prixVente,taxes);
                    let client = new Client(fullName,contacAdress,email,phoneNumber,idClient);
                    let gestionVente = new GestionVente(id,infoVente,objetVendu,client);
                    let objetInterne = gestionVente.monObjet;
                    objetInterne.enleverStock(quantite);
                    infoVente.ajouterBenifices(gestionVente.date[1],objetInterne);
                    client.fideliteClient();
                    gestionVente.ajouterGestionVente();
               }
          }
          // siprimer l'afficahge et réaficher;
          afficher()
        }
    }
}
requete.send(body);
}
function getVersion(reponse){

     console.log(reponse.getVersionResponse[0].version[0]) ;
}
function getTime(reponse){
    
     console.log(reponse.getVersionResponse[0].timestamp[0]) ;
}

/******* Gestion des ventes ********/



/*******Gestion des stocks ********/
function getStockDispo ( tabObjets){
     let tabStock = new Array(tabObjets.length)
     for(let i =0;i<tabObjets.length;i++){
          tabStock[i]= { nom :tabObjets[i].nom, stock:tabObjets[i].stock}
     }
     return tabStock
}


/*******Gestion budgétaire ********/

/*******Gestion des clients ********/
function chiffreArbitraire(n){
     let  chifreArbtraire =0
     for(let i = 0; i< n; i++){
         chifreArbtraire= String(chifreArbtraire)+ Math.floor(Math.random() * Math.floor(9));
     }
     return chifreArbtraire
 }
/******* Affichage  ********/
function pageModaleObjet(){
     let modal = document.createElement('div');
     let ajouter = document.createElement('button');
     let modalgris = document.createElement('div');
     modal.classList.add('modal');
     modalgris.classList.add('gris')
     document.body.appendChild(modalgris);
     document.body.appendChild(modal);
     modalgris.addEventListener('click',()=>{
          modal.remove();
          modalgris.remove();
     })
     for(let i =0;i<tabMonObjet.length;i++){
          let label = document.createElement('label');
          let input = document.createElement('input');
          modal.appendChild(label);
          modal.appendChild(input);
          label.innerText = tabMonObjet[i];
          input.id =  tabIdMonObjet[i];
          input.setAttribute("type",tabTypeMonObjet[i]);
          input.placeholder= tabValueMonObjet[i];
     }
     modal.appendChild(ajouter)
     ajouter.innerText ="Ajouter";
     ajouter.id ="myajouter";
     let divObjets = document.querySelector('#Objets');
     console.log(divObjets),
     ajouter.addEventListener('click', ()=>{
          let nom = document.querySelector(`#${tabIdMonObjet[0]}`).value;
          let photo = document.querySelector("#"+tabIdMonObjet[1]).value;
          let prix = document.querySelector("#"+tabIdMonObjet[2]).value;
          let stock = document.querySelector("#"+tabIdMonObjet[3]).value;
          let id = document.querySelector("#"+tabIdMonObjet[4]).value;
          let ean = document.querySelector("#"+tabIdMonObjet[5]).value;
          let objetAjouter = new MonObjet(nom,photo,prix,id,stock,ean);
          while(divObjets.firstChild){
               divObjets.removeChild(divObjets.firstChild)
          }
          objetAjouter.ajouterObjet();
          console.log("Avent"+tabObjet);
          modal.remove();
          modalgris.remove();
          Affichage.pageObjets()
          console.log("aprés"+ tabObjet);
              
     })
     modal.appendChild(input);
     modal.appendChild(envoyer)
     envoyer.innerText="Envoyer";
     label.innerText = "Numéro de suivie";
     modalgris.addEventListener('click',()=>{
          modal.remove();
          modalgris.remove();
     })
}
function afficher(){
     Affichage.creeOnglets()
     Affichage.pageClients()
     Affichage.pageStock()
     Affichage.pageObjets()
     Affichage.pageVente()
     Affichage.TableauDeBord()
}
/*****************************/
     /* Cors du code  */

/*****************************/

/******* Variables Globales ********/
let tabObjet = [];
let tabbenifices = [0,0,0,0,0,0,0,0,0,0,0,0];
let tabClient = [];
let tabGestionVente =[];
let referencesClients =[];
const onglets = document.querySelector('#onglets');
const contenu = document.querySelector('#contenu');
//genereIdentifient()
let tabMonObjet = ["Nom","Photo","Prix","Stock","Identifient","EAN"];
let tabIdMonObjet = ["nom","photo","prix","stock_disponiblle","id","ean"];
let tabTypeMonObjet =["text", "url", "number", "number", "text", "url"];
let tabValueMonObjet = ["Nom du produit", "http://photo.jpg", "250", "100", "6254458011", "http://codebarre.jpg"];
let tabOnglets = ["TableaudeBord","Vente","Stock","Clients","Objets"];
let newObjet = new MonObjet("ordi","../\img/\a4be550988_50029130_ordi-olxfr-02.jpg",250,1234,10,"./\img/\dcode-image.png")
let newObjet1 = new MonObjet("tablette","./\img/\images.jpg",70,1235,10,"./\img/\dcode-image__1_.png")
let urlGetVersion = "https://cors-anywhere.herokuapp.com/"
    urlGetVersion+= "https://svcs.ebay.com/services/search/FindingService/v1?";
    urlGetVersion+= "OPERATION-NAME=getVersion&";
    urlGetVersion+= "SERVICE-VERSION=1.13.0&";
    urlGetVersion+= "SECURITY-APPNAME=bengamra-DWWM-PRD-969ec6afc-efdebfd2&";
    urlGetVersion+= "RESPONSE-DATA-FORMAT=JSON";
let token ="v^1.1#i^1#p^3#f^0#r^0#I^3#t^H4sIAAAAAAAAAOVYa2wURRzv9YFBKMZA5BFjzuVhAPdud+/2Hkvvkiu90hP6vAIFAmRudrZd2Nu97Mz2en6QpjaAECKJARISBY0aYj8gGEkgEkGjEgioIEY0kaCpUUlAEUG+oLPXB9cSodcj0sT7ctmZ//P3f80M1zlu/LyNNRtvljseKd7byXUWOxz8BG78uLL5k0qKZ5QVcTkEjr2dszpLu0p+rsAgqaWkJoRTho6RsyOp6VjKLoYYy9QlA2AVSzpIIiwRKMUjtUskwcVJKdMgBjQ0xhmrCjGBBAjIHggQD32QQyJd1QdkNhshBvhFIPNelPABkOB5SPcxtlBMxwToJMQInMCxnIcVxGaek0RBEkSX18utZJzLkIlVQ6ckLo4JZ82Vsrxmjq33NhVgjExChTDhWKQ6Xh+JVUXrmivcObLC/TjECSAWHvq10JCRcxnQLHRvNThLLcUtCBHGjDvcp2GoUCkyYMwozM9CDT3QgyAIijyQAx7Z/0CgrDbMJCD3tsNeUWVWyZJKSCcqydwPUYpGYh2CpP+rjoqIVTntv0YLaKqiIjPERCsjK5bGo02MM97QYBrtqoxk21Pe4/UIPiHIM2GCMIUQmWvldDrZr6dPWD/KwxQtNHRZtTHDzjqDVCJqNBoOjTcHGkpUr9ebEYXYBuXSCQMQevwr7Zj2BdEibbodVpSkODizn/cPwEBG3MmBB5UTQkD0+XkuKHKCz+8R5btzwq71/"
token+="PMibIcm0tDgtm1BCZBhk8Bcj0hKAxCxkMJrJZGpypJHVARPQEGs7AsqrDeoKGxClH0sryDEIZRIwGDgf5QehJhqwiJoMEWGb2R9DDE2pJIKFIkY65HenEkhZjhltvH050UHDjFthKQktzudTrvSHpdhtroFjuPdLbVL4rANJQEzSKven5hVsxkCEeXCqkSoASGmgyYgVa63MuGmaHVTNF6ztrl+cbRuIHmHWBYevvovnsYRNBEZW95569SmxQ04GFj3fHqZd7HW6MZL3ZF1K1ScEYKNqNGfbI4E4tH2SBsOFeY8NFKowdBUmPkvELBrfeQoeEy5AZgkU2ll6HccaRr9K8hdbLs7tkJt82MqAKRUl110Lmgk3QagfdteWpu12DkSInfCylD9MjJdJgKyoWuZkfO1WrRP9XGPjAnTaLj6Wi51I0+NQ5nz4FH1dtqyDDMzGoWDzHnwAAgNSyejUdfPmgeHYmmKqml2Vx6Nwhz2fMzUgZYhKsSjj2F25lJ4sdraRgbl2LU+Qll0jQ5rKgMCAjQj33SyExi3GamUnYmQdow86kVRaL0AC2bPOPkZS6d99qSZp7V389MuoWoFS0m1GToqWAqQZZPeEQqWYx8MCxbSd28ZVS2out1zcT7tgZ6HXLIJlHyqJwUy2XKVVZyyx0x"
token+="+6gqaZZFUKpZMWgQkNBSTH+5Qo7Vecdf09vJcgC/YxYfs2XCvqhEtj0UgyVYtX17LxitbWIgUX8DnF+mVQuBRAAYTBflchdrHms8eoCQ46iLr90MP600AkQ16vQILEArwfi/kRE4uyOeFmkqLaOxdMmoMTNCIXRu2kHPDuutu7R76thUuyv74LsdRrstxuNjh4Pwcy8/n5o4rWVpaMpHBtFu4MNDlhNHhorcyFx21Ou2NJnKtR5kUUM3icQ7126/gXzmvantXc9MG39XGl/ATch7ZuCfv7JTxj00tp8B4BJHnREEQV3Iz7+yW8k+UTrn0hzH54FNzDs0+MOvkZRJ07H9z0imufJDI4SgrKu1yFAUWHd+R7Gmprn1xyuZjb3TXJA5d3IynN5adm1M+a1r6lxs7trfOuLGhyNXavLv7lSPTN33as+vsnJ9A56M/zmX3ek/dmsgtubbUuUa2rn9+7Na82xsqNq2I/9a7bdkzC7bt2H9b2CY//fuNZ4/82nJ6X+95pfubJdf28e/Pvrpjyvc/nD0zI35510lj1bSLb+85E+6tIDUfbml/fNP1yd0lW1/oMdacP3TkxCvRrX++tSUz9csvPvY3tHSfm7lJPb+nvGl1ee21ne/N3E6ec38X+/vm0dcvHFKuXlG7Tp3wH1jlOv3OR7D0pc4ruCf59SeNlxZ8wL8affnCYWP6a6h3X9Vnu9/Va45PvHzwRPrkTrEvjP8AJHZBDO8UAAA="
let urlGetOrders = "https://cors-anywhere.herokuapp.com/"
urlGetOrders +="https://api.sandbox.ebay.com/sell/fulfillment/v1/order?";
let body = `<?xml version="1.0" encoding="utf-8"?>
<GetOrdersRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials>
  <eBayAuthToken>${token}</eBayAuthToken>
  </RequesterCredentials>
  <CreateTimeFrom>2020-03-20T10:55:24.626Z</CreateTimeFrom>
  <CreateTimeTo>2020-03-22T10:55:24.626Z</CreateTimeTo>
  <OrderRole>Seller</OrderRole>
</GetOrdersRequest>`
newObjet.ajouterObjet();
newObjet1.ajouterObjet();
let newObjetVendu = new ObjetVendu("titre",2,"DWWM test","15 rue truc ","email@email",062542665,"DHL")
newObjet.enleverStock(newObjetVendu.quantite)
let newInfoVente = new InfoVente("titre",2,350,15)
newInfoVente.ajouterBenifices(3,newObjet)
let newClient = new Client ("DWWM test","15 rue truc ","email@email",062542665,1234);
newClient.ajouterClient();
newClient.fideliteClient();
let newGestionVente = new GestionVente(1234,newInfoVente,newObjetVendu,newClient)
newGestionVente.ajouterGestionVente()
let date = new Date();
console.log(date)

/******* Api ********/
// httpR(urlGetVersion,getVersion);
// httpR(urlGetVersion,getTime);
//httpRGetOrders(urlGetOrders,token,body);

/******* Gestion des ventes ********/



/*******Gestion des stocks ********/

console.log(getStockDispo(tabObjet))

/*******Gestion budgétaire ********/



/*******Gestion des clients ********/


/******* Affichage  ********/
afficher()

