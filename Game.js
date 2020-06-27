class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    
    line1 = createSprite(displayWidth,displayHeight/5,75000,5);
    line2 = createSprite(displayWidth,displayHeight/3,75000,5);
    line3 = createSprite(displayWidth,displayHeight/2-30,75000,5);
    line4 = createSprite(displayWidth,displayHeight/2+70,75000,5);
    line5 = createSprite(displayWidth,displayHeight/2+170,75000,5);

    player1 = createSprite(200,200,30,40);
    player2 = createSprite(200,300,30,40);
    player3 = createSprite(200,400,30,40);
    player4 = createSprite(200,500,30,40);
    player1.scale=0.35;
    player2.scale=0.35;
    player3.scale=0.35;
    player4.scale=0.35;
    player1.addImage("player1",plr1img);
    player2.addImage("player2",plr2img);
    player3.addImage("player3",plr3img);
    player4.addImage("player4",plr4img);

    players = [player1,player2,player3,player4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(255);
      var index = 0;
      var x;
      var y = 100;

      for(var plr in allPlayers){
        index = index+1;
        x = displayWidth - allPlayers[plr].distance*4;
        y = y+100;
        players[index-1].x = x;
        players[index-1].y = y;

        if(index === player.index){
          stroke(10);
          fill(255);
          ellipse(x,y,90,90);
          players[index-1].shapeColor = "red";
          camera.position.x = players[index-1].x;
          camera.position.y = displayHeight/2;
        }
      }
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance = player.distance-10;
      player.update();
    }
    if(player.distance >-6000){
      gameState = 2;
    }
    drawSprites();
  }
  end(){
    console.log("Game Ended");
    game.update(2);
  }
 }
