var ball;
var position;
var database;

function preload(){

    ballImage=loadImage("Ball.png");
}

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.addImage(ballImage);
    ball.scale=0.1;
    

    database=firebase.database();
    var ballposition=database.ref("ball/position");
    ballposition.on("value",readposition);

}

function draw(){
    background(rgb(240, 177, 233));
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
    database.ref("ball/position").set({
        x:ball.x,
        y:ball.y,
    })
}

function readposition(data){
    position=data.val();
    ball.x = position.x;
    ball.y = position.y;
    console.log(position);

}