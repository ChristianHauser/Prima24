namespace Script {
    import ƒ = FudgeCore;

    export class ItemComponentAnimator extends ƒ.ComponentAnimator {
        hoverHeight: number = 5;
        animseq: ƒ.AnimationSequence = new ƒ.AnimationSequence();
        itemAnimation: ƒ.Animation;

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
            let animseqHover: ƒ.AnimationSequence = new ƒ.AnimationSequence();
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

            
            let animStructure: ƒ.AnimationStructure = {
                components: {
                    ComponentTransform: [
                        {
                        mtxLocal: {
                            translation: {
                                y:animseqHover
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
}   