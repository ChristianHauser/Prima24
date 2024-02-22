namespace Script {
  import ƒ = FudgeCore;
  
  
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let sceneGraph: ƒ.Node;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    sceneGraph = viewport.getBranch();
  
    // setUpCamera();
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a#

    //initialize
    sceneGraph.getChildrenByName("Player")[0].getChildrenByName("Cannon")[0].getComponent(SpawnProjectile).initialize();
  }
  

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