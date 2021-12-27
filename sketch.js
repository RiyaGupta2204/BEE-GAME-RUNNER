var Bee,BeeIMG
var Beetle, kBeetle, BeetleIMG, kBeetleIMG
var ladyBug, ladyBugIMG
var stickBug, stickBugIMG, Crab, CrabIMG 
var mountain, mountainImg
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bugsGroup,bug1,bug2,bug3,bugS
var score


function preload() {
    BeeImg = loadImage("BEE.png");   
    BeetleIMG = loadImage("BEEtle.png");
    kBeetleIMG = loadImage("kBEEtle.png");
    ladyBugIMG = loadImage("ladyBug.png");
    stickBugIMG = loadImage("stickBug.png");
    pogMusic = loadSound("stickBuggedLol.mp3");
    mountainImg = loadImage("Mountain.png");
    CrabIMG = loadImage ("Crab.png")
}


function setup() {
    createCanvas(1000, 615);
    
    //pogMusic.loop();
    mountain = createSprite(500, 300);
    mountain.addImage("Mountain", mountainImg);
    mountain.scale = 4
    mountain.depth = 0
    
    BEE = createSprite(500, 307);
    BEE.addImage("BEE", BeeImg);
    BEE.scale = 0.2
    bugsGroup = new Group();
 

}

function draw() {

    edges= createEdgeSprites();
    BEE.collide(edges);
         
    text("Score: " + score, 800, 50);

    if (gameState === PLAY) {

        score = score + Math.round(getFrameRate() / 60);
    
        if (keyDown("left_arrow")) {
            BEE.x = BEE.x - 5;
        }

        if (keyDown("right_arrow")) {
            BEE.x = BEE.x + 5;
        }

        if (keyDown("up_arrow")) {
            BEE.y = BEE.y - 5;
        }

        if (keyDown("down_arrow")) {
            BEE.y = BEE.y + 5;
        }
        spawnBugs();

        if (frameCount % 1000 === 0) {
            var Crab = createSprite(100,307, 10, 40);
            Crab.addImage(CrabIMG);
            Crab.velocityX = 7; 
            Crab.lifetime = 200;
            Crab.scale = 2
            Crab.setCollider("circle",100,100)
        }

        if (bugsGroup.isTouching(BEE)) {
            gameState = END;
        }
        
        else if (gameState === END) {
            bugsGroup.setVelocityXEach(0);
            bugsGroup.setLifetimeEach(-1);
            BEE.destroy();
            bugsGroup.destroyEach();
            
        }
    }
           
   drawSprites();
}

 



    function spawnBugs()
    {
        if (frameCount % 100 === 0) {
            var bug = createSprite(900, (random(50,600)), 10, 40);
            
            bug.velocityX = -10
      
            var rand = Math.round(random(1, 4));
            switch (rand) {
                case 1: bug1.addImage(BeetleIMG);
                    break;
                case 2: bug2.addImage(kBeetleIMG);
                    break;
                case 3: bug3.addImage(ladyBugIMG);
                    break;
                case 4: bugS.addImage(stickBugIMG);
                    break;
                default: break;
            }

            
      
            bug1,bug2,bug3,bugS.scale = 0.5;
            bugsGroup.setLifetimeEach = 100;
            bug1,bug2,bug3.setCollider = ("circle",30,30)
      
            bugsGroup.add(bug1,bug2,bug3,bugS,Crab)
        }
    }

