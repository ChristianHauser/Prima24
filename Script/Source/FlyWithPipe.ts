namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class FlyWithPipe extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(FlyWithPipe);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "FlyWithPipe added to ";

    transformComponent: ƒ.ComponentTransform;

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
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.transformComponent = this.node.getComponent(ƒ.ComponentTransform);
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    manualFlyAlong(transformComponent: ƒ.ComponentTransform) {
      this.transformComponent = transformComponent;
      // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    update = (_event: Event): void => {
      if(this.transformComponent == undefined) {
        return;
      }
        this.transformComponent.mtxLocal.translateX(-pipeSpeed);
      // //   console.log("my parent is " + this.node.name);
      // //         } catch (error) {
      // //   console.log(error);
      // // }
      // console.log(this.node.getComponents(ƒ.ComponentTransform));

  
  }
}
}