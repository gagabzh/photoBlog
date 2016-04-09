/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: true,
        itemWidth: 210,
        itemMargin: 5,
        minItems: 1,
        maxItems: 5
    });
});
function afficher_cache(id){
    if(document.getElementById(id).style.visibility==="hidden")
    {
        document.getElementById(id).style.visibility="visible";
        document.getElementById("A" + id).setAttribute("class","visible");
//        document.getElementById("B" + id).innerHTML="N";
    }
    else
    {
        document.getElementById(id).style.visibility="hidden";
        document.getElementById("A" + id).setAttribute("class","hidden");
//        document.getElementById("B" + id).innerHTML="V";
    }
    return true;
    
}
