document.getElementsByClassName("mood")[0].addEventListener("click",addGhost,false)

function addGhost(event) {

    let x = event.offsetX;
    let y = event.offsetY;

    let ghost=document.createElement("img");
    ghost.setAttribute("src","ghost.svg");
    ghost.className = "ghost";
    ghost.style.setProperty("left",x.toString());
    ghost.style.setProperty("top",y.toString());

    document.getElementsByClassName("mood")[0].appendChild(ghost);

}