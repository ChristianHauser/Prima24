"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class Ending extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Ending);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        rigidBody;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.rigidBody = this.node.getComponent(ƒ.ComponentRigidbody);
                    this.rigidBody.addEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, this.onCollisionEnter);
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        onCollisionEnter(_event) {
            if (_event.cmpRigidbody.node.name == "Torpedo") {
                //remove obstacle node so it can no longer damage the player
                this.node.getParent().removeChild(this.node);
            }
            else if (_event.cmpRigidbody.node.name == "Player") {
                console.log("PlayerHit");
            }
        }
    }
    Script.Ending = Ending;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let sceneGraph;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        sceneGraph = viewport.getBranch();
        // setUpCamera();
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a#
        //initialize
        sceneGraph.getChildrenByName("Player")[0].getChildrenByName("Cannon")[0].getComponent(Script.SpawnProjectile).initialize();
    }
    function setUpCamera() {
        let cameraReference = sceneGraph.getChildrenByName("Player")[0].getChildrenByName("CameraReference")[0];
        //.getChildrenByName("RotationRigidbody")[0]
        cameraReference.getComponent(ƒ.ComponentTransform).mtxLocal;
        viewport.camera.mtxPivot = cameraReference.mtxWorld;
        // let localPlayerMtx: ƒ.Matrix4x4 = sceneGraph.getChildrenByName("Player")[0].getComponent(ƒ.ComponentTransform).mtxLocal;
        // let localCamReferenceMtx: ƒ.Matrix4x4 = cameraReference.getComponent(ƒ.ComponentTransform).mtxLocal;
        // viewport.camera.mtxPivot = 
        viewport.camera.projectCentral(undefined, 90);
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        setUpCamera();
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    //let pipeConstruct: ƒ.Node = sceneGraph.getChildrenByName("Pipe")[0];
    class PipeLogic extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(PipeLogic);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "PipeLogic added to ";
        //public pipeBody: ƒ.
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        pipeConstruct;
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.pipeConstruct = this.node.getComponent(ƒ.ComponentTransform);
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        speed = 1;
        update = (_event) => {
            // console.log("moving!")
            this.pipeConstruct.mtxLocal.translateX(-this.speed);
        };
    }
    Script.PipeLogic = PipeLogic;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class PlayerLogic extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(PlayerLogic);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "PlayerLogic added to ";
        playerModel;
        playerRigidBody;
        projectile;
        //private viewport: ƒ.Viewport;
        sceneGraph;
        rotationRigid;
        isSpacePressed = false;
        //private playRotationBody: ƒ.ComponentRigidbody = getComponent.
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR) {
                //console.log("notplaying");
                return;
            }
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    this.node.addEventListener("renderPrepare" /* ƒ.EVENT.RENDER_PREPARE */, this.update);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    this.playerRigidBody = this.node.getComponent(ƒ.ComponentRigidbody);
                    //this.rotationRigid = this.sceneGraph.getChildrenByName("Player")[0].getChildrenByName("PlayerModel")[0].getComponent(ƒ.ComponentRigidbody);
                    //this.update;
                    break;
            }
        };
        speed = 4;
        torque = 0.2;
        torqueAngle;
        torqueMax = new ƒ.Vector3(0, 0, 2);
        update = (_event) => {
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                this.playerRigidBody.applyForce(new ƒ.Vector3(0, 0, -this.speed));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                this.playerRigidBody.applyForce(new ƒ.Vector3(0, 0, this.speed));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
                this.playerRigidBody.applyForce(new ƒ.Vector3(0, this.speed, 0));
                // if(this.torqueAngle < this.torqueMax)
                //  this.rotationRigid.applyTorque(
                //  new ƒ.Vector3(0,0,this.torque)
                // );
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
                this.playerRigidBody.applyForce(new ƒ.Vector3(0, -this.speed, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                if (this.isSpacePressed == false) {
                    this.isSpacePressed = true;
                    this.node.getChildrenByName("Cannon")[0].getComponent(Script.SpawnProjectile).checkForAmunition();
                }
            }
            else {
                this.isSpacePressed = false;
            }
            //this.torqueAngle = this.playerRigidBody.getRotation();
            const rigidbodyPosition = this.playerRigidBody.getPosition();
            rigidbodyPosition.x = 3;
            this.playerRigidBody.setRotation(ƒ.Vector3.ZERO());
            this.playerRigidBody.setPosition(rigidbodyPosition);
        };
    }
    Script.PlayerLogic = PlayerLogic;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒui = FudgeUserInterface;
    class ScoreUI extends ƒ.Mutable {
        scoreboard;
        constructor() {
            super();
            const scoreUiElement = document.querySelector("#scoreDiv");
            new ƒui.Controller(this, scoreUiElement);
        }
        reduceMutator(_mutator) { }
    }
    Script.ScoreUI = ScoreUI;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    //let pipeConstruct: ƒ.Node = sceneGraph.getChildrenByName("Pipe")[0];
    class SpawnProjectile extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(SpawnProjectile);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "SpawnProjectile added to ";
        amunition = 2;
        torpedoResource;
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
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        pipeConstruct;
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    // this.initialize();
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.pipeConstruct = this.node.getComponent(ƒ.ComponentTransform);
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        initialize = async () => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            this.torpedoResource = ƒ.Project.getResourcesByName("Torpedo")[0];
        };
        checkForAmunition() {
            if (this.amunition > 0) {
                this.spawnProjectile();
            }
        }
        spawnProjectile = async () => {
            let graphInstance = await ƒ.Project.createGraphInstance(this.torpedoResource);
            this.node.addChild(graphInstance);
            this.amunition--;
        };
    }
    Script.SpawnProjectile = SpawnProjectile;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    //yeet itself forward
    //has rigidbody collision
    //if colliding, delete self after a couple milliseconds
    //let pipeConstruct: ƒ.Node = sceneGraph.getChildrenByName("Pipe")[0];
    class TorpedoLogic extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(TorpedoLogic);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "TorpedoLogic added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        pipeConstruct;
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    // this.initialize();
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.node.getComponent(ƒ.ComponentRigidbody).applyLinearImpulse(new ƒ.Vector3(100, 0, 0));
                    break;
            }
        };
    }
    Script.TorpedoLogic = TorpedoLogic;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class UserInterface extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(UserInterface);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "UserInterface added to ";
        score = 0;
        startTime;
        scoreUI;
        runGoing;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.scoreUI = new Script.ScoreUI();
                    this.startTime = ƒ.Time.game.get();
                    this.runGoing = true;
                    this.runTimer();
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        runTimer = async () => {
            while (this.runGoing) {
                this.updateScoreboard();
                await new Promise((resolve) => setTimeout(resolve, 40));
            }
            console.log("game over.");
        };
        updateScoreboard() {
            let timeInMilliseconds = ƒ.Time.game.get() - this.startTime;
            this.score = Math.floor(timeInMilliseconds / 1000);
            this.scoreUI.scoreboard = this.score.toFixed();
        }
    }
    Script.UserInterface = UserInterface;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class WallDamaging extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(WallDamaging);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "WallDamaging added to ";
        rigidBody;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.rigidBody = this.node.getComponent(ƒ.ComponentRigidbody);
                    this.rigidBody.addEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, this.onCollisionEnter);
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        onCollisionEnter(_event) {
        }
    }
    Script.WallDamaging = WallDamaging;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class MoveRigidAlong extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(MoveRigidAlong);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        componentTransform;
        componentRigidbody;
        initialRigidbodyTransform;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    this.node.addEventListener("renderPrepare" /* ƒ.EVENT.RENDER_PREPARE */, this.update);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.initComponents();
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        initComponents = async () => {
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            this.componentTransform = this.node.getComponent(ƒ.ComponentTransform);
            this.componentRigidbody = this.node.getComponent(ƒ.ComponentRigidbody);
            this.initialRigidbodyTransform = this.componentRigidbody.mtxPivot;
            // console.log("Rigidbodyy: " + this.componentRigidbody.mtxPivot);
            // console.log("Transform: " + this.componentTransform.mtxLocal);
            // console.log(this.node);
        };
        update = () => {
            let combinedTranslation = new ƒ.Vector3();
            combinedTranslation.add(this.initialRigidbodyTransform.translation);
            combinedTranslation.add(this.componentTransform.mtxLocal.translation);
            this.componentRigidbody.mtxPivot.translation = combinedTranslation;
            // console.log(this.componentRigidbody.mtxPivot.translation.x, this.componentRigidbody.mtxPivot.translation.y, this.componentRigidbody.mtxPivot.translation.z);
        };
    }
    Script.MoveRigidAlong = MoveRigidAlong;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map