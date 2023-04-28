import { Scene } from "phaser";
import { Player } from "../classes/Player";
import { CreateLink, PlayerManager } from "../net/CreateLink";

export class GameScene extends Scene {
    private player!: Player
    constructor() {
        super('game-scene')
    }

    init(data) { 
        PlayerManager.getInstance().init(this);
        CreateLink.createLink();
        CreateLink.joinRoom();
    }
    
    preload() {
        this.load.baseURL = 'assets/';
        this.load.image('ownPlayer', 'sprites/hero1.png');
        this.load.image('otherPlayer', 'sprites/hero2.png');
    }

    create(data): void {
        
    }

    update(time, delta) { 
        PlayerManager.getInstance().update();
    }
}