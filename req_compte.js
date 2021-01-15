"use strict";

const fs = require("fs");

const trait = function (req, res, query) {

    let marqueurs;
    let page;
    let contenu_fichier;
    let listeMembres;
    let i;
    let trouve;

    contenu_fichier = fs.readFileSync("./membres.json", 'utf-8');
    listeMembres = JSON.parse(contenu_fichier);

    trouve = false;
    i = 0;
    while (i < listeMembres.length && trouve === false) {
        if (listeMembres[i].pseudo === query.pseudo) {
            if (listeMembres[i].password === query.password) {
                trouve = true;
            }
        }
        i++;
    }
        if(query.nouveau_mdp === query.confirmation_mdp) {
            listeMembres[i-1].password = query.confirmation_mdp;
			
            page = fs.readFileSync('modele_compte.html', 'utf-8');

            marqueurs = {};
            marqueurs.confirmer = "Votre mot de passe a bien été modifié !";
			marqueurs.erreur = "";
			marqueurs.pseudo = query.pseudo;
            marqueurs.password = query.password;
            page = page.supplant(marqueurs);
			listeMembres[listeMembres.length] = marqueurs;
            
			contenu_fichier = JSON.stringify(listeMembres);

            fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');

        } else {
            page = fs.readFileSync('modele_compte.html', 'utf-8');

            marqueurs = {};
            marqueurs.erreur = "ERREUR : Votre nouveau mot de passe et la confirmation du nouveau mot de passe ne sont pas cohérent !";
            marqueurs.confirmer = "";
			marqueurs.pseudo = query.pseudo;
            marqueurs.password = query.password;
            page = page.supplant(marqueurs);
        }
    

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

//-------------------------------------------------------------------

module.exports = trait;
