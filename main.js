var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 20;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactus여러개 = [];
var jumptimer = 0;
var animation;

function frame (){
    animation = requestAnimationFrame(frame);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if (timer % 200 === 0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i, o)=>{
        if (a.x < 0){
            o.splice(i, 1);
        }
        a.x-=4;

        bump(dino, a);

        a.draw();
    })

    dino.draw()

    if (jumping == true){
        dino.y-=6;
        jumptimer++;
    }
    if (jumping == false){
        if (dino.y < 200){
            dino.y+=6;
        }
    }
    if (jumptimer > 25){
        jumping = false;
        jumptimer = 0;
    }
}
frame();

var jumping = false; 
document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        jumping = true;
    }
})

function bump(dino, cactus){
    var x_gap = cactus.x - (dino.x + dino.width);
    var y_gap = cactus.y - (dino.y + dino.height);
    if (x_gap < 0 && y_gap < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}