/**
 * Represents a character object that extends a movable object.
 * This class handles the properties and behaviors specific to character elements in the game.
 *
 * @extends {MovableObject}
 */
class Character extends MovableObject {
    width = 610;
    height = 1200;
    individualSizeFactor = 1;
    groundHeight;
    x = 0;
    // y = 626 - this.walkHeight * this.sizeFactor;
    y = 0;
    offsetIncrement = 50;
    offset = {
        top: 480 + this.offsetIncrement,
        left: 90 + this.offsetIncrement,
        right: 120 + this.offsetIncrement,
        bottom: 60 + this.offsetIncrement,
    };
    movementSpeed = 8;
    world;
    walk_sound = new Audio("audio/characterWalk.mp3");
    hurt_sound = new Audio("audio/characterHurt.mp3");
    jump_sound = new Audio("audio/characterJump.mp3");
    lose_sound = new Audio("audio/sad_trumpet.mp3");
    snore_sound = new Audio("audio/snore.mp3");
    i = 0;
    timer = 0;

    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];
    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];
    IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];
    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /**
     * Creates a new instance of Character.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.setOffsets();
        this.hp = 5;
        this.groundHeight = 626 - this.height + this.offset.bottom - this.offsetIncrement * this.individualSizeFactor * this.sizeFactor;
        this.loadImages([...this.IMAGES_WALKING, ...this.IMAGES_JUMPING, ...this.IMAGES_DEAD, ...this.IMAGES_HURT, ...this.IMAGES_IDLE, ...this.IMAGES_LONG_IDLE]);
        this.applyGravity();
        this.animate();
        this.checkMovement();
    }

    /**
     * Animates the character.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) this.handleDeath();
            else if (this.isHurt()) this.handleHurt();
            else if (this.isAboveGround()) this.handleJump();
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.handleWalk();
            else this.handleIdle();
        }, 100);
    }

    /**
     * Checks the movement of the character.
     */
    checkMovement() {
        setInterval(() => {
            this.walk_sound.pause();
            this.checkMoveLeftRight();
            if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead()) this.jump();
            this.world.camera_x = -this.x + 150;
        }, 1000 / 60);
    }

    /**
     * Handles the death of the character.
     */
    async handleDeath() {
        if (this.i < 6) {
            this.resetImage();
            this.playAnimation(this.IMAGES_DEAD);
            this.i++;
        } else if (this.i === 6) {
            stopGame();
            showElement(youLose);
            await playSound(this.lose_sound);
            this.snore_sound.pause();
        }
    }

    /**
     * Handles injuries of the character.
     */
    handleHurt() {
        this.resetImage();
        this.playAnimation(this.IMAGES_HURT);
        this.timer = 0;
        this.snore_sound.pause();
    }

    /**
     * Handles the jumping of the character.
     */
    handleJump() {
        this.resetImage();
        this.playAnimation(this.IMAGES_JUMPING);
        this.timer = 0;
        this.snore_sound.pause();
    }

    /**
     * Handles the walking of the character.
     */
    handleWalk() {
        this.playAnimation(this.IMAGES_WALKING);
        this.timer = 0;
        this.snore_sound.pause();
    }

    /**
     * Handles the idle state of the character.
     */
    async handleIdle() {
        this.animationStarted = false;
        if (this.timer < 100) {
            this.playAnimation(this.IMAGES_IDLE);
            this.timer++;
            this.snore_sound.pause();
        } else {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!gameSoundMuted) await playSound(this.snore_sound);
            else this.snore_sound.pause();
        }
    }

    /**
     * Checks movement to the left or right.
     */
    async checkMoveLeftRight() {
        if (!this.isDead()) {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) await this.setMovementLeft();
            if (this.world.keyboard.LEFT && this.x > 0) await this.setMovementRight();
        }
    }

    /**
     * Sets movement to the left.
     */
    async setMovementLeft() {
        this.moveRight();
        await playSound(this.walk_sound);
        this.otherDirection = false;
    }

    /**
     * Sets movement to the right.
     */
    async setMovementRight() {
        this.moveLeft();
        await playSound(this.walk_sound);
        this.otherDirection = true;
    }
}
