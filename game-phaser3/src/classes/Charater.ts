export class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, hero: string) {
        super(scene, x, y, hero);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body!.setSize(30, 30);
        this.body!.setOffset(8, 0);
    }
}