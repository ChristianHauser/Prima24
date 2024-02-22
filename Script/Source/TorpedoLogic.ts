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
    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Debug.log(this.message, this.node);
          
          // this.initialize();
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          let rigidbody: ƒ.ComponentRigidbody = this.node.getComponent(ƒ.ComponentRigidbody);
          rigidbody.applyLinearImpulse(new ƒ.Vector3(100,0,0));
          rigidbody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.hitEvent);
          break;
      }
    }

    hitEvent(_event: ƒ.EventPhysics) {

      
      explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.scale(new ƒ.Vector3(1,1,1));
      //explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(90);
      console.log(explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotation);
      
      sceneGraph.getChildrenByName("MoveEverything")[0].addChild(explosionSprite);
      explosionSprite.mtxWorld.translation = this.node.mtxWorld.translation;
      // console.log("AHHHHHHHHHHHHH" + sceneGraph.getChildrenByName("MoveEverything")[0].getChildren()[1]);


      this.node.getParent().removeChild(this.node);
    }

    

    //playExplosionAnimation() 

    // public async hndLoad(_event: Event): Promise<void> {
    // let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    // await imgSpriteSheet.load("./Sprite/Explosion.png");
        
    // this.explosion = new AnimationHandler();
    // this.explosion.initializeAnimations(imgSpriteSheet);

   

    // let cmpAudio: ƒ.ComponentAudio = this.graph.getComponent(ƒ.ComponentAudio);
    // cmpAudio.volume = 0.1;
    // console.log(cmpAudio);

    // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();
  // }
    //}
  }
}