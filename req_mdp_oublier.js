"use strict";

const fs = require("fs");

const trait = function (req, res, query) {

    let marqueurs;
    let page;
    let contenu_fichier;
    let listeMembres;
    let i;
    let trouve;

    contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
    listeMembres = JSON.parse(contenu_fichier);

    trouve = false;
    i = 0;
    while (i < listeMembres.length && trouve === false) {
        if (listeMembres[i].pseudo === query.pseudo) {
            if (listeMembres[i].password === query.password) {
				if (listeMembres[i].password2 === query.password2) {
                trouve = true;
            }
            } 
        }
        i++;
    }

	if	(query.nouveau_mdp === query.confirmation_mdp && trouve === true) {
		
		page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

		marqueurs = {};
		marqueurs.confirmation = "Votre mot de passe a bien été modifié !";
		marqueurs.erreur = "";
		marqueurs.pseudo = query.pseudo;
		marqueurs.password = query.password;
		marqueurs.password2 = query.password2;
		page = page.supplant(marqueurs);
		listeMembres[listeMembres.length] = marqueurs;
		listeMembres[i-1].password = query.confirmation_mdp;
		
		contenu_fichier = JSON.stringify(listeMembres);

		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');

	} else {
		
		if (trouve === false) {

			page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : ce compte n'existe pas";
			marqueurs.password = "";
			marqueurs.password2 = "";
			marqueurs.pseudo = "";
			marqueurs.confirmation = "";
			page = page.supplant(marqueurs);

		} else {

			page = fs.readFileSync('modele_mdp_oublier.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : Votre nouveau mot de passe et la confirmation du nouveau mot de passe ne sont pas cohérent !";
			marqueurs.confirmation = "";
			marqueurs.pseudo = "";
			marqueurs.password = "";
			marqueurs.password2 = "";
			page = page.supplant(marqueurs);
		}
	}

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(page);
		res.end();
};

//-------------------------------------------------------------------

module.exports = trait;
