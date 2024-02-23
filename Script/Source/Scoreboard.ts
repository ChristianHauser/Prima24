namespace Script {
    import ƒ = FudgeCore;
    import ƒui = FudgeUserInterface;

    export class TimeUI extends ƒ.Mutable {
      public secondsSurvived: string;
      constructor() {
        super();
        const timeUiElement: HTMLElement = document.querySelector<HTMLElement>("#seconds-survived-container");
        new ƒui.Controller(this, timeUiElement);
      }

      protected reduceMutator(_mutator: ƒ.Mutator): void {}
    }

    export class HealthUI extends ƒ.Mutable {
      public healthRemaining: number;
      constructor() {
        super();
        const healthUiElement: HTMLElement = document.querySelector<HTMLElement>("#health-remaining-container");
        new ƒui.Controller(this, healthUiElement);
      }

      protected reduceMutator(_mutator: ƒ.Mutator): void {}
    }

    export class AmunitionUI extends ƒ.Mutable {
      public amunitionRemaining: number;
      constructor() {
        super();
        const amunitionUiElement: HTMLElement = document.querySelector<HTMLElement>("#amunition-left-container");
        new ƒui.Controller(this, amunitionUiElement);
      }

      protected reduceMutator(_mutator: ƒ.Mutator): void {}
    }

    export class MoneyUI extends ƒ.Mutable {
      public moneyCollected: number;
      constructor() {
        super();
        const moneyUiElement: HTMLElement = document.querySelector<HTMLElement>("#money-collected-container");
        new ƒui.Controller(this, moneyUiElement);
      }

      protected reduceMutator(_mutator: ƒ.Mutator): void {}
    }
}