namespace Script {
import ƒ = FudgeCore;

    export class PipeSpawner {
        pipeResource: ƒ.Graph;

        pipeXOffset: number = 1500;
        currentPipeX: number = 0;

        constructor()  {
            this.loadResource();
        }

        loadResource = async() => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            this.pipeResource = <ƒ.Graph>ƒ.Project.getResourcesByName("Pipe")[0];
        }

        createPipeInstance = async(): Promise<ƒ.GraphInstance> => {
            let pipeInstance : ƒ.GraphInstance = await ƒ.Project.createGraphInstance(this.pipeResource);
            return pipeInstance;
        }

        async spawnPipes(amount: number) {
            while (!this.pipeResource){
                await new Promise((resolve) => setTimeout(resolve, 1000));

            }
                for (let i = 0; i < amount; i++) {
                    let node = new ƒ.Node("pipeParent");
                    node.addComponent(new ƒ.ComponentTransform());

                    let thisPipe: ƒ.GraphInstance = await this.createPipeInstance();
                    node.addChild(thisPipe);

                    node.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(this.currentPipeX + this.pipeXOffset);
                    this.currentPipeX = node.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x;
                    console.log("translation is: " + this.currentPipeX);
                    sceneGraph.addChild(node);

                }

        }

        
        

    }
}