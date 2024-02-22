namespace Script {
  import ƒ = FudgeCore;
  
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class PlayerLogic extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(PlayerLogic);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "PlayerLogic added to ";
    public playerModel: ƒ.ComponentTransform;
    public playerRigidBody: ƒ.ComponentRigidbody;
    public projectile: ƒ.ComponentRigidbody;


    
    //private viewport: ƒ.Viewport;
    private sceneGraph: ƒ.Node;
    private rotationRigid: ƒ.ComponentRigidbody;
    
    public isSpacePressed: boolean = false;
    //private playRotationBody: ƒ.ComponentRigidbody = getComponent.
    
    
    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR){
        //console.log("notplaying");
        return;
      }
      
      
      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          
          this.node.addEventListener(ƒ.EVENT.RENDER_PREPARE, this.update);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          this.playerRigidBody = this.node.getComponent(ƒ.ComponentRigidbody);
          
          //this.rotationRigid = this.sceneGraph.getChildrenByName("Player")[0].getChildrenByName("PlayerModel")[0].getComponent(ƒ.ComponentRigidbody);
          //this.update;
          break;
      }
    }

    
    public speed: number = 4;
    public torque: number = 0.2;
    private torqueAngle: ƒ.Vector3;
    private torqueMax: ƒ.Vector3 = new ƒ.Vector3(0,0,2);
    
  
    private update = (_event: Event): void => {
      
      
      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])){
        this.playerRigidBody.applyForce(
          new ƒ.Vector3(0,0,-this.speed)
        );
        
      }
      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])){
        this.playerRigidBody.applyForce(
          new ƒ.Vector3(0,0,this.speed)
        );
      }

      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])){
        this.playerRigidBody.applyForce(
          new ƒ.Vector3(0,this.speed,0)
        );
       // if(this.torqueAngle < this.torqueMax)
      //  this.rotationRigid.applyTorque(
       //  new ƒ.Vector3(0,0,this.torque)
       // );
      }
      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])){
        this.playerRigidBody.applyForce(
          new ƒ.Vector3(0,-this.speed,0)
        )  
      }

      
      
      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])){
        if(this.isSpacePressed == false){
          this.isSpacePressed = true;
          this.node.getChildrenByName("Cannon")[0].getComponent(SpawnProjectile).checkForAmunition();
        }
      } else {
        this.isSpacePressed = false;
        }

      //this.torqueAngle = this.playerRigidBody.getRotation();
     
      const rigidbodyPosition: ƒ.Vector3 = this.playerRigidBody.getPosition();
      rigidbodyPosition.x = 3;
      this.playerRigidBody.setRotation(ƒ.Vector3.ZERO());
      this.playerRigidBody.setPosition(rigidbodyPosition);
    };

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}