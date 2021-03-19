// get element from main .html file
const canv = document.getElementById("c");
//seperate getContext to be able to get dimensions from canvs and still draw on canvas
const c = canv.getContext("2d");

//snake array
let snake = [{x: 130, y: 100}, {x: 120, y: 100},{x: 110, y: 100},{x: 100, y: 100}];
//variable declarations
let mx = 0; let my = 0; let fx = 0; let fy = 0;let score = 0;

function drawSnake(s)
{
    //declare canvas color
    c.fillStyle = 'white';

    // object to draw inheriting material color
    c.fillRect(s.x,s.y,20,20);
}
function movement()
{
    // add movementX to X to make the snake move, same for y
let h = {x: snake[0].x + mx, y: snake[0].y + my};
// unshifting adds an object as the first element of the array
snake.unshift(h);

//Proof checking if snake is overriding canvas width and height to warp

if(snake[0].x >= canv.width)
{
    snake[0].x = 0;
}else if(snake[0].x <= 0)
{
    snake[0].x = canv.width;
}else if(snake[0].y >= canv.height)
{
    snake[0].y = 0;
}else if(snake[0].y <= 0)
{
    snake[0].y = canv.height;
}

//Checking snake collision with fruit
if(snake[0].x < fx + 20 && snake[0].y < fy + 20 && fy< snake[0].y + 20 && fx < snake[0].x + 20)
{
    initFruit();
    snake.length += 5;
    score++;
}
else{
    //popping removes last element of array
snake.pop();
}
}


function initFruit()
{
//Declaring Math.random() returning between 0 and 1 and multiplying by 580 to get a random number between 0.0 and 580 and floating to a whole number
fx = Math.float(Math.random() * 580);
fy = Math.float(Math.random() * 580);
}
initFruit();

function drawFruit()
{
    //Setting color as red and using fx and fy to draw fruit positions
    c.fillStyle = 'red';
    c.fillRect(fx,fy,20,20);
}

document.addEventListener('keydown', (event) =>
{   /*
    Structure check proofs if a movement is currently active making sure to disable double movement
    and instant K/O
    */
    switch(event.key)
    {
        case "ArrowUp":
        if(my == 5) // If my is 5, my is -5 isn't passed through
        {
            my = 5;
            mx = 0;
        }else{// else this is passed through and my= -5 is called. Same for all other cases
        mx = 0;
        my = -5;
        }
        break;

        case "ArrowDown":
        if(my == -5)
        {
            my = -5;
            mx = 0;
        }else{
        mx = 0;
        my = 5;
        }
        break;

        case "ArrowLeft":
        if(mx == 5)
        {
            mx = 5;
            my = 0;
        }else{
        my = 0;
        mx = -5;
        }
        break;

        case "ArrowRight":
        if(mx == -5)
        {
            mx = -5;
            my = 0;
        }else{
        mx = 5;
        my = 0;
        }
        break;

        
    }
});
function update()
{
//dump the current canvas content ready to draw the next frame
c.clearRect(0,0,canv.width,canv.height);
//each of the snake's elements get drawn
snake.forEach(drawSnake);
//call drawFruit so fruit isn't dumped in canvas dump statement
drawFruit();
//looping through movement to be able to proof different directions, fruit eat e.t.c.
movement();
for(let i = 4; i< snake.length; i++) // Starts looping snake collision check when snake's length > 4 disabling instant K/0
{   
    // checking if snake[head].x is equals to snake[Any part of body].x same for y
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y)
    {
    // Reset array length to 1
    snake.length = 1;
    mx = 0;
    my = 0;
    score = 0;
    initFruit();
}
}
//Set canvas draw color to white and font to sans-serif as 48 pixels
c.fillStyle = 'white';
c.font = '48px sans-serif';
//fillText operation passes through (variable, x,y) in this case we divide width by 2 and subtract 30 to center and pass y as 50 because our font size is 48px
c.fillText(score, ((canv.width/2) - 30) , 50);

}

//setInterval runs a function after every ms. (1000ms = 1s) so 18ms as an update loops gives us 1000/18 or about 60 fps
setInterval(update, 18);