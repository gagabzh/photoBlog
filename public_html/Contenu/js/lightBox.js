/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var links = document.querySelectorAll('.miniature'),
    linksLen = links.length;

for (var i = 0; i < linksLen; i++) {

    links[i].addEventListener('click', function(e) {
        e.preventDefault(); // On bloque la redirection

        // On appelle notre fonction pour afficher les images
        // currentTarget est utilisé pour cibler le lien et non l'image
        displayImg(e.currentTarget);
    });

}

function displayImg(link) {

    var img = new Image(),
        overlay = document.getElementById('overlay');

    img.addEventListener('load', function() {
        overlay.innerHTML = '';
        overlay.appendChild(img);
    });

    img.src = link.href;
    overlay.style.display = 'block';
    overlay.innerHTML = '<span>Chargement en cours...</span>';

}

document.getElementById('overlay').addEventListener('click', function(e) {
    // currentTarget est utilisé pour cibler l'overlay et non l'image
    e.currentTarget.style.display = 'none';
});

