/**
 * Class representing a throwable object, extending the MovableObject class.
 */
class ThrowableObject extends MovableObject {
    height = 400;
    width = 400;
    individualSizeFactor = 1;
    groundHeight;
    isSplashed = false;
    splashAnimationStarted = false;
    splashAnimationCounter = 0;
    splashAnimationIsPlayed = false;
    movementSpeed = 10;
    offsetIncrement = 50;
    offset = {
        top: 50 + this.offsetIncrement,
        left: 50 + this.offsetIncrement,
        right: 50 + this.offsetIncrement,
        bottom: 50 + this.offsetIncrement,
    };
    break_sound = new Audio("audio/breakBottle.mp3");

    IMAGES_FLYING = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];
    IMAGES_SPLASHING = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    /**
     * Constructs a new instance of ThrowableObject.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
    constructor(x, y) {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.setOffsets();
        this.groundHeight = 626 - this.height + this.offset.bottom;
        this.loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.throw();
        this.animate();
    }

    /**
     * Initiates the throwing action of the object.
     */
    throw() {
        StatusBarBottles.amount--;
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            if (!this.isSplashed) this.x += this.movementSpeed;
        }, 1000 / 60);
    }

    /**
     * Initiates the splash action of the object.
     */
    splash() {
        this.splashAnimationStarted = true;
        this.isSplashed = true;
    }

    /**
     * Initiates the animation for the throwable object.
     */
    animate() {
        setInterval(() => {
            if (this.isSplashed && this.splashAnimationCounter < this.IMAGES_SPLASHING.length - 1 && !this.splashAnimationIsPlayed) this.playSplashAnimation();
            else if (!this.isSplashed) this.playAnimation(this.IMAGES_FLYING);
            else this.splashAnimationIsPlayed = true;
        }, 60);
    }

    /**
     * Plays the splash animation of the object.
     */
    playSplashAnimation() {
        this.resetImage();
        playSound(this.break_sound);
        this.splashAnimationStarted = false;
        this.playAnimation(this.IMAGES_SPLASHING);
        this.splashAnimationCounter++;
    }
}
