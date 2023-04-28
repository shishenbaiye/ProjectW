import { Scene } from "phaser";

export class LoadingScene extends Scene {
    constructor() {
        super('loading-scene')
    }

    init(data) { 

    }
    
    preload() {
        this.load.baseURL = 'assets/';
        this.load.image('hero', 'sprites/hero1.png');
    }

    create(data): void {
        this.scene.start("game-scene");
    }

    update(time, delta) { 

    }
}