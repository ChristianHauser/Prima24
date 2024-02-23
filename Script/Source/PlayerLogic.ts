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

    UI: UserInterface;
    
    //private viewport: ƒ.Viewport;
    
    
    public isSpacePressed: boolean = false;
    //private playRotationBody: ƒ.ComponentRigidbody = getComponent.
    private health: number;

    private money: number;
    
    
    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR){
        console.log("notplaying");
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
          this.playerRigidBody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.onPlayerCollision);
          this.money = 0;
          this.accessPlayerHealth();
          // console.log("the player health is " + this.health);
          ƒ.AudioManager.default.listenWith(this.node.getComponent(ƒ.ComponentAudioListener));
          //this.rotationRigid = this.sceneGraph.getChildrenByName("Player")[0].getChildrenByName("PlayerModel")[0].getComponent(ƒ.ComponentRigidbody);
          //this.update;
          break;
      }
    }


    
    accessPlayerHealth = async() => {
      while (!externalData) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      this.health = externalData.playerHealth.value;
      healthUI.healthRemaining = this.health;
      while(!timeUI) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } 
      this.UI = sceneGraph.getChildrenByName("UIElement")[0].getComponent(UserInterface);
      moneyUI.moneyCollected = this.money;
    }

    
    public speed: number = 4;
    public torque: number = 0.2;

    
    
    onPlayerCollision(_event: ƒ.EventPhysics) {
      if (_event.cmpRigidbody.node.name == "Amunition") {
        this.node.getChildrenByName("Cannon")[0].getComponent(SpawnProjectile).increaseAmunition();
      }
      if (_event.cmpRigidbody.node.name == "Coin") {
        if(!this.money) this.money = 0;
        this.money++;
        moneyUI.moneyCollected = this.money;
      }
      }
    
  
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
        if (this.isDead) {return} else
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

    isDead: boolean = false;
    public receiveDamage() {
      if (this.health > 0){
        console.log("current health: " + this.health);
        this.health--;
        healthUI.healthRemaining = this.health;
      } else if (this.isDead == false) {
        this.UI.stopTimer();
        this.isDead = true;
        console.log("game over.");
        this.node.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(180);
        let playerModel = this.node.getChildrenByName("PlayerModel")[0];
        let cannon = this.node.getChildrenByName("Cannon")[0];
        this.node.removeChild(playerModel);
        this.node.removeChild(cannon);
        // this.node.removeComponent(this.node.getComponent(ƒ.ComponentRigidbody));
        sceneGraph.addChild(playerModel);
        playerModel.addComponent(new FlyWithPipe());
        playerModel.getComponent(FlyWithPipe).manualFlyAlong(playerModel.getComponent(ƒ.ComponentTransform));
        return;
      } else {
        console.log("player is dead");
      }

    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}