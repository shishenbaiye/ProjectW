
import { Character } from './Charater';
import { CreateLink } from '../net/CreateLink';

export class Player {
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	public character: Phaser.Physics.Arcade.Sprite
	constructor(scene: Phaser.Scene, x: number, y: number, hero: string) {
		this.character = new Character(scene, x, y, hero);
		this.cursors = scene.input.keyboard?.createCursorKeys()!
	}

	protected checkFlip(): void {
		if (this.character.body!.velocity.x < 0) {
			this.character.scaleX = -1
		} else {
			this.character.scaleX = 1
		}
	}
	update(): void {
		this.character.setVelocity(0);

		if (this.cursors.up.isDown) {
			this.character.body!.velocity.y = -110
		}

		if (this.cursors.left.isDown) {
			this.character.body!.velocity.x = -110
			this.checkFlip()
			this.character.setOffset(48, 15)
		}

		if (this.cursors.down.isDown) {
			this.character.body!.velocity.y = 110
		}

		if (this.cursors.right.isDown) {
			this.character.body!.velocity.x = 110
			this.checkFlip()
			this.character.setOffset(15, 15)
		}
		CreateLink.room.send('player_movement', { x: this.character.x, y: this.character.y, scale: this.character.scaleX })
	}
}


