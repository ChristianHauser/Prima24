namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class MoveRigidAlong extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(MoveRigidAlong);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "CustomComponentScript added to ";

    componentTransform: ƒ.ComponentTransform;
    componentRigidbody: ƒ.ComponentRigidbody;
    initialRigidbodyTransform: ƒ.Matrix4x4;


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
          this.node.addEventListener(ƒ.EVENT.RENDER_PREPARE, this.update);
          break;
          case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
          case ƒ.EVENT.NODE_DESERIALIZED:
            this.initComponents();
            
            // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    initComponents = async () => {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        this.componentTransform = this.node.getComponent(ƒ.ComponentTransform);
        this.componentRigidbody = this.node.getComponent(ƒ.ComponentRigidbody);
        this.initialRigidbodyTransform = this.componentRigidbody.mtxPivot;

        // console.log("Rigidbodyy: " + this.componentRigidbody.mtxPivot);
        // console.log("Transform: " + this.componentTransform.mtxLocal);
        // console.log(this.node);
    }

    update = () => {
      let combinedTranslation: ƒ.Vector3 = new ƒ.Vector3()
      combinedTranslation.add(this.initialRigidbodyTransform.translation)
      combinedTranslation.add(this.componentTransform.mtxLocal.translation);

      this.componentRigidbody.mtxPivot.translation = combinedTranslation;

      // console.log(this.componentRigidbody.mtxPivot.translation.x, this.componentRigidbody.mtxPivot.translation.y, this.componentRigidbody.mtxPivot.translation.z);
      
  }
}
}