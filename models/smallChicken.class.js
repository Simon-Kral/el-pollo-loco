/**
 * Class representing a SmallChicken, extending the Chicken class.
 */
class SmallChicken extends Chicken {
    width = 236;
    height = 210;
    individualSizeFactor = 0.8 + Math.random() * 0.3;
    offsetIncrement = 30;
    offset = {
        top: 13 + this.offsetIncrement,
        left: 5 + this.offsetIncrement,
        right: 7 + this.offsetIncrement,
        bottom: 15 + this.offsetIncrement,
    };
    lastJump = 0;
    jump_sound = new Audio("audio/characterJump.mp3");

    IMAGES_WALKING = ["img/3_enemies_chicken/chicken_small/1_walk/1_w.png", "img/3_enemies_chicken/chicken_small/1_walk/2_w.png", "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"];
    IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

    /**
     * Constructs a new instance of SmallChicken.
     */
    constructor() {
        super();
        this.init();
        this.groundHeight = 626 - this.height + this.offset.bottom - this.offsetIncrement * this.individualSizeFactor * this.sizeFactor;
        this.jump_sound.volume = 0.5;
        this.checkJump();
        this.applyGravity();
    }

    /**
     * Checks if the character has jumped within the last 2 seconds.
     *
     * @returns {boolean} Returns true if the character has jumped in the last 2 seconds, otherwise false.
     */
    hasJumped() {
        let timePassed = new Date().getTime() - this.lastJump;
        timePassed = timePassed / 1000;
        return timePassed < 2;
    }

    /**
     * Periodically checks the conditions to initiate a jump.
     *
     * Sets an interval to check every 1/60th of a second if the character should jump.
     * The character will jump if it hasn't jumped recently, is not dead, has had the first contact,
     * and the character's x-coordinate is within 800 units of this object's x-coordinate.
     */
    checkJump() {
        setInterval(() => {
            if (!this.hasJumped() && !this.isDead() && this.hadFirstContact && world.character.x < this.x + 800) {
                this.jump();
                this.lastJump = new Date().getTime();
            }
        }, 1000 / 60);
    }
}
