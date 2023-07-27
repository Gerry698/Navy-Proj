let ghosts = [];
let colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "black", "purple", "orange"];
let eyeRadius = 20;
let pupilRadius = 10;
let headRadius = 60;
let bodyWidth = 2 * headRadius;
let bodyHeight = 100;
let eyeSpacing = 25; //from center of head
let box = document.getElementById("box");
box.style.setProperty("top","0px");
box.style.setProperty("left","35%")

let canvas = document.getElementById("canvas");

canvas.addEventListener('click', addRandomGhost, false);
function addRandomGhost(event) {
    let cx = event.offsetX;
    let cy = event.offsetY;
    let color = colors[Math.floor(colors.length * Math.random())];
    let ghost = document.createElementNS("http://www.w3.org/2000/svg", "g");
    ghost.setAttribute("x", cx - headRadius);
    ghost.setAttribute("y", cy - headRadius);
    ghost.appendChild(createCircle(cx, cy, headRadius, color));
    ghost.appendChild(createRectangle(cx-headRadius, cy, 2*headRadius, 2*headRadius, color));
    canvas.appendChild(ghost);
    //ball legs
    ghost.appendChild(createCircle(cx-bodyWidth/3, cy+bodyHeight+15, headRadius/3, color));
    ghost.appendChild(createCircle(cx-bodyWidth/3+40, cy+bodyHeight+15, headRadius/3, color));
    ghost.appendChild(createCircle(cx-bodyWidth/3+80, cy+bodyHeight+15, headRadius/3, color));
    //eyes
    ghost.appendChild(createCircle(cx-eyeSpacing, cy, headRadius/4, "white"));
    ghost.appendChild(createCircle(cx+eyeSpacing, cy, headRadius/4, "white"));
    //pupils
    ghost.appendChild(createCircle(cx-eyeSpacing, cy, headRadius/9, "black"));
    ghost.appendChild(createCircle(cx+eyeSpacing, cy, headRadius/9, "black"));
    ghosts.push(ghost);
    //move eyes
}
canvas.addEventListener('mousemove', move, false);
function move(event) {
    for (let ghost of ghosts) {
        for(let i = 6; i<8; i++) {
            let dx = 0;
            let dy = 0;
            let tx = event.offsetX;
            let ty = event.offsetY;
            let eye = ghost.getElementsByTagName("circle")[i - 2];
            let pupil = ghost.getElementsByTagName("circle")[i]
            let ox = Number(eye.getAttribute("cx"));
            let oy = Number(eye.getAttribute("cy"));
            let ds = eyeRadius - pupilRadius;
            if (tx != ox) {
                let m = (ty - oy) / (tx - ox);
                dx = Math.sign(tx-ox) * ds / Math.sqrt(1 + m * m); 
                dy = m * dx;
            }
            else {
                dy = Math.sign(ty - oy) * ds;
            }
            pupil.setAttribute("cx", ox + dx);
            pupil.setAttribute("cy", oy + dy);
        }
    }
}   
function createCircle(x, y, radius, color) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    return circle;
}

function createRectangle(x1, y1, w, h, color){
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x1);
    rect.setAttribute("y", y1);
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);

    rect.setAttribute("fill", color);
    return rect;

}