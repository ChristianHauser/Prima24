namespace Script {
  import ƒ = FudgeCore;
  
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization
  
  

    //yeet itself forward
    //has rigidbody collision
    //if colliding, delete self after a couple milliseconds

    
  //let pipeConstruct: ƒ.Node = sceneGraph.getChildrenByName("Pipe")[0];
  export class TorpedoLogic extends ƒ.ComponentScript {
    
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(TorpedoLogic);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "TorpedoLogic added to ";
    //private audioListener = this.node.getComponent(ƒ.ComponentAudioListener);
    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }
    public pipeConstruct: ƒ.ComponentTransform;
    public sound: ƒ.ComponentAudio;
    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          // ƒ.Debug.log(this.message, this.node);
          
          // this.initialize();
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          let rigidbody: ƒ.ComponentRigidbody = this.node.getComponent(ƒ.ComponentRigidbody);
          rigidbody.applyLinearImpulse(new ƒ.Vector3(100,0,0));
          rigidbody.applyTorque(new ƒ.Vector3(50,0,0)); //TEST THIS
          rigidbody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.hitEvent);
          this.sound = this.node.getComponent(ƒ.ComponentAudio);
          // f.AudioManager.default.listenWith(audioListener);
          // this.(audioComponent).play(true);
          break;
      }
    }

    hitEvent = async (_event: ƒ.EventPhysics) => {
    
      // explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.scale(new ƒ.Vector3(1,1,1));
      //explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(90);
      // console.log(explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotation);
      // let node: ƒ.Node = new ƒ.Node("SpriteParent");
      // node.addComponent(new ƒ.ComponentTransform());
      // node.addComponent(new FlyWithPipe());
      if (_event.cmpRigidbody.node.name != "PipeCollision" && _event.cmpRigidbody.node.name != "Coin" &&_event.cmpRigidbody.node.name != "Amunition" ) {
        explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.translation = this.node.mtxWorld.translation;
        // explosionSprite.getComponent(FlyWithPipe).manualFlyAlong;
        let node: ƒ.Node = new ƒ.Node("Sprite");
        node.addChild(explosionSprite);
        node.addComponent(new ƒ.ComponentTransform());
        sceneGraph.addChild(node);
        explosionSprite.addComponent(new FlyWithPipe());
        explosionSprite.getComponent(FlyWithPipe).manualFlyAlong(node.getComponent(ƒ.ComponentTransform));
        //PlaySound
        this.sound.play(true);
        // explosionSprite.mtxWorld.translation = this.node.mtxWorld.translation;
  
        // console.log("AHHHHHHHHHHHHH" + sceneGraph.getChildrenByName("MoveEverything")[0].getChildren()[1]);
  
        await new Promise((resolve) => setTimeout(resolve, 200));
        this.node.removeComponent(this.node.getComponent(ƒ.ComponentRigidbody));
        // console.log("Parentsname: " + this.node.getParent().name);
        this.node.getParent().removeChild(this.node);
        await new Promise((resolve) => setTimeout(resolve, 400));
        sceneGraph.removeChild(node);
      }
    }
  }
}