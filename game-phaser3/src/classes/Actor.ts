import { ObjectBase } from "./ObjectBase";

export class Actor extends ObjectBase {
    private body: Phaser.Physics.Arcade.Sprite;
    constructor() {
        super();
    }
}