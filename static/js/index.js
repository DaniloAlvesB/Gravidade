// info
let info = {
    valocity: 5,
    velocityX: 0,
    velocityY: 0,
    angle: 0,
    gravity: 0.001,
    friction: 1,
    posX:0,
    posY: 0,
}

function loop(){

    if(document.getElementById('line1') != null){

        var el = document.getElementById('line1')

        if(!clicked && el != null){

            var el = document.getElementById('line1')

            var refX = parseFloat(el.style.left.replace('px', ''))
            var refY = parseFloat(el.style.top.replace('px', ''))

            info.posX = refX
            info.posY = refY

            //Gravity
            const distanciaX = (planetPost.left + (planetPost.size/2)) - (refX + meteorSize)
            const distanciaY = (planetPost.top + (planetPost.size/2)) - (refY + meteorSize)

            const aceleracaoX = distanciaX * info.gravity
            const aceleracaoY = distanciaY * info.gravity

            //Apply velocity with acceleration
            info.velocityX += aceleracaoX
            info.velocityY += aceleracaoY

            //Att position with vel
            info.posX += info.velocityX
            info.posY += info.velocityY

            //Apply friction
            info.velocityX *= info.friction
            info.velocityY *= info.friction

            el.style.left = info.posX + "px"
            el.style.top = info.posY + "px"

        }

    }

    setTimeout(() => {
        loop()
    }, 10)
}
loop()


// CLICK VISUAL
function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
    }
    return false
}

var clicked = false
var events = {
    mouseDown: 'mousedown',
    mouseUp: 'mouseup',
    mouseMove: 'mousemove',
}

if(isMobile()){

    events = {
        mouseDown: 'touchstart',
        mouseUp: 'touchend',
        mouseMove: 'touchmove',
    }

}

document.addEventListener(events.mouseDown, (e) => {

    clicked = true
    if(isMobile()){
        var touch = e.touches[0];
        var mouseX = touch.clientX;
        var mouseY = touch.clientY;
    }else{
        var mouseX = e.clientX;
        var mouseY = e.clientY;
    }

    var body = document.getElementsByTagName('body')[0]

    if(document.getElementById('line1') == null){
        body.innerHTML += `
            <div id="line1" class="line" 
                style="
                    position: fixed;
                    top: ${mouseY-22.5}px;
                    left: ${mouseX-22.5}px;
                "
            ></div>
            <div id="click1" class="circleclick" 
                style="
                    position: fixed;
                    top: ${mouseY-15}px;
                    left: ${mouseX-15}px;
                "
            ></div>
        `
    }

})

document.addEventListener(events.mouseUp, (e) => {

    clicked = false
    var element = document.getElementById('click1')

    if(element != null){
        element.parentNode.removeChild(element)
    }

})

document.addEventListener(events.mouseMove, (e) => {

    if(clicked){
        
        if(isMobile()){
            var touch = e.touches[0];
            var mouseX = touch.clientX;
            var mouseY = touch.clientY;
        }else{
            var mouseX = e.clientX;
            var mouseY = e.clientY;
        }

        var el = document.getElementById('line1')

        if(el != null){
            el.style.left = mouseX-22.5 + 'px'
            el.style.top = mouseY-22.5 + 'px'
            console.log(el.style.left)
        }else{
            console.log(el)
        }

        //Angle
        var click = document.getElementById('click1')

        var refX = parseFloat(click.style.left.replace('px', ''))
        var refY = parseFloat(click.style.top.replace('px', ''))

        var vetorX = mouseX - refX;
        var vetorY = mouseY - refY;

        // Calcular o ângulo em radianos entre o vetor e o eixo X
        var anguloEmRadianos = Math.atan2(vetorY, vetorX);

        // Converter o ângulo para graus
        var anguloEmGraus = anguloEmRadianos * 180 / Math.PI;
        anguloEmRadianos = (anguloEmGraus+180) * Math.PI / 180

        info.angle = anguloEmRadianos

        var velX = info.valocity * (vetorX/100) * Math.cos(anguloEmRadianos)
        var velY = info.valocity * (vetorY/100) * Math.sin(anguloEmRadianos)

        info.velocityX = velX
        info.velocityY = velY

        localStorage.setItem('info', JSON.stringify({
            velX: velX,
            velY: velY,
            angle: anguloEmRadianos
        }))

    }

})

//Reset
function reset(){

    var el = document.getElementById('line1')
    if(el.parentNode){
        el.parentNode.removeChild(el)
    }

    info = {
        valocity: 5,
        velocityX: 0,
        velocityY: 0,
        angle: 0,
        gravity: 0.001,
        friction: 1,
        posX:0,
        posY: 0,
    }

}

//Planet
var meteorSize = 22.5
var planet = document.getElementById('planet')
var planetSize = 250 * window.innerWidth / 1366
var planetPost = {
    size: planetSize,
    top: (window.innerHeight/2) - (planetSize/2) + (planetSize/4),
    left: (window.innerWidth/2) - (planetSize/2),
}
planet.style.width = planetSize + 'px'
planet.style.height = planetSize + 'px'
planet.style.top = planetPost.top + "px"
planet.style.left = planetPost.left + "px"