/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// On crée l'élément conteneur
/*var mainDiv = document.createElement('div');
mainDiv.id = 'divTP1';

// On crée tous les nœuds textuels, pour plus de facilité
var textNodes = [
    document.createTextNode('Le '),
    document.createTextNode('World Wide Web Consortium'),
    document.createTextNode(', abrégé par le sigle '),
    document.createTextNode('W3C'),
    document.createTextNode(', est un '),
    document.createTextNode('organisme de standardisation'),
    document.createTextNode(' à but non-lucratif chargé de promouvoir la compatibilité des technologies du '),
    document.createTextNode('World Wide Web'),
    document.createTextNode('.')
];

// On crée les deux <strong> et les deux <a>
var w3cStrong1 = document.createElement('strong');
var w3cStrong2 = document.createElement('strong');

w3cStrong1.appendChild(textNodes[1]);
w3cStrong2.appendChild(textNodes[3]);

var orgLink = document.createElement('a');
var wwwLink = document.createElement('a');

orgLink.href = 'http://fr.wikipedia.org/wiki/Organisme_de_normalisation';
orgLink.title = 'Organisme de normalisation';
orgLink.appendChild(textNodes[5]);

wwwLink.href = 'http://fr.wikipedia.org/wiki/World_Wide_Web';
wwwLink.title = 'World Wide Web';
wwwLink.appendChild(textNodes[7]);

// On insère le tout dans mainDiv
mainDiv.appendChild(textNodes[0]);
mainDiv.appendChild(w3cStrong1);
mainDiv.appendChild(textNodes[2]);
mainDiv.appendChild(w3cStrong2);
mainDiv.appendChild(textNodes[4]);
mainDiv.appendChild(orgLink);
mainDiv.appendChild(textNodes[6]);
mainDiv.appendChild(wwwLink);
mainDiv.appendChild(textNodes[8]);

// On insère mainDiv dans le <body>
document.body.appendChild(mainDiv);


// On crée l'élément conteneur
var mainDiv2 = document.createElement('div');
mainDiv2.id = 'divTP2';

// On place le texte dans des objets, eux-mêmes placés dans un tableau
// Par facilité, la création des nœuds textuels se fera dans la boucle
var languages = [{
    t: 'JavaScript',
    d: 'JavaScript est un langage de programmation de scripts principalement utilisé dans les pages web interactives mais aussi coté serveur.'
}, {
    t: 'JScript',
    d: 'JScript est le nom générique de plusieurs implémentations d\'ECMAScript 3 créées par Microsoft.'
}, {
    t: 'ActionScript',
    d: 'ActionScript est le langage de programmation utilisé au sein d\'applications clientes (Adobe Flash, Adobe Flex) et serveur (Flash media server, JRun, Macromedia Generator).'
}, {
    t: 'EX4',
    d: 'ECMAScript for XML (E4X) est une extension XML au langage ECMAScript.'
}];

// On crée le paragraphe
var paragraph = document.createElement('p');
var paragraphText = document.createTextNode('Langages basés sur ECMAScript :');
paragraph.appendChild(paragraphText);


// On crée la liste, et on boucle pour ajouter chaque item
var defList = document.createElement('dl'),
    defTerm, defTermText,
    defDefn, defDefnText;

for (var i = 0, c = languages.length; i < c; i++) {
    defTerm = document.createElement('dt');
    defDefn = document.createElement('dd');

    defTermText = document.createTextNode(languages[i].t);
    defDefnText = document.createTextNode(languages[i].d);

    defTerm.appendChild(defTermText);
    defDefn.appendChild(defDefnText);

    defList.appendChild(defTerm);
    defList.appendChild(defDefn);
}

// On insère le tout dans mainDiv
mainDiv2.appendChild(paragraph);
mainDiv2.appendChild(defList);

// On insère mainDiv dans le <body>
document.body.appendChild(mainDiv2);

var mainDiv3 = document.createElement("div");
mainDiv3.id = "divTP4";

var myForm = document.createElement("form");
myForm.enctype = "multipart/form-data";
myForm.method = "post";
myForm.action = "upload.php";

var myFieldSet = document.createElement("fieldset");
var myLegend = document.createElement("legend");
var myLegendText = document.createTextNode("Uploader une image");
myLegend.appendChild(myLegendText);

var myDiv = document.createElement("div");
myDiv.style = "text-align: center";

var myLabel = document.createElement("label");
myLabel.for = "inputUpload";
var myLabelText = document.createTextNode("Image à uploader :");
myLabel.appendChild(myLabelText);

var myInput1 = document.createElement("input");
myInput1.type = "file";
myInput1.name="inputUpload";
myInput1.id = "inputUpload";

var myInput2 = document.createElement("input");
myInput2.type = "submit";
myInput2.value = "Envoyer";

var myBr = document.createElement("br");

myDiv.appendChild(myLabel);
myDiv.appendChild(myInput1);
myDiv.appendChild(myBr);
myDiv.appendChild(myBr);
myDiv.appendChild(myInput2);

myFieldSet.appendChild(myLegend);
myFieldSet.appendChild(myDiv);

myForm.appendChild(myFieldSet);

mainDiv3.appendChild(myForm);
document.body.appendChild(mainDiv3);*/

(function() { // On utilise une IIFE pour ne pas polluer l'espace global
    var storage = {}; // Contient l'objet de la div en cours de déplacement

    function init() { // La fonction d'initialisation
        var elements = document.querySelectorAll('.draggableBox'),
            elementsLength = elements.length;

        for (var i = 0; i < elementsLength; i++) {
            elements[i].addEventListener('mousedown', function(e) { // Initialise le drag & drop
                var s = storage;
                s.target = e.target;
                s.offsetX = e.clientX - s.target.offsetLeft;
                s.offsetY = e.clientY - s.target.offsetTop;
            });

            elements[i].addEventListener('mouseup', function() { // Termine le drag & drop
                storage = {};
            });
        }

        document.addEventListener('mousemove', function(e) { // Permet le suivi du drag & drop
            var target = storage.target;

            if (target) {
                target.style.top = e.clientY - storage.offsetY + 'px';
                target.style.left = e.clientX - storage.offsetX + 'px';
            }
        });
    }

    init(); // On initialise le code avec notre fonction toute prête.
})();


