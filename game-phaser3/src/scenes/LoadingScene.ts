import { Scene } from "phaser";

export class LoadingScene extends Scene {
    constructor() {
        super('loading-scene')
    }

    init(data) {

    }

    preload() {
        this.load.baseURL = 'assets/';
        this.load.image('loading', 'loading/default.png');
    }

    create(data): void {
        // this.add.text(100, 100, 'Loading...', { fill: '#0f0' });
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;

        this.add.image(centerX, centerY, 'loading');
        setTimeout(() => {
            this.scene.start("game-scene");
        }, 2000);
    }

    update(time, delta) {

    }
}