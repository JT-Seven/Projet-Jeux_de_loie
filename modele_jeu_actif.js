"use strict"
const fs = require("fs");
let personnage;
let list_joueurs;
let joueurs;
let charactere;

charactere = fs.readFileSync("personnage.json","utf-8");
personnage = JSON.parse(charactere);

joueurs = fs.readFileSync("joueurs.json", "utf-8");
 list_joueurs = JSON.parse(joueurs); 
                                                                     
