/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//function loadFile(file) {
//    
//    var xhr = new XMLHttpRequest();
//    
//    // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
//    xhr.open('GET', file);
//    
//    xhr.addEventListener('readystatechange', function() { // On gère ici une requête asynchrone
//        
//        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
//            
//            document.getElementById('fileContent').innerHTML = '<span>' + xhr.responseText + '</span>'; // On l'affiche !
//            
//        } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !
//            
//            alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
//            
//        }
//        
//    });
//    
//    xhr.send(null); // La requête est prête, on envoie tout !
//    
//}
//(function() { // Comme d'habitude, une IIFE pour éviter les variables globales
//    
//    var inputs = document.getElementsByTagName('input'),
//    inputsLen = inputs.length;
//    
//    for (var i = 0; i < inputsLen; i++) {
//        
//        inputs[i].addEventListener('click', function() {
//            loadFile("../" + this.value); // À chaque clique, un fichier sera chargé dans la page
//        });
//        
//    }
//    
//})();
//
//    function sendDSL() {
//        var scriptElement = document.createElement('script');
//        scriptElement.src = '../testphp/dsl_script_json.php';
//
//        document.body.appendChild(scriptElement);
//    }
//
//    function receiveMessage(json) {
//        var tree = '',
//            nbItems, i;
//
//        for (node in json) {
//            tree += node + "\n";
//            nbItems = json[node].length;
//
//            for (i = 0; i < nbItems; i++) {
//                tree += '\t' + json[node][i] + '\n';
//            }
//        }
//
//        alert(tree);
//    }
    
    (function() {
    
	var searchElement = document.getElementById('search'),
	    results = document.getElementById('results'),
	    selectedResult = -1, // Permet de savoir quel résultat est sélectionné : -1 signifie "aucune sélection"
	    previousRequest, // On stocke notre précédente requête dans cette variable
    	previousValue = searchElement.value; // On fait de même avec la précédente valeur
	
	
	
	function getResults(keywords) { // Effectue une requête et récupère les résultats
	
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', '../testphp/autocompletion.php?s='+ encodeURIComponent(keywords));
	
    	xhr.addEventListener('readystatechange', function() {
        	if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
	
	            displayResults(xhr.responseText);
	
        	}
	    });
	
	    xhr.send(null);
	
	    return xhr;
	
	}
	
	function displayResults(response) { // Affiche les résultats d'une requête
	
    	results.style.display = response.length ? 'block' : 'none'; // On cache le conteneur si on n'a pas de résultats
	
	    if (response.length) { // On ne modifie les résultats que si on en a obtenu
	
	        response = response.split('|');
	        var responseLen = response.length;
	
	        results.innerHTML = ''; // On vide les résultats
	
	        for (var i = 0, div ; i < responseLen ; i++) {
	
            	div = results.appendChild(document.createElement('div'));
            	div.innerHTML = response[i];
	
            	div.addEventListener('click', function(e) {
                	chooseResult(e.target);
	            });
	
	        }
	
	    }
	
	}
	
	function chooseResult(result) { // Choisi un des résultats d'une requête et gère tout ce qui y est attaché
	
	    searchElement.value = previousValue = result.innerHTML; // On change le contenu du champ de recherche et on enregistre en tant que précédente valeur
	    results.style.display = 'none'; // On cache les résultats
	    result.className = ''; // On supprime l'effet de focus
	    selectedResult = -1; // On remet la sélection à "zéro"
	    searchElement.focus(); // Si le résultat a été choisi par le biais d'un clique alors le focus est perdu, donc on le réattribue
	
	}
	
	
	
	searchElement.addEventListener('keyup', function(e) {
	
    	var divs = results.getElementsByTagName('div');
	
	    if (e.keyCode == 38 && selectedResult > -1) { // Si la touche pressée est la flèche "haut"
	
	        divs[selectedResult--].className = '';
	
	        if (selectedResult > -1) { // Cette condition évite une modification de childNodes[-1], qui n'existe pas, bien entendu
	            divs[selectedResult].className = 'result_focus';
	        }
	
	    }
	
	    else if (e.keyCode == 40 && selectedResult < divs.length - 1) { // Si la touche pressée est la flèche "bas"
	
        	results.style.display = 'block'; // On affiche les résultats
	
	        if (selectedResult > -1) { // Cette condition évite une modification de childNodes[-1], qui n'existe pas, bien entendu
            	divs[selectedResult].className = '';
	        }
	
        	divs[++selectedResult].className = 'result_focus';
	
	    }
	
	    else if (e.keyCode == 13 && selectedResult > -1) { // Si la touche pressée est "Entrée"
	
	        chooseResult(divs[selectedResult]);
	
	    }
	
    	else if (searchElement.value != previousValue) { // Si le contenu du champ de recherche a changé
	
	        previousValue = searchElement.value;
	
	        if (previousRequest && previousRequest.readyState < XMLHttpRequest.DONE) {
	            previousRequest.abort(); // Si on a toujours une requête en cours, on l'arrête
        	}
	
	        previousRequest = getResults(previousValue); // On stocke la nouvelle requête
	
	        selectedResult = -1; // On remet la sélection à "zéro" à chaque caractère écrit
	
    	}
	
	});
	
})();