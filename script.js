// variaveis do jogo

let canvas, ctx, height, width, frames = 0, max_jumps = 3,

floor = {
    x: null,
    y: null,
    xf: null,
    yf: null,
    color: 'hsl(40, 100%, 70%)',
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.xf, this.yf);
    }
},

block = {
    x: 75,
    y: 0,
    xf: 75,
    yf: 75,
    color: 'blue',
    gravity: 0.8,  /* m/s^2 */
    speed: 0,
    jump_power: 15,
    number_of_jumps: 0,
    update: function () {
        this.speed += this.gravity;
        this.y += this.speed;
        if (this.y + this.yf >= floor.y) {
            this.y = floor.y - this.yf
            this.number_of_jumps = 0;
        }
    },
    jump: function () {
        if (this.number_of_jumps < max_jumps) {            
            this.speed = -this.jump_power;
            this.number_of_jumps++
        }
    },
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.xf, this.yf);
    }
};


function click(event)/* clique */ {
    block.jump();
}

function main()/* principal */ {
    /* defining canvas dimensions variables */
    width = window.innerWidth;
    height = window.innerHeight;

    /* creating a canvas: */
    canvas = document.createElement('canvas');
    /* defining the dimensions: */
    canvas.width = width;
    canvas.height = height;
    /* setting edge: */
    // removed because of full screen
    // canvas.style.borderStyle = 'solid';
    // canvas.style.borderWidth = '1px';
    // canvas.style.borderColor = 'black';
    // canvas.style.borderRadius = '10px';

    /* defiing the canvas context: */
    ctx = canvas.getContext('2d');
    /* adding child to body */
    document.body.appendChild(canvas);

    /* click on the canvas */
    document.addEventListener('mousedown', click);
    /* click a key */
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
            case 'ArrowUp': block.jump();
            break;
        }
    })

    loop();
}

function loop()/* loop */ {
    update();
    draw();

    /* chama a function loop a cada frame */
    window.requestAnimationFrame(loop);
}

function update()/* atualize */ {
    frames++;

    block.update();
}

function draw()/* desenhe */ {
    /* drawing background */
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, width, height);
    /* drawing floor */
    floor.x = 0;
    floor.y = height - 60;
    floor.xf = width;
    floor.yf = 60;
    floor.draw();
    /* drawing block */
    block.draw();
}

// inicializa o jogo
main();

window.addEventListener('resize', () => {
    /* redefining canvas dimensions variables */
    width = window.innerWidth;
    height = window.innerHeight;

    /* redefining the dimensions: */
    canvas.width = width;
    canvas.height = height;
})