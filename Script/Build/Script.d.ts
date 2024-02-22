declare namespace Script {
}
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
    import ƒAid = FudgeAid;
    let viewport: ƒ.Viewport;
    let sceneGraph: ƒ.Node;
    let explosionSprite: ƒAid.NodeSprite;
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PipeLogic extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        pipeConstruct: ƒ.ComponentTransform;
        hndEvent: (_event: Event) => void;
        speed: number;
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
        isSpacePressed: boolean;
        constructor();
        hndEvent: (_event: Event) => void;
        speed: number;
        torque: number;
        private update;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class ScoreUI extends ƒ.Mutable {
        scoreboard: string;
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
        hndEvent: (_event: Event) => void;
        initialize: () => Promise<void>;
        checkForAmunition(): void;
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
        hndEvent: (_event: Event) => void;
        hitEvent(_event: ƒ.EventPhysics): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class UserInterface extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        private score;
        private startTime;
        private scoreUI;
        runGoing: boolean;
        constructor();
        hndEvent: (_event: Event) => void;
        runTimer: () => Promise<void>;
        updateScoreboard(): void;
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
