import { Physics } from 'phaser'

export class Player extends Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys|undefined
  constructor(scene: Phaser.Scene, x: number, y: number, hero: string) {
    super(scene, x, y, hero)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body?.setSize(30, 30)
    this.body?.setOffset(8, 0)
    this.cursors = this.scene.input.keyboard?.createCursorKeys()
  }

  protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1
    } else {
      this.scaleX = 1
    }
  }
  update(): void {
    this.setVelocity(0)

    if (this.cursors.up.isDown) {
      this.body.velocity.y = -110
    }

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -110
      this.checkFlip()
      this.setOffset(48, 15)
    }

    if (this.cursors.down.isDown) {
      this.body.velocity.y = 110
    }

    if (this.cursors.right.isDown) {
      this.body.velocity.x = 110
      this.checkFlip()
      this.setOffset(15, 15)
    }
  }
}