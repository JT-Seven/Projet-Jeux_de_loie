"use strict"

const fs = require("fs");
require("remedial");

const traits = function(req, res, query) {
let page;


	if(pathname === "/req_commencer") {
	
		page = fs.readFileSync("modele_salle_attente.html","utf-8");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page);
		res.end();
	}

};

module.exports = traits;
