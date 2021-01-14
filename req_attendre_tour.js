// Affiche la première page du site.

"use strict";
const afficher_plateau = require("./fct_afficher_plateau.js");
const fs = require("fs");
require("remedial");

const traits = function (req, res, query) {
    let page;
    let contenu;
    let partie;
    let i;
    let trouve;
    let marqueurs;

    // Récupération de la liste des gens déjà en attente.

    contenu = fs.readFileSync("partie.json", "utf-8");
    partie = JSON.parse(contenu);

    // Création de la page à afficher.

    marqueurs = {}; 
    marqueurs.pseudo = query.pseudo;
    marqueurs.plateau = afficher_plateau(partie);
    if (partie.joueurs[partie.actif].pseudo === query.pseudo) {
        console.log("ACTIF")
        page = fs.readFileSync("modele_jeu_actif.html", "utf-8");
    } else {
        console.log("PASSIF")
        page = fs.readFileSync("modele_jeu_passif.html", "utf-8");
    }   

    page = page.supplant(marqueurs);

    // Envoi de la réponse.

    res.writeHead(200, { "Content-Type": "text/html" }); 
    res.write(page);
    res.end();
};

module.exports = traits;
