"use strict";

const fs = require("fs");

const trait = function (req, res, query) {

    let marqueurs;
    let page;
    let contenu_fichier;
    let listeMembres;
    let i;
    let trouve;
	let ajout;
	let question;
	let reponse;

    contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
    listeMembres = JSON.parse(contenu_fichier);

    trouve = false;
	question = false;
	reponse = false;
    i = 0;
    while (i < listeMembres.length && trouve === false && question === false && reponse === false) {
        if (listeMembres[i].pseudo === query.pseudo) {
        	trouve = true;
        } else {
			trouve = false;
		} 
		if (listeMembres[i].reponse === query.reponse) {
            trouve = true;
			reponse = true;
        } else {
			reponse = false;
		}
		 if (listeMembres[i].question === query.selection_question) {
            trouve = true;
			question = true;
        } else {
			question = false;
        }

        i++;
    }

	if	(trouve === true && question === true && reponse === true) {

		page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

		marqueurs = {};
		marqueurs.confirmation = "Votre mot de passe a bien été modifié !";
		marqueurs.erreur = "";
		marqueurs.pseudo = "";
		marqueurs.password = "";
		marqueurs.password2 = "";
		marqueurs.reponse = "";
		page = page.supplant(marqueurs);


		ajout = {};
		ajout.confirmation = "Mot de Passe modifié !";
		ajout.pseudo = query.pseudo;
		ajout.password = query.confirmation_mdp;
		ajout.question = query.selection_question;
		ajout.reponse = query.reponse;
		listeMembres[listeMembres.length] = ajout;
		listeMembres[i-1].password = query.confirmation_mdp;
		
		contenu_fichier = JSON.stringify(listeMembres);

		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
	
	} else {
		
		page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

		marqueurs = {};
		marqueurs.confirmation = "";
		marqueurs.erreur = "ERREUR : Dans vos changement !";
		marqueurs.pseudo = "";
		marqueurs.password = "";
		marqueurs.password2 = "";
		marqueurs.reponse = "";

	}

	if (trouve === true && query.nouveau_mdp !== query.confirmation_mdp) {
		
		page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : Votre nouveau mot de passe et la confirmation du nouveau mot de passe ne sont pas cohérent !";
        marqueurs.confirmation = "";
        marqueurs.pseudo = "";
        marqueurs.password = "";
        marqueurs.password2 = "";
        page = page.supplant(marqueurs);
	
	} 

	if (question === false) {

        page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : choix de question est incorrecte";
		marqueurs.password = "";
        marqueurs.password2 = "";
        marqueurs.pseudo = "";
        marqueurs.confirmation = "";
        page = page.supplant(marqueurs);

    } 


	if (reponse === false) {

        page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : la reponse est incorecte";
        marqueurs.password = "";
        marqueurs.password2 = "";
        marqueurs.pseudo = "";
        marqueurs.confirmation = "";
        page = page.supplant(marqueurs);

    }


	if (trouve === false) {

        page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : ce compte n'existe pas";
        marqueurs.password = "";
        marqueurs.password2 = "";
        marqueurs.pseudo = "";
        marqueurs.confirmation = "";
        page = page.supplant(marqueurs);

    }

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(page);
		res.end();
};

//-------------------------------------------------------------------

module.exports = trait;
