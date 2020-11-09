class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      

    }
    car1 = createSprite(100, 200);
    car1.addAnimation("blueIdle", blue_idle);
    car1.addAnimation("blueRun", blue_run);
    car1.addAnimation("blueCrouch", blue_crouch);
    car1.addAnimation("blueDeath", blue_death);
    car1.scale = 2;
    car2 = createSprite(300, 200);
    car2.addImage("car2", car2_img);
    // car3 = createSprite(500,200);
    // car3.addImage("car3",car3_img);
    // car4 = createSprite(700,200);
    // car4.addImage("car4",car4_img);
    cars = [car1, car2];
    
  }

  play() {
    form.form_hide();

    Player.getPlayerInfo();
    //player.getcarsAtEnd();
    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      console.log(allPlayers);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;
      for (var t in allPlayers) {
        for (var plr in allPlayers[t]) {
          index = index +1;
          console.log(index);
          console.log(allPlayers[t][plr].positionX);
          console.log(allPlayers[t][plr].positionY);
          cars[index - 1].x = allPlayers[t][plr].positionX;
          cars[index - 1].y = allPlayers[t][plr].positionY;
          
          if(index != player.index){
            if(player.bullets.isTouching(cars[index - 1])){
            player.health -= 2;
            player.update();
            }
            if(player.health < 0){
              gameState = 2;
            }
          }

          

          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
            //cars[index - 1].shapeColor = "red";
            camera.position.x = cars[index - 1].x;
            camera.position.y = cars[index - 1].y;
          }

          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.positionY -= 10
      player.update();
      gameState = 3;
    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null) {
      player.positionY += 10
      player.update();
      gameState = 3;
    }

    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      if(player.team === 1){
        player.positionX = constrain(
        player.positionX -= 10,0, displayWidth/2-20)
      }

      if(player.team === 2){
        player.positionX = constrain(
        player.positionX -= 10, displayWidth/2+20, displayWidth);
      }
      //player.positionX -= 10
      player.update();
      gameState = 3;
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      if(player.team === 1){
        player.positionX = constrain(
        player.positionX += 10,0, displayWidth/2-20)
      }

      if(player.team === 2){
        player.positionX = constrain(
        player.positionX += 10, displayWidth/2+20, displayWidth);
      }
      //player.positionX += 10
      player.update();
      gameState = 3;
    }

    if (keyWentDown("c") && player.index !== null) {
      cars[player.index-1].changeAnimation("blueCrouch", blue_crouch);
      console.log("crouch");
    }

    if (keyWentUp("c") && player.index !== null) {
      cars[player.index-1].changeAnimation("blueIdle", blue_idle);
    }

    if(mouseIsPressed){
      //if(mouseButton === LEFT){
        console.log("mouse");
        player.makeBullets();
      //}
    }


    if (player.distance > 3860) {
      gameState = 2;
    }

    drawSprites();
  }
  


  end() {
    console.log("Game Ended");
    cars[index - 1].velocityX = 0;
    cars[index - 1].velocityY = 0;
    bullets.destroyEach();
    //console.log(player.rank)
    player.update();
  }
}
