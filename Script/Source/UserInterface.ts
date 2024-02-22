namespace Script {
  import ƒ = FudgeCore;
  
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class UserInterface extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(UserInterface);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "UserInterface added to ";

     private score: number = 0;
     private startTime: number;
     private scoreUI: ScoreUI;

     runGoing: boolean;

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
          ƒ.Debug.log(this.message, this.node);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.scoreUI = new ScoreUI();
          this.startTime = ƒ.Time.game.get();
          this.runGoing = true;
          this.runTimer();
    
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    runTimer = async () => {
      while(this.runGoing) {
        this.updateScoreboard()
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      console.log("game over.");
    }

    updateScoreboard(): void {
      let timeInMilliseconds: number = ƒ.Time.game.get() - this.startTime;
      this.score = Math.floor(timeInMilliseconds / 1000);
      this.scoreUI.scoreboard = this.score.toFixed();
    } 

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  

  }
}