import { Game, Scale, Types, WEBGL } from 'phaser'
import { LoadingScene } from './scenes/LoadingScene';
import { CreateLink } from './net/CreateLink';
import { GameScene } from './scenes/GameScene';

export const gameConfig: Types.Core.GameConfig = {
    type: WEBGL,
    parent: 'app',
    backgroundColor: '#9bd4c3',
    scale: {
        mode: Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    callbacks: {
        postBoot: () => {
            sizeChanged();
        },
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    scene: [LoadingScene,GameScene],
}

function sizeChanged() {
    if (window.game.isBooted) {
        setTimeout(() => {
            window.game.scale.resize(window.innerWidth, window.innerHeight);

            window.game.canvas.setAttribute(
                "style",
                `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
            );
        }, 100);
    }
}

window.onresize = () => sizeChanged();
window.game = new Game(gameConfig)