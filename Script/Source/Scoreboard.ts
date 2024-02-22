namespace Script {
    import ƒ = FudgeCore;
    import ƒui = FudgeUserInterface;

    export class ScoreUI extends ƒ.Mutable {
      public scoreboard: string;
      constructor() {
        super();
        const scoreUiElement: HTMLElement = document.querySelector<HTMLElement>("#scoreDiv");
        new ƒui.Controller(this, scoreUiElement);
      }

      protected reduceMutator(_mutator: ƒ.Mutator): void {}
    }
}