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
        message = "Ending added to ";
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
                    // ƒ.Debug.log(this.message, this.node);
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
            // console.log(_event.cmpRigidbody.node.name);
            if (_event.cmpRigidbody.node.name == "Torpedo") {
                // console.log("HITBYBULLET");
                //remove obstacle node so it can no longer damage the player
                this.node.getParent().removeChild(this.node);
            }
        }
    }
    Script.Ending = Ending;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class FlyWithPipe extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(FlyWithPipe);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "FlyWithPipe added to ";
        transformComponent;
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
                    // ƒ.Debug.log(this.message, this.node);
                    ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.transformComponent = this.node.getComponent(ƒ.ComponentTransform);
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        manualFlyAlong(transformComponent) {
            this.transformComponent = transformComponent;
            // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
        }
        update = (_event) => {
            if (this.transformComponent == undefined) {
                return;
            }
            this.transformComponent.mtxLocal.translateX(-Script.pipeSpeed);
            // //   console.log("my parent is " + this.node.name);
            // //         } catch (error) {
            // //   console.log(error);
            // // }
            // console.log(this.node.getComponents(ƒ.ComponentTransform));
        };
    }
    Script.FlyWithPipe = FlyWithPipe;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    document.addEventListener("interactiveViewportStarted", start);
    Script.pipeSpeed = 1;
    // später config?e
    // export let minimumAmunition: number = 2;
    // export let maximumAmunition: number = 4;
    // export let coinChance: number = .5;
    function start(_event) {
        Script.viewport = _event.detail;
        Script.sceneGraph = Script.viewport.getBranch();
        //setUpCamera();
        loadGame();
        // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        // ƒ.Loop.start();  // start the game loop to continuously draw the viewport, update the audiosystem and drive the physics i/a#
        //initialize
        Script.sceneGraph.getChildrenByName("Player")[0].getChildrenByName("Cannon")[0].getComponent(Script.SpawnProjectile).initialize();
        // PipeLogic.coinResource = ;
    }
    async function loadGame() {
        // load external data in
        const response = await fetch("./externalData.json");
        Script.externalData = (await response.json());
        Script.sceneGraph.getComponent(Script.WorldManager).allowExternalDataUse();
        // load sprites
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load("./Sprite/Axplosion.png");
        Script.explosionSprite = new ƒAid.NodeSprite("Explosion");
        Script.explosionSprite.addComponent(new ƒ.ComponentTransform());
        let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
        let explosionAnim = new ƒAid.SpriteSheetAnimation("Explode", coat);
        explosionAnim.generateByGrid(ƒ.Rectangle.GET(0, 0, 192, 192), 12, 192, ƒ.ORIGIN2D.CENTER, ƒ.Vector2.X(192), ƒ.Vector2.Y(192));
        Script.explosionSprite.setAnimation(explosionAnim);
        Script.explosionSprite.framerate = 12;
        Script.explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(90);
        let spriteScale = 50;
        Script.explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.scale(new ƒ.Vector3(spriteScale, spriteScale, spriteScale));
        //load UI
        Script.timeUI = new Script.TimeUI();
        Script.healthUI = new Script.HealthUI();
        Script.amunitionUI = new Script.AmunitionUI();
        Script.moneyUI = new Script.MoneyUI();
        //spawn pipes
        let pipeSpawner = new Script.PipeSpawner();
        await pipeSpawner.spawnPipes(5);
        console.log(Script.sceneGraph.getChildren);
        startGame();
    }
    function startGame() {
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    // let externalDataSubs: {cmp: ƒ.ComponentScript}[] = [];
    // export function subscribeToExternalData(self: ƒ.ComponentScript) {
    //   externalDataSubs.push({cmp: self});
    // }
    // function createEventListeners() {
    //   for (let i = 0; i < externalDataSubs.length; i++) {
    //     sceneGraph.getComponent(WorldManager).addEventListener("ExternalDataUsable", () => externalDataSubs[i].cmp.dispatchEvent(new Event("ExternalDataUsableHere")));
    //   }
    // }
    function setUpCamera() {
        let cameraReference = Script.sceneGraph.getChildrenByName("Player")[0].getChildrenByName("CameraReference")[0];
        //.getChildrenByName("RotationRigidbody")[0]
        cameraReference.getComponent(ƒ.ComponentTransform).mtxLocal;
        Script.viewport.camera.mtxPivot = cameraReference.mtxWorld;
        // let localPlayerMtx: ƒ.Matrix4x4 = sceneGraph.getChildrenByName("Player")[0].getComponent(ƒ.ComponentTransform).mtxLocal;
        // let localCamReferenceMtx: ƒ.Matrix4x4 = cameraReference.getComponent(ƒ.ComponentTransform).mtxLocal;
        // viewport.camera.mtxPivot = 
        Script.viewport.camera.projectCentral(undefined, 90);
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        setUpCamera();
        Script.viewport.draw();
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
        isAddedAsChild = false;
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    this.isAddedAsChild = true;
                    // ƒ.Debug.log(this.message, this.node);
                    ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.pipeConstruct = this.node.getComponent(ƒ.ComponentTransform);
                    this.waitAbitthenSpawn();
                    // this.waitForWorldManager();
                    // subscribeToExternalData(this);
                    // this.addEventListener("ExternalDataUsableHere", () => {sceneGraph.getComponent(WorldManager).addEventListener("ExternalDataUsable", this.spawnItems);})
                    // console.log("amount of pipelogic" + this.node.name + this.node.getParent().name);
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        // waitForWorldManager = async() => {
        //   while(!sceneGraph.getComponent(WorldManager)) {
        //     await new Promise((resolve) => setTimeout(resolve, 500));
        //   }
        //   sceneGraph.getComponent(WorldManager).addEventListener("ExternalDataUsable", this.spawnItems);
        //   console.log("the world manager is here");
        // }
        waitAbitthenSpawn = async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            if (this.isAddedAsChild)
                this.spawnItems();
        };
        // 3 level deep
        getAllItemSlots() {
            let itemNodes = [];
            // let itemsSecond: ƒ.Node[];
            // let itemsThird: ƒ.Node[];
            // this.node.getChildren().filter((_node) => _node.name.localeCompare("ItemSlot") == 0);
            for (const child of this.node.getChildren()) {
                // itemsSecond = child.getChildren().filter((_node) => _node.name.localeCompare("ItemSlot") == 0);
                if (child.name.localeCompare("ItemSlot") == 0)
                    itemNodes.push(child);
                for (const grandchild of child.getChildren()) {
                    // grandchild.getChildren().filter((_node) => {
                    //   if (_node.name.localeCompare("ItemSlot") == 0) itemsFirst.push(_node);
                    // }
                    if (grandchild.name.localeCompare("ItemSlot") == 0)
                        itemNodes.push(grandchild);
                    for (const grandgrandchild of grandchild.getChildren()) {
                        if (grandgrandchild.name.localeCompare("ItemSlot") == 0)
                            itemNodes.push(grandgrandchild);
                        // console.log("we found an item slot!" + grandgrandchild.name);
                    }
                    // itemsFirst.concat(itemsSecond, itemsThird);
                    // console.log("name of grandgrandchild is: " + itemNodes[0].name + "other: " + itemNodes[1]);
                }
            }
            return itemNodes;
        }
        spawnItems = async () => {
            while (!Script.externalData) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            let slotsToFill = this.getAllItemSlots();
            // how much amunition spawns this pipe
            let amunitionAmount = this.getRandomInteger(Script.externalData.minimumAmunition.value, Script.externalData.maximumAmunition.value);
            //spawn the amunition on random slots
            for (let i = 0; i < amunitionAmount; i++) {
                let randomIndex = this.getRandomInteger(0, slotsToFill.length - 1);
                this.selectItem(slotsToFill[randomIndex], "Amunition");
                slotsToFill.splice(randomIndex, 1);
            }
            //fills remaining slots with the coin chance
            for (const slot of slotsToFill) {
                // console.log(externalData.coinSpawnRate.value);
                if (Math.random() < Script.externalData.coinSpawnRate.value) {
                    this.selectItem(slot, "Coin");
                }
                else {
                    this.selectItem(slot, "");
                }
            }
        };
        getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        selectItem(itemSlot, itemType) {
            if (this.node.getParent != undefined) {
                if (itemType.localeCompare("Amunition") == 0) {
                    itemSlot.removeChild(itemSlot.getChild(1));
                }
                else if (itemType.localeCompare("Coin") == 0) {
                    itemSlot.removeChild(itemSlot.getChild(0));
                }
                else {
                    itemSlot.removeChild(itemSlot.getChild(1));
                    itemSlot.removeChild(itemSlot.getChild(0));
                }
            }
        }
        // public speed: number = 1;
        update = (_event) => {
            // console.log("moving!")
            this.pipeConstruct.mtxLocal.translateX(-Script.pipeSpeed);
            // console.log("CURRENTLOCATION"+this.node.mtxWorld.translation.x + " "  + this.node.mtxWorld.translation.y + " " + this.node.mtxWorld.translation.z);
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
        UI;
        //private viewport: ƒ.Viewport;
        isSpacePressed = false;
        //private playRotationBody: ƒ.ComponentRigidbody = getComponent.
        health;
        money;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR) {
                console.log("notplaying");
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
                    this.playerRigidBody.addEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, this.onPlayerCollision);
                    this.money = 0;
                    this.accessPlayerHealth();
                    // console.log("the player health is " + this.health);
                    ƒ.AudioManager.default.listenWith(this.node.getComponent(ƒ.ComponentAudioListener));
                    //this.rotationRigid = this.sceneGraph.getChildrenByName("Player")[0].getChildrenByName("PlayerModel")[0].getComponent(ƒ.ComponentRigidbody);
                    //this.update;
                    break;
            }
        };
        accessPlayerHealth = async () => {
            while (!Script.externalData) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            this.health = Script.externalData.playerHealth.value;
            Script.healthUI.healthRemaining = this.health;
            while (!Script.timeUI) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            this.UI = Script.sceneGraph.getChildrenByName("UIElement")[0].getComponent(Script.UserInterface);
            Script.moneyUI.moneyCollected = this.money;
        };
        speed = 4;
        torque = 0.2;
        onPlayerCollision(_event) {
            if (_event.cmpRigidbody.node.name == "Amunition") {
                this.node.getChildrenByName("Cannon")[0].getComponent(Script.SpawnProjectile).increaseAmunition();
            }
            if (_event.cmpRigidbody.node.name == "Coin") {
                if (!this.money)
                    this.money = 0;
                this.money++;
                Script.moneyUI.moneyCollected = this.money;
            }
        }
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
                if (this.isDead) {
                    return;
                }
                else if (this.isSpacePressed == false) {
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
        isDead = false;
        receiveDamage() {
            if (this.health > 0) {
                console.log("current health: " + this.health);
                this.health--;
                Script.healthUI.healthRemaining = this.health;
            }
            else if (this.isDead == false) {
                this.UI.stopTimer();
                this.isDead = true;
                console.log("game over.");
                this.node.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(180);
                let playerModel = this.node.getChildrenByName("PlayerModel")[0];
                let cannon = this.node.getChildrenByName("Cannon")[0];
                this.node.removeChild(playerModel);
                this.node.removeChild(cannon);
                // this.node.removeComponent(this.node.getComponent(ƒ.ComponentRigidbody));
                Script.sceneGraph.addChild(playerModel);
                playerModel.addComponent(new Script.FlyWithPipe());
                playerModel.getComponent(Script.FlyWithPipe).manualFlyAlong(playerModel.getComponent(ƒ.ComponentTransform));
                return;
            }
            else {
                console.log("player is dead");
            }
        }
    }
    Script.PlayerLogic = PlayerLogic;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒui = FudgeUserInterface;
    class TimeUI extends ƒ.Mutable {
        secondsSurvived;
        constructor() {
            super();
            const timeUiElement = document.querySelector("#seconds-survived-container");
            new ƒui.Controller(this, timeUiElement);
        }
        reduceMutator(_mutator) { }
    }
    Script.TimeUI = TimeUI;
    class HealthUI extends ƒ.Mutable {
        healthRemaining;
        constructor() {
            super();
            const healthUiElement = document.querySelector("#health-remaining-container");
            new ƒui.Controller(this, healthUiElement);
        }
        reduceMutator(_mutator) { }
    }
    Script.HealthUI = HealthUI;
    class AmunitionUI extends ƒ.Mutable {
        amunitionRemaining;
        constructor() {
            super();
            const amunitionUiElement = document.querySelector("#amunition-left-container");
            new ƒui.Controller(this, amunitionUiElement);
        }
        reduceMutator(_mutator) { }
    }
    Script.AmunitionUI = AmunitionUI;
    class MoneyUI extends ƒ.Mutable {
        moneyCollected;
        constructor() {
            super();
            const moneyUiElement = document.querySelector("#money-collected-container");
            new ƒui.Controller(this, moneyUiElement);
        }
        reduceMutator(_mutator) { }
    }
    Script.MoneyUI = MoneyUI;
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
        amunition;
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
        sound;
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    // ƒ.Debug.log(this.message, this.node);
                    // this.initialize();
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.pipeConstruct = this.node.getComponent(ƒ.ComponentTransform);
                    this.sound = this.node.getComponent(ƒ.ComponentAudio);
                    this.accessAmunition();
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        accessAmunition = async () => {
            while (!Script.externalData) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            this.amunition = Script.externalData.starterAmunition.value;
            while (!Script.amunitionUI) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            Script.amunitionUI.amunitionRemaining = this.amunition;
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
        increaseAmunition() {
            this.amunition++;
            Script.amunitionUI.amunitionRemaining = this.amunition;
        }
        spawnProjectile = async () => {
            console.log("shootingSound");
            this.sound.play(true);
            let graphInstance = await ƒ.Project.createGraphInstance(this.torpedoResource);
            this.node.addChild(graphInstance);
            this.amunition--;
            Script.amunitionUI.amunitionRemaining = this.amunition;
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
        //private audioListener = this.node.getComponent(ƒ.ComponentAudioListener);
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
        sound;
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    // ƒ.Debug.log(this.message, this.node);
                    // this.initialize();
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    let rigidbody = this.node.getComponent(ƒ.ComponentRigidbody);
                    rigidbody.applyLinearImpulse(new ƒ.Vector3(100, 0, 0));
                    rigidbody.applyTorque(new ƒ.Vector3(50, 0, 0)); //TEST THIS
                    rigidbody.addEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, this.hitEvent);
                    this.sound = this.node.getComponent(ƒ.ComponentAudio);
                    // f.AudioManager.default.listenWith(audioListener);
                    // this.(audioComponent).play(true);
                    break;
            }
        };
        hitEvent = async (_event) => {
            // explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.scale(new ƒ.Vector3(1,1,1));
            //explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(90);
            // console.log(explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.rotation);
            // let node: ƒ.Node = new ƒ.Node("SpriteParent");
            // node.addComponent(new ƒ.ComponentTransform());
            // node.addComponent(new FlyWithPipe());
            if (_event.cmpRigidbody.node.name != "PipeCollision" && _event.cmpRigidbody.node.name != "Coin" && _event.cmpRigidbody.node.name != "Amunition") {
                Script.explosionSprite.getComponent(ƒ.ComponentTransform).mtxLocal.translation = this.node.mtxWorld.translation;
                // explosionSprite.getComponent(FlyWithPipe).manualFlyAlong;
                let node = new ƒ.Node("Sprite");
                node.addChild(Script.explosionSprite);
                node.addComponent(new ƒ.ComponentTransform());
                Script.sceneGraph.addChild(node);
                Script.explosionSprite.addComponent(new Script.FlyWithPipe());
                Script.explosionSprite.getComponent(Script.FlyWithPipe).manualFlyAlong(node.getComponent(ƒ.ComponentTransform));
                //PlaySound
                this.sound.play(true);
                // explosionSprite.mtxWorld.translation = this.node.mtxWorld.translation;
                // console.log("AHHHHHHHHHHHHH" + sceneGraph.getChildrenByName("MoveEverything")[0].getChildren()[1]);
                await new Promise((resolve) => setTimeout(resolve, 200));
                this.node.removeComponent(this.node.getComponent(ƒ.ComponentRigidbody));
                // console.log("Parentsname: " + this.node.getParent().name);
                this.node.getParent().removeChild(this.node);
                await new Promise((resolve) => setTimeout(resolve, 400));
                Script.sceneGraph.removeChild(node);
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
        time = 0;
        startTime;
        //  private timeUI: TimeUI;
        //  private healthUI: HealthUI;
        //  private amunitionUI: AmunitionUI;
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
                    this.startTime = ƒ.Time.game.get();
                    this.runGoing = true;
                    this.runTimer();
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        stopTimer() {
            this.runGoing = false;
        }
        runTimer = async () => {
            while (this.runGoing) {
                this.updateTimer();
                await new Promise((resolve) => setTimeout(resolve, 40));
            }
            // console.log("game over.");
        };
        updateTimer = async () => {
            let timeInMilliseconds = ƒ.Time.game.get() - this.startTime;
            this.time = Math.floor(timeInMilliseconds / 1000);
            while (!Script.timeUI) {
                await new Promise((resolve) => setTimeout(resolve, 40));
            }
            Script.timeUI.secondsSurvived = this.time.toFixed();
        };
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
                    // ƒ.Debug.log(this.message, this.node);
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
            if (_event.cmpRigidbody.node.name == "Player") {
                this.node.dispatchEvent(new Event("WallHitByPlayer", { bubbles: true }));
            }
        }
    }
    Script.WallDamaging = WallDamaging;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class WorldManager extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Script.CustomComponentScript);
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
                    // ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.node.addEventListener("WallHitByPlayer", this.sendPlayerDamage);
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        canBeDamaged = true;
        damageCooldown = 1;
        sendPlayerDamage = async (_event) => {
            if (this.canBeDamaged == false)
                return;
            Script.sceneGraph.getChildrenByName("Player")[0].getComponent(Script.PlayerLogic).receiveDamage();
            this.canBeDamaged = false;
            await new Promise((resolve) => setTimeout(resolve, this.damageCooldown * 1000));
            this.canBeDamaged = true;
        };
        canExternalDataBeUsed = false;
        allowExternalDataUse() {
            this.canExternalDataBeUsed = true;
            this.node.dispatchEvent(new Event("ExternalDataUsable"));
            // console.log("external data usable now");
        }
    }
    Script.WorldManager = WorldManager;
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
                    // this.node.addEventListener(ƒ.EVENT.RENDER_PREPARE, this.update);
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
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class PipeSpawner {
        pipeResource;
        pipeXOffset = 1500;
        currentPipeX = 0;
        constructor() {
            this.loadResource();
        }
        loadResource = async () => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            this.pipeResource = ƒ.Project.getResourcesByName("Pipe")[0];
        };
        createPipeInstance = async () => {
            let pipeInstance = await ƒ.Project.createGraphInstance(this.pipeResource);
            return pipeInstance;
        };
        async spawnPipes(amount) {
            while (!this.pipeResource) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            for (let i = 0; i < amount; i++) {
                let node = new ƒ.Node("pipeParent");
                node.addComponent(new ƒ.ComponentTransform());
                let thisPipe = await this.createPipeInstance();
                node.addChild(thisPipe);
                node.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(this.currentPipeX + this.pipeXOffset);
                this.currentPipeX = node.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                console.log("translation is: " + this.currentPipeX);
                Script.sceneGraph.addChild(node);
            }
        }
    }
    Script.PipeSpawner = PipeSpawner;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class ItemAnimation extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(ItemAnimation);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "ItemSlot added to ";
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
                    // ƒ.Debug.log(this.message, this.node);
                    // this.node.getComponent(ƒ.ComponentRigidbody).addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.onItemHit);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    this.animate();
                    this.node.getComponent(ƒ.ComponentRigidbody).addEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, this.onItemHit);
                    break;
            }
        };
        onItemHit(_event) {
            if (_event.cmpRigidbody.node.name == "Player") {
                this.node.getChildren()[0].removeComponent(this.node.getChildren()[0].getComponent(ƒ.ComponentMesh));
                this.node.getParent().removeChild(this.node);
                console.log("playsound");
            }
        }
        animate = () => {
            if (this.node.getChildren()[0].getComponent(Script.ItemComponentAnimator)) {
                this.node.getChildren()[0].removeComponent(this.node.getChildren()[0].getComponent(Script.ItemComponentAnimator));
            }
            let itemComponentAnimator = new Script.ItemComponentAnimator();
            this.node.getChildren()[0].addComponent(itemComponentAnimator);
            itemComponentAnimator.activate(true);
        };
    }
    Script.ItemAnimation = ItemAnimation;
    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class ItemComponentAnimator extends ƒ.ComponentAnimator {
        hoverHeight = 5;
        animseq = new ƒ.AnimationSequence();
        itemAnimation;
        constructor() {
            super();
            this.setUpItemAnimation();
            this.animation = this.itemAnimation;
            this.playmode = ƒ.ANIMATION_PLAYMODE.LOOP;
            this.quantization = ƒ.ANIMATION_QUANTIZATION.CONTINOUS;
            this.scale = 1;
        }
        setUpItemAnimation() {
            this.animseq.addKey(new ƒ.AnimationKey(0, 0));
            this.animseq.addKey(new ƒ.AnimationKey(9000, 3600));
            let animseqHover = new ƒ.AnimationSequence();
            animseqHover.addKey(new ƒ.AnimationKey(0, 0));
            animseqHover.addKey(new ƒ.AnimationKey(1000, -this.hoverHeight));
            animseqHover.addKey(new ƒ.AnimationKey(2000, 0));
            animseqHover.addKey(new ƒ.AnimationKey(3000, this.hoverHeight));
            animseqHover.addKey(new ƒ.AnimationKey(4000, 0));
            animseqHover.addKey(new ƒ.AnimationKey(5000, -this.hoverHeight));
            animseqHover.addKey(new ƒ.AnimationKey(6000, 0));
            animseqHover.addKey(new ƒ.AnimationKey(7000, this.hoverHeight));
            animseqHover.addKey(new ƒ.AnimationKey(8000, 0));
            animseqHover.addKey(new ƒ.AnimationKey(9000, this.hoverHeight));
            let animStructure = {
                components: {
                    ComponentTransform: [
                        {
                            mtxLocal: {
                                translation: {
                                    y: animseqHover
                                },
                                rotation: {
                                    y: this.animseq
                                },
                            }
                        }
                    ]
                }
            };
            this.itemAnimation = new ƒ.Animation("testAnimation", animStructure, 30);
        }
    }
    Script.ItemComponentAnimator = ItemComponentAnimator;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map