namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class WorldManager extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(CustomComponentScript);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "CustomComponentScript added to ";

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
          this.node.addEventListener("WallHitByPlayer", this.sendPlayerDamage);
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    canBeDamaged: boolean = true;
    damageCooldown: number = 1;
    sendPlayerDamage = async(_event: Event) => {
      if (this.canBeDamaged == false) return;
      sceneGraph.getChildrenByName("Player")[0].getComponent(PlayerLogic).receiveDamage();
      this.canBeDamaged = false;
      await new Promise((resolve) => setTimeout(resolve, this.damageCooldown * 1000));
      this.canBeDamaged = true;
    }

    public canExternalDataBeUsed: boolean = false;
    allowExternalDataUse() {
      this.canExternalDataBeUsed = true;
      this.node.dispatchEvent(new Event("ExternalDataUsable"));
      // console.log("external data usable now");
    }
  }
}