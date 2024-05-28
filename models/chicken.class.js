/**
 * Class for a chicken, inheriting from the MovableObject class.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    y = 0;
    hadFirstContact = false;
    death_sound = new Audio("audio/chickenDeath.mp3");
    walk_sound = new Audio("audio/chickenWalk.mp3");

    /**
     * Constructor for the chicken.
     */
    constructor() {
        super();
    }

    /**
     * Initializes the chicken.
     */
    init() {
        this.loadImage(this.IMAGES_WALKING[0]);
        this.x = 1150 + Math.random() * 1279 * 4;
        this.setOffsets();
        this.y = 626 - this.height + this.offset.bottom - this.offsetIncrement * this.individualSizeFactor * this.sizeFactor;
        this.loadImages(this.IMAGES_WALKING);
        this.movementSpeed = 0.5 + Math.random() * 2;
        this.animate();
        this.checkProximity();
    }

    /**
     * Animates the chicken.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) this.loadImage(this.IMAGE_DEAD);
            else this.playAnimation(this.IMAGES_WALKING);
            if (world.character.x > this.x - 1150 && !this.hadFirstContact) this.hadFirstContact = true;
        }, 100);
    }

    /**
     * Checks the proximity of the chicken to the player.
     */
    checkProximity() {
        setInterval(() => {
            if (!this.isDead() && this.hadFirstContact && world.character.x < this.x + 800) {
                this.moveLeft();
                playSound(this.walk_sound);
            }
        }, 1000 / 60);
    }
}
