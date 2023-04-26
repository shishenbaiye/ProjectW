import * as Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false,
        },
    },
};

export class GameStart extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }

    preload() { 

    }

    create() {
        this.scene.start('GameScene');
    }

    update() {
    
    }
}

new GameStart(config);
