namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  
  
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  export let sceneGraph: ƒ.Node;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  export let timeUI: TimeUI;
  export let healthUI: HealthUI;
  export let amunitionUI: AmunitionUI;
  export let moneyUI: MoneyUI;

  
  export let explosionSprite: ƒAid.NodeSprite;

  export let pipeSpeed: number = 1;

  // später config?e
  // export let minimumAmunition: number = 2;
  // export let maximumAmunition: number = 4;
  // export let coinChance: number = .5;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    sceneGraph = viewport.getBranch();

    
    //setUpCamera();
    loadGame();

    // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a#

    //initialize
    sceneGraph.getChildrenByName("Player")[0].getChildrenByName("Cannon")[0].getComponent(SpawnProjectile).initialize();
    // PipeLogic.coinResource = ;
  }

  // typing for externals
  interface gameData<T> {
    info: string;
    value: T;
  }

  interface ExternalData {
    minimumAmunition: gameData<number>;
    maximumAmunition: gameData<number>;
    coinSpawnRate: gameData<number>;
    playerHealth: gameData<number>;
    starterAmunition: gameData<number>;
  }

  export let externalData: ExternalData;

  async function loadGame(): Promise<void> {
    // load external data in
    const response = await fetch("./externalData.json");
    externalData = (await response.json()) as ExternalData;
    sceneGraph.getComponent(WorldManager).allowExternalDataUse();


    // load sprites
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("./Sprite/Axplosion.png");
    
    
    explosionSprite = new ƒAid.NodeSprite("Explosion");
    
    explosionSprite.addComponent(new ƒ.ComponentTransform());
    
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
    let explosionAnim: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Explode", coat);
    explosionAnim.generateByGrid(ƒ.Rectangle.GET(0, 0, 192, 192), 12, 192, ƒ.ORIGIN2D.CENTER, ƒ.Vector2.X(192),ƒ.Vector2.Y(192));
    
    
    explosionSprite.setAnimation(explosionAnim);
    explosionSprite.framerate = 12;
    explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(90);
    let spriteScale = 50;
    explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.scale(new ƒ.Vector3(spriteScale, spriteScale, spriteScale));
    
    //load UI
    timeUI = new TimeUI();
    healthUI = new HealthUI();
    amunitionUI = new AmunitionUI();
    moneyUI = new MoneyUI();

    //spawn pipes

    let pipeSpawner: PipeSpawner = new PipeSpawner();
    await pipeSpawner.spawnPipes(5);
    console.log(sceneGraph.getChildren);
    startGame();
  }

  function startGame() {
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(); 
  }

  // let externalDataSubs: {cmp: ƒ.ComponentScript}[] = [];
  // export function subscribeToExternalData(self: ƒ.ComponentScript) {
  //   externalDataSubs.push({cmp: self});
  // }

  // function createEventListeners() {
  //   for (let i = 0; i < externalDataSubs.length; i++) {
  //     sceneGraph.getComponent(WorldManager).addEventListener("ExternalDataUsable", () => externalDataSubs[i].cmp.dispatchEvent(new Event("ExternalDataUsableHere")));
  //   }
  // }
  

  function setUpCamera() {
    let cameraReference: ƒ.Node = sceneGraph.getChildrenByName("Player")[0].getChildrenByName("CameraReference")[0];
    //.getChildrenByName("RotationRigidbody")[0]
    cameraReference.getComponent(ƒ.ComponentTransform).mtxLocal;
    
    viewport.camera.mtxPivot = cameraReference.mtxWorld;
    // let localPlayerMtx: ƒ.Matrix4x4 = sceneGraph.getChildrenByName("Player")[0].getComponent(ƒ.ComponentTransform).mtxLocal;
    // let localCamReferenceMtx: ƒ.Matrix4x4 = cameraReference.getComponent(ƒ.ComponentTransform).mtxLocal;
    

    // viewport.camera.mtxPivot = 
    viewport.camera.projectCentral(undefined, 90);
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used
    setUpCamera();
    viewport.draw();
    ƒ.AudioManager.default.update();
}
}