declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Ending extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        rigidBody: ƒ.ComponentRigidbody;
        constructor();
        hndEvent: (_event: Event) => void;
        onCollisionEnter(_event: ƒ.EventPhysics): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class FlyWithPipe extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        transformComponent: ƒ.ComponentTransform;
        constructor();
        hndEvent: (_event: Event) => void;
        manualFlyAlong(transformComponent: ƒ.ComponentTransform): void;
        update: (_event: Event) => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    export let viewport: ƒ.Viewport;
    export let sceneGraph: ƒ.Node;
    export let timeUI: TimeUI;
    export let healthUI: HealthUI;
    export let amunitionUI: AmunitionUI;
    export let moneyUI: MoneyUI;
    export let explosionSprite: ƒAid.NodeSprite;
    export let pipeSpeed: number;
    interface gameData<T> {
        info: string;
        value: T;
    }
    interface ExternalData {
        minimumAmunition: gameData<number>;
        maximumAmunition: gameData<number>;
        coinSpawnRate: gameData<number>;
        playerHealth: gameData<number>;
        starterAmunition: gameData<number>;
    }
    export let externalData: ExternalData;
    export {};
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PipeLogic extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        pipeConstruct: ƒ.ComponentTransform;
        isAddedAsChild: boolean;
        hndEvent: (_event: Event) => void;
        waitAbitthenSpawn: () => Promise<void>;
        getAllItemSlots(): ƒ.Node[];
        spawnItems: () => Promise<void>;
        getRandomInteger(min: number, max: number): number;
        selectItem(itemSlot: ƒ.Node, itemType: string): void;
        private update;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PlayerLogic extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        playerModel: ƒ.ComponentTransform;
        playerRigidBody: ƒ.ComponentRigidbody;
        projectile: ƒ.ComponentRigidbody;
        UI: UserInterface;
        isSpacePressed: boolean;
        private health;
        private money;
        constructor();
        hndEvent: (_event: Event) => void;
        accessPlayerHealth: () => Promise<void>;
        speed: number;
        torque: number;
        onPlayerCollision(_event: ƒ.EventPhysics): void;
        private update;
        isDead: boolean;
        receiveDamage(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class TimeUI extends ƒ.Mutable {
        secondsSurvived: string;
        constructor();
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
    class HealthUI extends ƒ.Mutable {
        healthRemaining: number;
        constructor();
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
    class AmunitionUI extends ƒ.Mutable {
        amunitionRemaining: number;
        constructor();
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
    class MoneyUI extends ƒ.Mutable {
        moneyCollected: number;
        constructor();
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class SpawnProjectile extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        amunition: number;
        private torpedoResource;
        constructor();
        pipeConstruct: ƒ.ComponentTransform;
        sound: ƒ.ComponentAudio;
        hndEvent: (_event: Event) => void;
        accessAmunition: () => Promise<void>;
        initialize: () => Promise<void>;
        checkForAmunition(): void;
        increaseAmunition(): void;
        spawnProjectile: () => Promise<void>;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class TorpedoLogic extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        pipeConstruct: ƒ.ComponentTransform;
        sound: ƒ.ComponentAudio;
        hndEvent: (_event: Event) => void;
        hitEvent: (_event: ƒ.EventPhysics) => Promise<void>;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class UserInterface extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        private time;
        private startTime;
        runGoing: boolean;
        constructor();
        hndEvent: (_event: Event) => void;
        runTimer: () => Promise<void>;
        updateTimer: () => Promise<void>;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class WallDamaging extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        rigidBody: ƒ.ComponentRigidbody;
        constructor();
        hndEvent: (_event: Event) => void;
        onCollisionEnter(_event: ƒ.EventPhysics): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class WorldManager extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
        canBeDamaged: boolean;
        damageCooldown: number;
        sendPlayerDamage: (_event: Event) => Promise<void>;
        canExternalDataBeUsed: boolean;
        allowExternalDataUse(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class MoveRigidAlong extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        componentTransform: ƒ.ComponentTransform;
        componentRigidbody: ƒ.ComponentRigidbody;
        initialRigidbodyTransform: ƒ.Matrix4x4;
        constructor();
        hndEvent: (_event: Event) => void;
        initComponents: () => Promise<void>;
        update: () => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class ItemAnimation extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
        onItemHit(_event: ƒ.EventPhysics): void;
        animate: () => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class ItemComponentAnimator extends ƒ.ComponentAnimator {
        hoverHeight: number;
        animseq: ƒ.AnimationSequence;
        itemAnimation: ƒ.Animation;
        constructor();
        setUpItemAnimation(): void;
    }
}
