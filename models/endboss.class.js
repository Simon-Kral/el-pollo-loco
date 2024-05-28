/**
 * Represents an end boss object that extends MovableObject.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    static X;
    width = 1045;
    height = 1217;
    individualSizeFactor = 1.5;
    y = 0;
    offsetIncrement = 120;
    offset = {
        top: 212 + this.offsetIncrement,
        left: 73 + this.offsetIncrement,
        right: 35 + this.offsetIncrement,
        bottom: 120 + this.offsetIncrement,
    };
    hadFirstContact = false;
    isMoving = false;
    alarm_sound = new Audio("audio/endbossAlarm.mp3");
    hurt_sound = new Audio("audio/endbossHurt.mp3");
    attack_sound = new Audio("audio/endbossHurt.mp3");
    walk_sound = new Audio("audio/endbossWalk.mp3");
    death_sound = new Audio("audio/win.mp3");
    i = 0;

    IMAGES_WALKING = ["img/4_enemie_boss_chicken/1_walk/G1.png", "img/4_enemie_boss_chicken/1_walk/G2.png", "img/4_enemie_boss_chicken/1_walk/G3.png", "img/4_enemie_boss_chicken/1_walk/G4.png"];
    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];
    IMAGES_HURT = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];
    IMAGES_DEAD = ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png"];

    /**
     * Constructs a new endboss object.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[3]);
        this.setOffsets();
        this.loadImages([...this.IMAGES_WALKING, ...this.IMAGES_ALERT, ...this.IMAGES_ATTACK, ...this.IMAGES_HURT, ...this.IMAGES_DEAD]);
        this.setParameters();
        this.animate();
        this.checkMovement();
    }

    /**
     * Sets parameters for Endboss.
     */
    setParameters() {
        this.y = 626 - this.height + this.offset.bottom - this.offsetIncrement * this.individualSizeFactor * this.sizeFactor;
        this.x = 1279 * 5;
        this.movementSpeed = 2.5;
        Endboss.X = this.x + 75;
    }

    /**
     * Initiates animation loop.
     */
    animate() {
        setInterval(() => {
            if (this.i < 8 && !this.hadFirstContact) this.loadImage(this.IMAGES_WALKING[3]);
            else if (this.isDead()) this.handleDead();
            else if (this.isHurt()) this.handleHurt();
            else if (this.i < 8 && this.hadFirstContact) this.handleAlert();
            else if (this.isMoving) this.handleMoving();
            else if (this.i > 8 && this.hadFirstContact) this.handleAttack();
            this.checkFirstContact();
        }, 100);
    }

    /**
     * Checks movement and adjusts accordingly.
     */
    checkMovement() {
        setInterval(() => {
            if (!this.isDead() && this.i > 8 && this.hadFirstContact) {
                if (this.x + this.offset.left > world.character.x + world.character.width - world.character.offset.right) this.setMovementLeft();
                else if (this.x + this.width - this.offset.right < world.character.x + world.character.offset.left) this.setMovementRight();
                else this.isMoving = false;
            }
        }, 1000 / 60);
    }

    /**
     * Handles Endboss death.
     */
    handleDead() {
        this.resetImage();
        this.playAnimation(this.IMAGES_DEAD);
        playSound(this.death_sound);
        this.reduceSize();
    }

    /**
     * Handles Endboss getting hurt.
     */
    handleHurt() {
        this.resetImage();
        this.playAnimation(this.IMAGES_HURT);
        this.hadFirstContact = true;
    }

    /**
     * Handles Endboss alert state.
     */
    handleAlert() {
        this.resetImage();
        Endboss.X = this.x + 75;
        this.playAnimation(this.IMAGES_ALERT);
        playSound(this.alarm_sound);
    }

    /**
     * Handles Endboss walking animation.
     */
    handleMoving() {
        this.playAnimation(this.IMAGES_WALKING);
        this.animationStarted = false;
    }

    /**
     * Handles Endboss attack state.
     */
    handleAttack() {
        this.resetImage();
        this.playAnimation(this.IMAGES_ATTACK);
        playSound(this.alarm_sound);
    }

    /**
     * Reduces Endboss size.
     */
    reduceSize() {
        this.width = this.width - 50;
        this.height = this.height - 50;
        this.x = this.x + 25;
        this.y = this.y + 25;
    }

    /**
     * Checks if Endboss had first contact with the character.
     */
    checkFirstContact() {
        this.i++;
        if (world.character.x > 5800 && !this.hadFirstContact) {
            this.i = 0;
            this.hadFirstContact = true;
        }
    }

    /**
     * Sets Endboss movement to the left.
     */
    setMovementLeft() {
        this.isMoving = true;
        this.moveLeft();
        playSound(this.walk_sound);
        this.otherDirection = false;
        Endboss.X = this.x + 75;
    }

    /**
     * Sets Endboss movement to the right.
     */
    setMovementRight() {
        this.isMoving = true;
        this.moveRight();
        playSound(this.walk_sound);
        this.otherDirection = true;
        Endboss.X = this.x + 75;
    }
}
