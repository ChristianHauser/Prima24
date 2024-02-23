namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization
  
  //let pipeConstruct: ƒ.Node = sceneGraph.getChildrenByName("Pipe")[0];
  export class PipeLogic extends ƒ.ComponentScript {
    
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(PipeLogic);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "PipeLogic added to ";
    
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

    isAddedAsChild: boolean = false;
    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          this.isAddedAsChild = true;
          // ƒ.Debug.log(this.message, this.node);
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);

          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.pipeConstruct = this.node.getComponent(ƒ.ComponentTransform);
          this.waitAbitthenSpawn();
          // this.waitForWorldManager();
          // subscribeToExternalData(this);
          // this.addEventListener("ExternalDataUsableHere", () => {sceneGraph.getComponent(WorldManager).addEventListener("ExternalDataUsable", this.spawnItems);})

          // console.log("amount of pipelogic" + this.node.name + this.node.getParent().name);
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    // waitForWorldManager = async() => {
    //   while(!sceneGraph.getComponent(WorldManager)) {
    //     await new Promise((resolve) => setTimeout(resolve, 500));
    //   }
    //   sceneGraph.getComponent(WorldManager).addEventListener("ExternalDataUsable", this.spawnItems);
    //   console.log("the world manager is here");
    // }

    waitAbitthenSpawn = async() => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (this.isAddedAsChild) this.spawnItems();
    }

    // 3 level deep
    getAllItemSlots(): ƒ.Node[] {
      let itemNodes: ƒ.Node[] = [];
      // let itemsSecond: ƒ.Node[];
      // let itemsThird: ƒ.Node[];

      // this.node.getChildren().filter((_node) => _node.name.localeCompare("ItemSlot") == 0);
      for (const child of this.node.getChildren()) {
        // itemsSecond = child.getChildren().filter((_node) => _node.name.localeCompare("ItemSlot") == 0);
        if (child.name.localeCompare("ItemSlot") == 0) itemNodes.push(child);
        for (const grandchild of child.getChildren()) {
          // grandchild.getChildren().filter((_node) => {
          //   if (_node.name.localeCompare("ItemSlot") == 0) itemsFirst.push(_node);
          // }
          if (grandchild.name.localeCompare("ItemSlot") == 0) itemNodes.push(grandchild);
          for (const grandgrandchild of grandchild.getChildren()) {
              if (grandgrandchild.name.localeCompare("ItemSlot") == 0) itemNodes.push(grandgrandchild);
              // console.log("we found an item slot!" + grandgrandchild.name);
          }

          // itemsFirst.concat(itemsSecond, itemsThird);
          // console.log("name of grandgrandchild is: " + itemNodes[0].name + "other: " + itemNodes[1]);
          }
        }
        return itemNodes;
      }


    spawnItems = async() => {
      while (!externalData) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      let slotsToFill: ƒ.Node[] = this.getAllItemSlots();

      // how much amunition spawns this pipe
      let amunitionAmount = this.getRandomInteger(externalData.minimumAmunition.value, externalData.maximumAmunition.value);

      //spawn the amunition on random slots
      for (let i = 0; i < amunitionAmount; i++) {
        let randomIndex: number = this.getRandomInteger(0, slotsToFill.length - 1);
        this.selectItem(slotsToFill[randomIndex], "Amunition");
        slotsToFill.splice(randomIndex, 1);
      }

      //fills remaining slots with the coin chance
      for (const slot of slotsToFill) {
        // console.log(externalData.coinSpawnRate.value);
        if (Math.random() < externalData.coinSpawnRate.value) {
          this.selectItem(slot, "Coin");
        } else {
          this.selectItem(slot, "");
        }
      }
    }

    getRandomInteger(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    selectItem(itemSlot: ƒ.Node, itemType: string) {
      if(this.node.getParent != undefined) {
        if (itemType.localeCompare("Amunition") == 0) {
          itemSlot.removeChild(itemSlot.getChild(1));
        } else if (itemType.localeCompare("Coin") == 0) {
          itemSlot.removeChild(itemSlot.getChild(0));
        } else {
          itemSlot.removeChild(itemSlot.getChild(1));
          itemSlot.removeChild(itemSlot.getChild(0));
        }

      }
    }

    // public speed: number = 1;
    private update = (_event: Event): void => {
      // console.log("moving!")
      this.pipeConstruct.mtxLocal.translateX(-pipeSpeed);
      // console.log("CURRENTLOCATION"+this.node.mtxWorld.translation.x + " "  + this.node.mtxWorld.translation.y + " " + this.node.mtxWorld.translation.z);
    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}