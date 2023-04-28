import { Scene } from "phaser";
import { Player } from "../classes/Player";

export class GameScene extends Scene {
    private player!: Player
    constructor() {
        super('game-scene')
    }

    init(data) { 

    }
    
    preload() {
        this.load.baseURL = 'assets/';
        this.load.image('hero', 'sprites/hero1.png');
    }

    create(data): void {
        this.player = new Player(this, 100, 100, 'hero');
    }

    update(time, delta) { 
        this.player.update();
    }
}