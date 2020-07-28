# Platforme_Gestion_Ecommerce
Projet de groupe créé avec trois autres collègues pendant ma formation.
***Exemple avec les API de eBay.***
## Introduction :
L’idée du projet était de créer une interface E-commerce pour les vendeurs. Toujours difficile de gérer ses ventes, ses stocks ainsi que ses produits quand ils sont disponibles sur plusieurs points de ventes E-commerce, ce site permet à tous les vendeurs de retrouver l’intégralité des informations de leur produit dans un seul et unique endroit. Disposer en plusieurs catégories, il devait être facile pour les vendeurs de naviguer sur le site. 
Pour ce qui est de la partie technique, je suis  parti sur le JavaScript et les API. Pour ces dernières, j'ai pris comme test, celle de eBay. Pour le code, j'ai commencer par créer les différentes catégories de notre site qui sont au nombre de 5 :
   -Tableau de bord
	 -La vente
	 -Les stocks
	-Les clients
	-Les produits
## Construction des Objets :
### MonObjet:
Objet Interne de l’entreprise sera créé après la mise en vente puisque en lui donnera le même identifient attribué par eBay. Cet Objet contient toute les information relative a l’objet( nom ,prix , ean, stock …).
Il a trois méthode rajouter , enlever stock et ajouter objet celle ci rajoute l’objet une fois créé dans le tableau des objets utile pour la gestion et l’affichage ensuite.
### ObjetVendu:
Contient tout les information de l’objet vendu en gros tout ce qui est utile pour le traitement de la commande comme ( nom de l’acheteur , l’adresse , la quantité ….).
Les méthodes attribué a cet objet sont tous des Get+Propriété de l’objet .
### InfoVente :
Contient toute les information relative a la gestion de la vente comme ( prix de vente , taxes…).
Pour le méthodes il y a bien sur des Get +Propriétés  en plus des méthodes de calcules du chiffre d’affaire relative  a la vente.
### Client :
Contient toute les information relative aux clients.
Les Méthodes permettent de créer un client, l’ajouter, le vérifier et même le fidéliser.
### GestionVente :
Contient toute les Objet Client, Objet Vendu, Info vente , l’identifient qui permet de récupérer L’objet mon Objet Grace a une méthode, le traitement initialisé a False et la date stocké  dans un tableau ,
Les Méthodes associer permettent de Obtenir  mon objet, changer l’état du traitement et ajouter tout l’objet gestion vente a un tableau gestion vente.
## Affichage :
Une fois toutes ces parties terminées, nous devons pouvoir afficher ce que nous voulons à l’écran. C’est la partie affichage. Dans cette partie, nous avons gérer les onglets, générer le contenu ainsi que l’apparence de ce même contenue.
### Système des onglets :
On créé au départ des span on leur donne une taille et du contenu, puis on créé des div au même nombre des span et leurs donne un identifient a chaque un tous initialisé en display none puis on gère l’apparence du contenu en écoutent le clic sur le span et si celui la est cliqué on affiche la div correspondante et on cache les autres.
### Tableau de bord :
On sélectionne  la div créé précédemment et a laide du tableau gestion vente et la date, on vérifie les élément du tableau date on compte le nombre de vente, le bénéfice du jour et chiffre d’affaire du jour. On conte aussi le  nombre de commande non traité grâce a la propriété  traitement. Finalement l’affichage ce fait avec la bibliothèque Juste Gage.
### Pages Objets, Stock, vente et Client :
On sélectionne la div créé précédemment et a laide des tableaux et les objets stocké dedans on récupère les information qu’on voulait et les affiche.
## API :
LA méthode utilisé avec les API eBay c’est GetOrders qui nécessite un header un body est une autorisation. Une fois le fichier JSON est récupéré en le traite de la façon suivante :
on récupère le nombre de commande  puis autant de fois qu’on a de commande on récupère les information reliée au client (nom ,mail, adresse…) puis sur la même commande on peut trouver plusieurs objets, ensuite avec le nombre d’objet acheté en récupère les information reliée a l’objet( titre, quantité, prix de vente …) et a l’aide de toute ces information en construit notre objet gestion de vente par le suite en appelle les méthodes qu’on veux et au finale en ré-affiche sur le site.
## Ajouts Pratiques :
Afin que l’utilisateur puisse rajouter ou enlever des objets ou des clients, j'ai de rajouté un modale sur le site. A chaque ajout de l’utilisateur, une page s’ouvre et les infos peuvent ensuite être rentrées à l’intérieur et sont immédiatement enregistrées. Il est possible aussi de modifié des informations existantes. 

Pour créer notre modale, uniquement disponible dans certaines catégories et dans certains cas, nous avons créer un bouton « ajouter ».
