// Affiche la première page du site.

"use strict";

const fs = require("fs");
require("remedial");

const trait = function (req, res, query) {
    let page;
    let contenu;
    let partie;
    let marqueurs;
	let position;
	let random;
    // Récupération de la partie.

    contenu = fs.readFileSync("partie.json", "utf-8");
    partie = JSON.parse(contenu);
	//position du joueur avant le lancer de des	
	position = partie.joueurs[partie.actif].position;
	//on verifie si le joueur doit passer son tour ou pas
	if (partie.joueurs[partie.actif].passetour === 0) {
		//on lance le des, donc on genere un nombre entre 1 et 12
		random = Math.floor(Math.random() * 12) + 1;
		//on ajoute la valeur de lancer de des a la position du joueur
		position = position + random;
		switch (position) {
			case 58:
				//case tete de mort, position du joueur est == a 1
				partie.joueurs[partie.actif].position = 1;
				//pour l'affichage du script adapte a la case tete de mort
				partie.joueurs[partie.actif].script = 58;
				break;
			case 19:
				//le joueur passe 2 tours
				partie.joueurs[partie.actif].passetour = 2;
				partie.joueurs[partie.actif].script = 19;
				break;
			case 42:
				partie.joueurs[partie.actif].position = 30;
				partie.joueurs[partie.actif].script = 42;
				break;
			case 31:
				partie.joueurs[partie.actif].passetour = 1;
				partie.joueurs[partie.actif].script = 31;
				break;
			case 52:
				partie.joueurs[partie.actif].passetour = 2;
				partie.joueurs[partie.actif].script = 52;
				break;
			case 9:
			case 18:
			case 27:
			case 36:
			case 45:
			case 54:
				//case boost
				position = position + random;
				partie.joueurs[partie.actif].position = position;
				partie.joueurs[partie.actif].script = 9;
				break;
			default: 
				partie.joueurs[partie.actif].position = position;
				partie.joueurs[partie.actif].script = 0;
				break;
		}
		//pour memoriser le dernier lancer de des
		partie.joueurs[partie.actif].dernierNb = random;
	} else {
		//on decrement passetour
		partie.joueurs[partie.actif].passetour--;	
	}

	if (position > 63) {
		partie.victoire = true;
		partie.actif = (partie.actif + 1) % partie.joueurs.length;
		contenu = JSON.stringify(partie);
		fs.writeFileSync("partie.json", contenu, "utf-8");

		page = fs.readFileSync("./modele_gagne.html", "utf-8");

		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(page);
		res.end();
		return;
	}

    // Incrémentation de l'indice du joueur actif.

    partie.actif = (partie.actif + 1) % partie.joueurs.length;
    contenu = JSON.stringify(partie);
    fs.writeFileSync("partie.json", contenu, "utf-8");

    page = fs.readFileSync("./modele_jeu_passif.html", "utf-8");

    marqueurs = {};
    marqueurs.pseudo = query.pseudo;
    marqueurs.plateau = "";
    marqueurs.script = "";
	marqueurs.des = "";
	marqueurs.Histoire = "";
	marqueurs.DernierLancer = ""
	

	page = page.supplant(marqueurs);

    //envoi de la reponse

    res.writeHead(200, { "Content-Type": "text/html" }); 
    res.write(page);
    res.end();
};

module.exports = trait;
