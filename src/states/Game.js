/* globals __DEV__ */
import Phaser from "phaser";
import Mushroom from "../sprites/Mushroom";

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    const bannerText = "Throwback";
    let banner = this.add.text(
      this.world.centerX,
      this.game.height - 80,
      bannerText
    );
    banner.font = "comis-sans";
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = "#77BFA3";
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: "mushroom"
    });

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN
    ]);

    this.game.add.existing(this.mushroom);
  }

  update() {
    if (this.inputIsActive("left")) {
      this.mushroom.x -= 2;
    } else if (this.inputIsActive("right")) {
      this.mushroom.x += 2;
    } else if (this.inputIsActive("up")) {
      this.mushroom.y -= 2;
    } else if (this.inputIsActive("down")) {
      this.mushroom.y += 2;
    }
  }

  inputIsActive(direction) {
    var isActive = false;
    isActive = this.input.keyboard.isDown(
      Phaser.Keyboard[direction.toUpperCase()]
    );
    isActive |=
      this.game.input.activePointer.isDown &&
      this.game.input.activePointer.x < this.game.width / 4;

    return isActive;
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }
}
