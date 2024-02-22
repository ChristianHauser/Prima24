namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization
  
  //let pipeConstruct: ƒ.Node = sceneGraph.getChildrenByName("Pipe")[0];
  export class SpawnProjectile extends ƒ.ComponentScript {
    
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(SpawnProjectile);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "SpawnProjectile added to ";
    public amunition: number = 2;

    private torpedoResource: ƒ.Graph;
    

    // let meshGraph: ƒ.Graph = <ƒ.Graph>ƒ.Project.getResourcesByName("Mesh")[0];
    // let graphInstance: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(
    //   meshGraph
    // );
    //public pipeBody: ƒ.
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
          this.pipeConstruct = this.node.getComponent(ƒ.ComponentTransform);
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    initialize = async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      this.torpedoResource = <ƒ.Graph>ƒ.Project.getResourcesByName("Torpedo")[0];
    }

    checkForAmunition(){
      if(this.amunition > 0){
        this.spawnProjectile();
      }
    }

    spawnProjectile = async () => {
      let graphInstance : ƒ.GraphInstance = await ƒ.Project.createGraphInstance(
        this.torpedoResource);
      this.node.addChild(graphInstance);
      this.amunition--;
    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}