namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class WallDamaging extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(WallDamaging);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "WallDamaging added to ";

    rigidBody: ƒ.ComponentRigidbody;

    

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

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          // ƒ.Debug.log(this.message, this.node);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.rigidBody = this.node.getComponent(ƒ.ComponentRigidbody);
          this.rigidBody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER,this.onCollisionEnter);
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }
    onCollisionEnter(_event: ƒ.EventPhysics){
      if (_event.cmpRigidbody.node.name == "Player") {
        this.node.dispatchEvent(new Event("WallHitByPlayer", {bubbles : true}));
      }

    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}