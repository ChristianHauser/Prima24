namespace Script {
  import ƒ = FudgeCore;
  
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class UserInterface extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(UserInterface);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "UserInterface added to ";

     private time: number = 0;
     private startTime: number;
    //  private timeUI: TimeUI;

    //  private healthUI: HealthUI;
    //  private amunitionUI: AmunitionUI;

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
          this.startTime = ƒ.Time.game.get();
          this.runGoing = true;
          this.runTimer();
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }
    
    stopTimer() {
      this.runGoing = false;
    }
    
    runTimer = async () => {
      while(this.runGoing) {
        this.updateTimer()
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      // console.log("game over.");
    }

    updateTimer = async() => {
      let timeInMilliseconds: number = ƒ.Time.game.get() - this.startTime;
      this.time = Math.floor(timeInMilliseconds / 1000);
      while (!timeUI) {
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      timeUI.secondsSurvived = this.time.toFixed();
      
    }

    // public updateHealthUI(healthRemaining: number): void {
    //   healthUI.healthRemaining = healthRemaining;
    // }

    // public updateAmunitionUI(amunitionRemaining: number): void {
    //   amunitionUI.amunitionRemaining = amunitionRemaining;
    // }


    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  

  }
}