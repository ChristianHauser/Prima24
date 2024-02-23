namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class ItemAnimation extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(ItemAnimation);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "ItemSlot added to ";

   
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
          // this.node.getComponent(ƒ.ComponentRigidbody).addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.onItemHit);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.animate();
          
          this.node.getComponent(ƒ.ComponentRigidbody).addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.onItemHit);
          break;
      }
    }

    onItemHit(_event: ƒ.EventPhysics) {
      if (_event.cmpRigidbody.node.name == "Player") {
        this.node.getChildren()[0].removeComponent(this.node.getChildren()[0].getComponent(ƒ.ComponentMesh));
        this.node.getParent().removeChild(this.node);
        console.log("playsound");
        
        
      }
    }

    animate = () => {
      if (this.node.getChildren()[0].getComponent(ItemComponentAnimator)) {
        this.node.getChildren()[0].removeComponent(this.node.getChildren()[0].getComponent(ItemComponentAnimator));
      }

      let itemComponentAnimator: ItemComponentAnimator = new ItemComponentAnimator();
        this.node.getChildren()[0].addComponent(itemComponentAnimator);
        itemComponentAnimator.activate(true);
  }

    }
    

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
