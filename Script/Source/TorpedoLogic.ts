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
          this.node.getComponent(ƒ.ComponentRigidbody).applyLinearImpulse(new ƒ.Vector3(100,0,0));
          
          break;
      }
    }

    
  }
}