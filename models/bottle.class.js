/**
 * Represents a bottle object that extends a status bar for bottles.
 * This class handles the properties and behaviors specific to bottle elements in the game.
 *
 * @extends {StatusBarBottles}
 */
class Bottle extends StatusBarBottles {
    width = 400;
    height = 400;
    individualSizeFactor = 1;
    x = 100;
    y = 100;
    offset = {
        top: 76,
        left: 116,
        right: 133,
        bottom: 35,
    };
    collect_sound = new Audio("audio/collectBottle.mp3");

    IMAGE = "img/6_salsa_bottle/2_salsa_bottle_on_ground.png";

    /**
     * Creates an instance of Bottle.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGE);
        this.x = 300 + Math.random() * 1279 * 4.2;
        this.setOffsets();
        this.y = 626 - this.height + this.offset.bottom;
    }

    /**
     * Collects a specified amount of bottles and updates the status bar.
     *
     * @param {number} amount - The amount of bottles to collect.
     */
    collect(amount) {
        StatusBarBottles.amount = StatusBarBottles.amount + amount;
    }
}
